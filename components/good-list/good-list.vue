<!-- 商品列表组件 <good-list :list="xx"></good-list> -->
<template>
	<view class="good-list">
		<view  @click="update(good,index)" :id="'good'+good.id" :class="{'good-li':true,'active':add_active.indexOf(good.goods_shelves_id) >=0}"
		 v-for="(good, index) in list" :key="index">
			<image class="good-img" :src="good.pic_goods" mode="" />
			<view class="flex-item">
				<view class="good-name txt-cut">{{good.goods_name}}</view>
				<text class="good-price color-main">¥{{good.unit_price}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	let flag = true
	export default {
		data() {
			return {
				add_active: []
			}
		},
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
		},
	
		methods: {
			emptyActive() {
				this.add_active = []
			},
			Xprice(price){
				console.log(price)
			},
			update(goods, index, price) {
				console.log(goods)				
				let i = this.add_active.indexOf(goods.goods_shelves_id)
				if (i >= 0) {					
					this.add_active.splice(i, 1)
				} else {			
					this.add_active.push(goods.goods_shelves_id)
					uni.showToast({
						icon: "none",
						title: "选中了  " + goods.goods_name
					})
				}
				this.$emit("update1", goods,index)
				this.$emit("updatePrice",index)
				this.$emit("update", this.add_active)
			},
		
		}
	}
</script>

<style lang="scss">
	.active {
		border: 1px solid red;
	}

	.good-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 20rpx;


		.good-li {
			position: relative;
			width: 345rpx;
			margin-bottom: 20rpx;
			background-color: #fff;
			border-radius: $borderRadius12;
			overflow: hidden;

			.grid-dot {
				position: absolute;
				top: 0;
				right: 0;
			}

			.good-img {
				width: inherit;
				height: 376rpx;
			}

			.flex-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 100rpx;
				padding: 0 16rpx;

				.good-name {
					width: 70%;
					font-size: 32rpx;
				}

				.good-price {
					font-size: 32rpx;
				}

			}
		}
	}
</style>
