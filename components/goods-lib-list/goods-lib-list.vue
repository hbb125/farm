<template>
	<scroll-view :scroll-y="true" :enable-flex="true" @scrolltolower="scrolltolower" class="goods-lib-list" @scroll.top="">
		<view class="item" v-for="(item, index) in list" :key="index">
			<block v-for="(itemm,indexx) in item.goods_type.goods_list" :key="indexx">
				<image :src=" url + itemm.pic_goods" mode="" class="img"></image>
				<text class="name txt-cut">{{itemm.goods_name}}</text>
			</block>
		</view>
		<view class="loading-text">
			<uni-load-more :status="more" :iconSize="17"></uni-load-more>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				url:"https://backend.juleikeji.com/"
			}
		},
		props: {
			list: {
				type: Array,
			},
			loading: {
				type: Boolean,
				default: false
			},
			finished: {
				type: Boolean,
				default: false
			},
			n:{
				type:Number,
				default:1,
			}
		},
		computed: {
			more() {
				return this.finished ? "noMore" : 'loading'
			}
		},
		methods: {
			scrolltolower() {
				this.n++
				console.log(this.n)
				// 触底的时候请求数据，即为上拉加载更多
				console.log("触底了");
				// this.$emit('request',this.n)
				!this.finished && (this.$parent.loading = true, this.$emit('request',this.n))
			}
		}
	}
</script>

<style scoped lang="scss">
	$w: 130rpx;

	.goods-lib-list {
		display: flex;
		width: inherit;
		height: inherit;
		overflow-y: auto;
		flex-wrap: wrap;

		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: $w;
			margin-top: 30rpx;
			margin-left: 36rpx;

			.img {
				width: $w;
				height: $w;
				border-radius: $borderRadius12;
			}

			.name {
				width: inherit;
				font-size: 26rpx;
				line-height: 56rpx;
			}
		}

		.loading-text {
			width: 100%;
			flex-shrink: 0;
			line-height: 86rpx;
			margin-bottom: 26rpx;
			text-align: center;
		}
	}
</style>
