<template>
	<view class="s-tabs" :class="customClass">
		<view class="s-tabs-nav-wrap" :style="'height:'+height+'rpx'">
			<scroll-view class="scroll-wrap" :show-scrollbar="false" scroll-with-animation scroll-x :scroll-left="scrollLeft">
				<view :class="['scroll-view', {round: type === 'round'}]">
					<view class="s-tab-nav-view">
						<template v-if="!slotTitle">
							<view v-for="(item,index) of navInfoList" :class="['s-tab-nav',{'is-disabled':item.disabled},{'is-active':active==index}]"
							 :style="'color:'+(active==index? (type === 'round' ? '#fff' : activeColor) : color)" :key="index" @click="navClick(index,item)">{{item.title}}</view>
						</template>
						<slot v-else></slot>
					</view>
					<view v-if="bar" :class="type === 'round'? 's-tabs-round-bar' : 's-tabs-active-bar'" :style="{
              width:barWidth+'px',
              height:barHeight+'px',
              background:barColor,
              transform:'translateX('+barLeft+'px)'
            }"></view>
				</view>
			</scroll-view>
		</view>
		<view v-if="!slotTitle" class="s-tabs-content-wrap" :style="transform + transition">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: 's-tabs',
		props: {
			// class
			customClass: {
				type: String,
				default: ''
			},
			// v-model双向绑定
			value: {
				type: Number,
				default: 0
			},
			// 使子组件s-tab的slot成为导航的填充内容
			slotTitle: {
				type: Boolean,
				default: false
			},
			// 导航颜色
			color: {
				type: String,
				default: '#555'
			},
			// 导航选中颜色
			activeColor: {
				type: String,
				default: '#406BDC'
			},
			// 导航高度 rpx
			height: {
				type: Number,
				default: 70
			},
			// 内容部分是否动画切换
			effect: {
				type: Boolean,
				default: false
			},
			// 内容部分动画切换时间
			duration: {
				type: Number,
				default: 0.3
			},
			// 内容部分是否开启延迟渲染（首次切换到标签时才触发内容渲染）
			lazyRender: {
				type: Boolean,
				default: true
			},
			// 是否显示底部条
			bar: {
				type: Boolean,
				default: true
			},
			// 底部条颜色
			barColor: {
				type: String,
				default: '#406BDC'
			},
			// 底部条高度 rpx
			barWidth: {
				default: 30
			},
			// 底部条高度 rpx
			barHeight: {
				default: 4
			},
			type: {
				type: String,
				default: 'default'
			}
		},
		data() {
			this.navContextList = [];
			return {
				active: 0,
				diffLeft: 0,
				scrollLeft: 0,
				barLeft: 0,
				navInfoList: [],
				isInScroll: false
			};
		},
		computed: {
			transform() {
				return `transform: translate3d(${-100 * this.active}%, 0, 0);`;
			},
			transition() {
				return this.effect ? `transition-duration: ${this.duration}s;` : '';
			}
		},
		provide() {
			return {
				$tabs: this
			};
		},
		watch: {
			value(index) {
				this.active = this.value;
				this.renderContent();
				this.scrollByIndex();
			}
		},
		methods: {
			navClick(index, item) {
				if (index != this.active && !item.disabled) {
					this.active = index;
					this.$emit('input', index);
					this.$emit('change', index);
					this.renderContent();
					this.scrollByIndex();
				}
			},
			renderContent() {
				this.$nextTick(() => {
					const item = this.navContextList[this.active];
					if (item && !item.info.isRender) {
						item.info.isRender = true;
						this.$emit('render', this.active);
					}
				});
			},
			scrollByIndex(isInit) {
				if (this.isInScroll) return;
				this.isInScroll = true;
				this.$nextTick(() => {
					const query = () => uni.createSelectorQuery().in(this);
					query().select('.s-tabs-nav-wrap').boundingClientRect().exec(([wrap]) => {
						query().select('.s-tab-nav-view').boundingClientRect().exec(([view]) => {
							if (isInit) {
								this.diffLeft = view.left - wrap.left;
							}
							const setNavScroll = (item) => {

								if (item) {
									this.$parent.barWidth = item.width;
									this.$parent.barHeight = item.height;
									const centerLeft = (wrap.width - item.width) / 2;
									let barW = this.barWidth;

									this.scrollLeft = Math.abs(view.left - wrap.left - this.diffLeft) + item.left - centerLeft - wrap.left;

									if (this.type === 'round') {
										this.$parent.barWidth = item.width - 4;
										this.$parent.barHeight = item.height - 4;
										barW = this.$parent.barWidth
									}
									this.barLeft = this.scrollLeft + centerLeft + (item.width - barW) / 2;
									this.isInScroll = false;
								}
							};
							if (this.slotTitle) {
								uni.createSelectorQuery().in(this.navContextList[this.active]).select('.s-tab-nav').boundingClientRect().exec(
									([item]) => {
										setNavScroll(item);
									});
							} else {
								query().selectAll('.s-tab-nav').boundingClientRect().exec(([list]) => {
									setNavScroll(list[this.active]);
								});
							}
						});
					});
				});
			}
		},
		created() {
			this.active = this.value;
		},
		mounted() {
			this.renderContent();
			this.scrollByIndex(true);
		}
	};
</script>

<style lang="scss" scoped>
	.s-tabs {
		&-nav-wrap {
			width: 100%;
			height: 100%;
			display: flex;
			white-space: nowrap;
		}

		.scroll-wrap {
			height: 100%;

			::-webkit-scrollbar {
				display: none;
			}

			// #ifdef H5
			::v-deep {
				& .uni-scroll-view>view {
					height: 100%;
				}
			}

			// #endif
		}

		.scroll-view {
			height: 100%;
			position: relative;
			
			&.round {
				border-radius: 20px;
				background: #fff;
			}
		}

		.s-tab-nav-view {
			position: relative;
			min-width: 100%;
			display: inline-flex;
			height: 100%;
			z-index: 10;
		}
		

		.s-tab-nav {
			flex: 1 0 0;
			display: flex;
			height: 100%;
			font-size: 26rpx;
			justify-content: center;
			align-items: center;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			box-sizing: border-box;
			transition: color .3s;

			&.is-disabled {
				color: #c8c9cc;
			}
		}

		.s-tabs-active-bar {
			position: absolute;
			bottom: 0;
			border-radius: 6rpx;
			transition: all 0.3s;
		}

		.s-tabs-round-bar {
			position: absolute;
			bottom: 2px;
			border-radius: 35rpx / 50% 50% 50% 50%;
			transition: all 0.3s;
			z-index: 9;
		}

		&-content-wrap {
			display: flex;
			white-space: nowrap;

			::v-deep s-tab {
				width: 100%;
				overflow: hidden;
				flex-shrink: 0;
				box-sizing: border-box;
			}
		}
	}
</style>
