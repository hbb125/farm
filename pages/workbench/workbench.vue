<template>
	<view class="workbench-page">
		<view class="chunk-top"></view>
		
		<view class="content">
			
			<!-- 最近使用satrt -->
			<view class="daily">
				<view class="hd">
					<text class="title">最近使用</text>
				</view>
				<view class="services">
					<view class="service-item" @click="interceptLogin({route: '/workbenchPage/healthCode/healthCode'})">
						<image src="../../static/images/banner1.jpg" mode="" class="service-icon"></image>
						<text class="txt">健康码</text>
					</view>
					<view class="service-item" @click="interceptLogin({route: '/workbenchPage/broadcast/broadcast'})">
						<image src="../../static/images/banner1.jpg" mode="" class="service-icon"></image>
						<text class="txt">播报</text>
					</view>
				</view>
			</view>
			<!-- 最近使用end -->
			
			
			<!-- 商户服务start -->
			<view class="merchant">
				<view class="hd">
					<text class="title">商户服务</text>
				</view>
				<view class="services">
					<view class="service-item">
						<image src="../../static/images/banner1.jpg" mode="" class="service-icon"></image>
						<text class="txt">促销</text>
					</view>
					<view class="service-item">
						<image src="../../static/images/banner1.jpg" mode="" class="service-icon"></image>
						<text class="txt">台账</text>
					</view>
					<view class="service-item">
						<image src="../../static/images/banner1.jpg" mode="" class="service-icon"></image>
						<text class="txt">辅料</text>
					</view>
					<view class="service-item">
						<image src="../../static/images/banner1.jpg" mode="" class="service-icon"></image>
						<text class="txt">接单</text>
					</view>
					<view class="service-item" @click="interceptLogin({route: '/workbenchPage/healthCode/healthCode'})">
						<image src="../../static/images/banner1.jpg" mode="" class="service-icon"></image>
						<text class="txt">健康码</text>
					</view>
					<view class="service-item" @click="interceptLogin({route: '/workbenchPage/broadcast/broadcast'})">
						<image src="../../static/images/banner1.jpg" mode="" class="service-icon"></image>
						<text class="txt">播报</text>
					</view>
				</view>
			</view>
			<!-- 商户服务end -->
			
			<!-- 市场管理start -->
			<view class="market">
				<view class="hd">
					<text class="title">市场管理</text>
				</view>
				<view class="services">
					<view class="service-item">
						<image src="../../static/images/banner1.jpg" mode="" class="service-icon"></image>
						<text class="txt">索证索票</text>
					</view>
					<view class="service-item">
						<image src="../../static/images/banner1.jpg" mode="" class="service-icon"></image>
						<text class="txt">摊位精选</text>
					</view>
					<view class="service-item">
						<image src="../../static/images/banner1.jpg" mode="" class="service-icon"></image>
						<text class="txt">缴费</text>
					</view>
				</view>
			</view>
			<!-- 市场管理end -->
			
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				orderList: [],
				last: 0
			}
		},
		created() {
			
		},
		onPullDownRefresh() {
			console.log('refresh_start');
			setTimeout(function() {
				uni.stopPullDownRefresh();
				console.log('refresh_end');
			}, 300);
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.workbench-page {
		padding-bottom: 30rpx;
		.chunk-top {
			height: 100rpx;
			background-color: $uni-bg-color-main;
		}
		.content {
			padding: 0 20rpx;
			margin-top: -80rpx;
		}
		
		.hd {
			height: 80rpx;
			line-height: 80rpx;
			padding-left: 30rpx;
			border-bottom: 1px solid #ddd;
			.title {
				font-size: 32rpx;
			}
		}
		.daily, .merchant, .market {
			border-radius: $borderRadius16;
			background-color: #fff;
		}
		.merchant {
			margin-top: 20rpx;
			.services {
				height: 460rpx;
			}
		}
		
		.market {
			margin-top: 20rpx;
			.services {
				height: 460rpx;
			}
		}
	
		.services {
			display: flex;
			flex-wrap: wrap;
			align-content: space-between;
			padding: 50rpx 0;
			.service-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 33.3%;
				.service-icon {
					width: 106rpx;
					height: 108rpx;
					border-radius: 20rpx;
					margin-bottom: 12rpx;
				}
				.txt {
					color: #333;
				}
			}
		}
		
	}
	
</style>
