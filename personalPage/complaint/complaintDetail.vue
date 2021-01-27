<template>
	<view class="complaint-detail">
		<view class="chunk"></view>
		
		<view class="content">
			<view class="hd-box">
				<view class="list">
					<text class="label">经办人</text>
					<text>{{'张三'}}</text>
				</view>
				<view class="list">
					<text class="label">时间</text>
					<text>{{'2020-12-05'}}</text>
				</view>
			</view>
			
			<view class="detail">
				<view class="title">
					<text>投诉内容</text>
				</view>
				<view class="con">
					{{'最近在开发多终端开发时，遇到了一个神奇的坑，那就是写在组件上的样式不生效，折腾了半天，最后才曲线救国弄好了。下边说一下遇到的问题以及解决方案。问题，在组件上直接写样式在小程序中不生效。'}}
				</view>
				<view class="box">
					<view class="img" v-for="i of 3" :key="i">
						
					</view>
				</view>
			</view>
			
			<navigator url="/myPage/feedback/feedback" class="btn">反馈</navigator>
			<view class="tip">
				<text>如投诉内容与事实不符，点击反馈</text>
			</view>
		</view>
		<text></text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.complaint-detail {
		.chunk {
			height: 120rpx;
			background-color: $uni-bg-color-main;
		}
		.content {
			padding: 0 20rpx;
			margin-top: -90rpx;
			
			.hd-box {
				padding: 10rpx 30rpx;
				margin-bottom: 20rpx;
				background-color: #fff;
				border-radius: $borderRadius16;
				.list {
					display: flex;
					height: 70rpx;
					justify-content: space-between;
					align-items: center;
					
					.label {
						color: #888;
					}
				}
			}
			
			.detail {
				padding: 10rpx 30rpx;
				background-color: #fff;
				border-radius: $borderRadius16;
				.title {
					line-height: 80rpx;
					font-size: 30rpx;
				}
				.con {
					padding: 20rpx;
					font-size: 26rpx;
					color: #888;
					background-color: #F7F7F7;
					margin-bottom: 40rpx;
					border: 1px solid #F1F1F1;
					border-radius: $borderRadius12;
				}
				
				.box {
					display: flex;
					justify-content: space-between;
					margin-bottom: 20rpx;
					
					.img {
						width: 206rpx;
						height: 206rpx;
						background-color: #F1F1F1;
						border-radius: $borderRadius16;
					}
				}
			}
			
			.btn {
				font-size: 34rpx;
				text-align: center;
				border-radius: $borderRadius12;
			}
			
			.tip {
				text-align: center;
				margin-top: 40rpx;
				font-size: 24rpx;
				color: #999;
			}
		}
	}
</style>
