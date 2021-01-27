<template>
	<view class="message">
		<view class="chunk"></view>

		<view class="content">
			<view class="msg-box">
				<view class="msg">
					<view class="line">
						<view class="hd" @click="go_zfb">
							<view class="icon">
								<image class="zfb" src="../../static/images/zhifubao.jpg" mode=""></image>
							</view>
							<text class="title">支付宝</text>
							<uni-icons type="arrowright" size="13"></uni-icons>
						</view>
					</view>
					<view class="bt">
						<view class="hd" @click="go_weixin">
							<view class="icon">
								<image class="zfb" src="../../static/images/weixin.png" mode=""></image>
							</view>
							<text class="title">微信</text>
							<uni-icons type="arrowright" size="13"></uni-icons>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			go_zfb() {
				uni.navigateTo({
					url: "/workbenchPage/payment/zfb"
				})
			},
			go_weixin() {
				uni.navigateTo({
					url: "/workbenchPage/payment/weixin"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	$iconW: 60rpx;
    .line {
		padding-bottom: 70rpx;
		border-bottom: 1px solid #aaa;
	}
	.bt {
		padding-bottom: 30rpx;
	}
	.message {
		.chunk {
			height: 110rpx;
			background-color: $uni-bg-color-main;
		}

		.content {
			padding: 0 20rpx;
		}

		.msg-box {
			padding: 30rpx;
			margin-top: -86rpx;
			background-color: #fff;
			border-radius: $borderRadius16;

			.msg {
				.hd {
					display: flex;
					justify-content: space-between;
					align-items: end;
					margin-top: 80rpx;

					.icon {
						width: $iconW;
						margin-right: 10rpx;

						.zfb {
							width: 50rpx;
							height: 50rpx;
						}
					}

					.title {
						flex: 1;
						// font-weight: 600;
						font-size: 32rpx;
					}

					.date {
						color: #ccc;
					}
				}

				.desc {
					margin-left: $iconW;
					color: #999;
					font-size: 26rpx;
					padding: 20rpx 0;

				}

				&:not(:last-of-type) .desc {
					border-bottom: 1rpx solid #999;
					margin-bottom: 30rpx;
				}
			}
		}

	}
</style>
