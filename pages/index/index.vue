<template>
	<view class="home-page">
		<view class="chunk-top">
			<!-- 轮播图start -->
			<swiper :indicator-dots="true" :autoplay="true" :duration="300" indicator-color="rgba(255,255,255,.5)"
			 indicator-active-color="#4fab3d" previous-margin="10rpx" next-margin="10rpx" :circular="true" class="swiper">
				<swiper-item v-for="(item, index) in banner" :key="index" class="swiper-item">
					<image :src="item.image" mode="" class="banner"></image>
				</swiper-item>

			</swiper>
			<!-- 轮播图end -->
		</view>

		<view class="chunk-bottom">
			<!-- 常用功能start -->
			<view class="function">
				<navigator v-for="(item, index) in function_list" :key="index" class="fc-item" @click="interceptLogin(item)">
					<text class="name">{{item.name}}</text>
					<text class="en">{{item.en}}</text>
					<image :src="item.image" mode=""></image>
				</navigator>
			</view>
			<!-- 常用功能end -->

			<!-- 市场管理start -->
			<view class="market-admin">
				<view class="title">
					<text class="c5">市场管理</text>
					<view class="service">
						<text class="c5">
							在线咨询
						</text>
					</view>
				</view>

				<view class="admin-wraper">
					<view class="admin-item" v-for="(item, index) in adminList" :key="index" @click="interceptLogin(item)">
						<text class="name">{{item.name}}</text>
						<image :src="item.image" mode=""></image>
					</view>
				</view>

				<view class="tip-bar">
					<text class="txt">加入"菜商宝"让生意更便捷</text>
				</view>

				<!-- 商品分类satrt -->
				<view class="goods-category">
					<view class="cate-item" v-for="(item,index) in gategory" :key="index">
						<image :src="item.src" mode="" class="cate-img"></image>
						<text class="cate-name">
							{{item.name}}
						</text>
					</view>
				</view>
				<!-- 商品分类end -->
			</view>
			<!-- 市场管理end -->
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				base64: '',
				banner: [{
					image: "../../static/images/banner1.jpg",
					title: "banner"
				}, {
					image: "../../static/images/banner1.jpg",
					title: "banner"
				}, {
					image: "../../static/images/banner1.jpg",
					title: "banner"
				}],
				function_list: [{
					name: "促销",
					en: "PROMOTION",
					image: "../../static/images/index/cuxiao.jpg",
					route: "/workbenchPage/promotion/promotion",
				}, {
					name: "台账",
					en: "ACCOUNT",
					image: "../../static/images/index/taizhang.jpg",
					route: "/workbenchPage/promotion/promotion"
				}, {
					name: "辅料",
					en: "MATERIAL",
					image: "../../static/images/index/fuliao.jpg",
					route: "/workbenchPage/promotion/promotion"
				}, {
					name: "尾货",
					en: "折扣商城",
					image: "../../static/images/index/weihuo.jpg",
					route: "/workbenchPage/promotion/promotion"
				}, {
					name: "采购",
					en: "PROCUREMENT",
					image: "../../static/images/index/caigou.jpg",
					route: "/workbenchPage/promotion/promotion"
				}, {
					name: "接单",
					en: "ORDER",
					image: "../../static/images/index/jiedan.jpg",
					route: "/workbenchPage/promotion/promotion"
				}],
				adminList: [{
					name: '商品进货',
					route: '/workbenchPage/stock/stock',
					image: "../../static/images/index/jinhuo.jpg",
				}, {
					name: '线上缴费',
					image: "../../static/images/index/jiaofei.jpg",
					route: '/workbenchPage/pay/pay'
				}, {
					name: '摊位竞选',
					image: "../../static/images/index/jingxuan.jpg",
					route: '/workbenchPage/stock/stock'
				}],
				gategory: [{
					name: "蔬菜豆制品",
					src: "../../static/images/goods1.png"
				}, {
					name: "肉禽类",
					src: "../../static/images/rou.jpg"
				}, {
					name: "水产海鲜",
					src: "../../static/images/haixian.jpg"
				}, {
					name: "水果",
					src: "../../static/images/shuiguo.jpg"
				}]
			}
		},
		onReady() {
			// this.function_list.forEach(item => {
			// 	let base64 = uni.getFileSystemManager().readFileSync(item.route,'base64')
			//     console.log(base64)
			// })
			/* this.$http({
				url: "site/index",
				method: "POST",
			}).then((res) => {
				if (res.code === 200) {
					this.product_list = res.params
				}
			}).catch((err) => {
				console.log(err)
			}) */
		},
		onPullDownRefresh() {
			console.log('refresh_start');
			setTimeout(function() {
				uni.stopPullDownRefresh();
				console.log('refresh_end');
			}, 300);
		},
		methods: {
			routeHandle({
				route
			}) {
				console.log(this.checkLogin())
				console.log(route)
				if (this.checkLogin()) {
					uni.navigateTo({
						url: route,
						success(res) {
							console.log(res)
						},
						fail(e) {
							console.log(e)
						}
					})
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.c5 {
		color: #555;
	}

	.home-page {
		padding-bottom: 30rpx;
		background-color: #4fab3d;

		.chunk-top {
			height: 428rpx;
			background-color: $uni-bg-color-main;
		}

		.chunk-bottom {
			padding: 0 20rpx;
			margin-top: -50rpx;
		}

		/* 轮播图style */
		.swiper {
			height: 347rpx;
			padding-top: 12rpx;

			.swiper-item {
				box-sizing: border-box;
				padding: 0 10rpx;

				.banner {
					width: 100%;
					height: 100%;
					border-radius: $borderRadius16;
				}
			}
		}

		/* 轮播图style */

		/* 常用功能 */
		.function {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-content: space-between;
			height: 476rpx;
			padding: 13rpx;
			background-color: #fff;
			border-radius: $borderRadius16;
			margin-bottom: 20rpx;

			.fc-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 221rpx;
				height: 221rpx;
				background-color: #faeadc;
				// padding-top: 20rpx;
				border-radius: $borderRadius12;
				overflow: hidden;
				position: relative;

				image {
					width: 100%;
					height: 100%;
				}

				.name {
					margin-top: 10rpx;
					position: absolute;
					font-size: 34rpx;
					z-index: 999;
				}

				.en {
					position: absolute;
					top: 50rpx;
					font-size: 20rpx;
					z-index: 999;
				}
			}
		}

		/* 常用功能 */

		/* 市场管理 */
		.market-admin {
			background-color: #fff;
			border-radius: $borderRadius16;
			padding: 0 13rpx;

			.title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 72rpx;
				font-size: 30rpx;
			}

			.admin-wraper {
				display: flex;
				justify-content: space-between;
				margin-bottom: 20rpx;

				.admin-item {
					
					width: 221rpx;
					height: 212rpx;
					text-align: center;
					border-radius: $borderRadius12;
					background-color: #3C3E49;
					// padding-top: 20rpx;
                    position: relative;
					image {
						width: 100%;
						height: 100%;
					}
					.name {		
						position: absolute;
						margin-top: 20rpx;
						color: #fff;
						width: 200rpx;
						left: 50%;
						transform: translateX(-50%);
						font-size: 34rpx;
						z-index: 999;
					}

				}
			}

			.tip-bar {
				line-height: 70rpx;
				padding: 0 60rpx;
				margin-bottom: 20rpx;
				background-image: linear-gradient(to right, #305cbf, #65b486, #84db69);
				border-radius: $borderRadius12;

				.txt {
					font-size: 28rpx;
					color: #fff;
				}
			}
		}

		/* 市场管理 */

		/* 商品类别 */
		.goods-category {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 8rpx;

			.cate-item {
				display: flex;
				flex-direction: column;
				width: 25%;
				align-items: center;

				.cate-img {
					width: 132rpx;
					height: 132rpx;
					border-radius: 50%;
				}

				.cate-name {
					font-size: 30rpx;
					line-height: 54rpx;
					color: #333;
				}
			}
		}

		/* 商品类别 */
	}
</style>
