<template>
	<view class="uni-combox" :class="{'uni-combox__required': required}">
		<view v-if="label" class="uni-combox__label" :style="{width: labelWidth}">
			<text>{{label}}</text>
		</view>
		<view class="uni-combox__input-box">
			<input class="uni-combox__input" cursor-spacing="200" type="text" placeholder-class="placeholder-color" :placeholder="placeholder"
			 v-model="inputVal" :focus="isFocus" @input="onInput" @focus="onFocus" @blur="onBlur" />
			<uni-icons class="uni-combox__input-arrow" type="arrowdown" size="14" @click="toggleSelector"></uni-icons>
			<view class="uni-combox__selector" v-if="showSelector">
				<scroll-view scroll-y="true" class="uni-combox__selector-scroll" @scroll="scrollHandle" @scrolltolower="onReachScollBottom">
					<view class="uni-combox__selector-empty" v-if="filterCandidatesLength === 0">
						<text>{{emptyTips}}</text>
					</view>
					<view class="uni-combox__selector-item" v-for="(item,index) in filterCandidates" :key="index" @click="onSelectorClick(index)">
						<text>{{item}}</text>
					</view>
				</scroll-view>
				<view class="close" @click="colseHandle">收起</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from '../uni-icons/uni-icons.vue'
	export default {
		name: 'uniCombox',
		components: {
			uniIcons
		},
		props: {
			required: {
				type: Boolean,
				default: false
			},
			label: {
				type: String,
				default: ''
			},
			labelWidth: {
				type: String,
				default: 'auto'
			},
			placeholder: {
				type: String,
				default: ''
			},
			candidates: {
				type: Array,
				default () {
					return []
				}
			},
			goodsData: {
				type: Array,
			},
			emptyTips: {
				type: String,
				default: '无匹配项'
			},
			value: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				n: 1,
				showSelector: false,
				isFocus: false,
				inputVal: ''
			}
		},
		computed: {
			labelStyle() {
				if (this.labelWidth === 'auto') {
					return {}
				}
				return {
					width: this.labelWidth
				}
			},
			filterCandidates() {
				return this.candidates.filter((item) => {
					return item.indexOf(this.inputVal) > -1
				})
			},
			filterCandidatesLength() {
				return this.filterCandidates.length
			}
		},
		watch: {
			value: {
				handler(newVal) {
					this.goodsData.forEach(item => {
						if (item.goods_name == newVal) {
							console.log(item.goods_id + "-----------")
							this.$emit("getGoodsId",item.goods_id)
						}
					})
					// 这行代码很关键
					// this.inputVal = newVal
					console.log(newVal)
				},
				immediate: true
			}
		},
		methods: {
			onReachScollBottom() {
				// 下拉框触底加载更多，暂时不需要
				// this.n++
				// this.$emit("loadMore", this.n)
			},
			toggleSelector() {
				this.showSelector = !this.showSelector
			},
			onFocus() {
				this.showSelector = this.inputVal !== ''
			},
			onBlur() {
				this.showSelector = false
				// this.showSelector = this.inputVal !== ''
				// setTimeout(() => {
				// 	this.showSelector = false
				// }, 1000)
			},
			colseHandle() {
				this.showSelector = false
			},
			scrollHandle() {
				this.showSelector = true
				// this.isFocus = true
			},
			onSelectorClick(index) {
				this.showSelector = false
				this.inputVal = this.filterCandidates[index]
				this.$emit('input', this.inputVal)
			},
			onInput() {
				this.showSelector = this.inputVal !== ''
				setTimeout(() => {
					this.$emit('input', this.inputVal)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	$height: 50px;

	.uni-combox {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		position: relative;
		height: $height;
		flex-direction: row;
		align-items: center;
		padding: $inputPadding;
		border-bottom: solid 1rpx #DDDDDD;

	}

	.uni-combox__label {
		font-size: 16px;
		line-height: 22px;
		color: $uni-color-subtitle;
	}

	.uni-combox__input-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: row;
		align-items: center;
	}

	.uni-combox__input {
		flex: 1;
		font-size: 16px;
		height: $height;
		line-height: $height;
	}

	.uni-combox__required::before {
		content: "*";
		position: absolute;
		left: 4px;
		font-size: 16px;
		color: $uni-color-error;
	}

	.uni-combox__input-arrow {
		padding: 10px;
		
	}

	.uni-combox__selector {
		box-sizing: border-box;
		position: absolute;
		top: 116%;
		left: 0;
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 6px;
		box-shadow: #DDDDDD 4px 4px 8px, #DDDDDD -4px -4px 8px;
		z-index: 2;
	}

	.uni-combox__selector-scroll {
		max-height: 200px;
		margin-bottom: 37px;
		box-sizing: border-box;
	}

	.uni-combox__selector::before {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
		border-bottom: solid 6px #FFFFFF;
		border-right: solid 6px transparent;
		border-left: solid 6px transparent;
		left: 50%;
		top: -6px;
		margin-left: -6px;
	}

	.uni-combox__selector-empty,
	.uni-combox__selector-item {
		/* #ifdef APP-NVUE */
		display: flex;
		/* #endif */
		line-height: 40px;
		font-size: 14px;
		text-align: center;
		border-bottom: solid 1px #DDDDDD;
		margin: 0px 10px;
	}

	.uni-combox__selector-empty:last-child,
	.uni-combox__selector-item:last-child {
		border-bottom: none;
	}

	.close {
		position: absolute;
		bottom: 0;
		width: 100%;
		line-height: 37px;
		background-color: #ddd;
		border-radius: 0 0 6px 6px;
		font-size: 14px;
		text-align: center;
	}


	/deep/ .placeholder-color {
		color: $uni-text-color-placeholder;
	}
</style>
