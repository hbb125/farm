<template>
	<view class="message">
		<view class="chunk"></view>
		
		<view class="content">
			<view class="msg-box">
				<navigator class="msg" url="/myPage/message/messageDetail" v-for="(item, index) in messageList" :key="index" hover-class="none">
					<view class="hd">
						<uni-icons type="shop" size="19" class="icon"></uni-icons>
						<text class="title">{{item.type}}</text>
						<text class="date">{{item.date}}</text>
					</view>
					<view class="desc">
						<text class="two-txt-cut">{{item.desc}}</text>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				messageList: [{
					id: 10,
					type: "交易通知",
					desc: '最近在开发多终端开发时，遇到了一个神奇的坑，那就是写在组件上的样式不生效，折腾了半天，最后才曲线救国弄好了。下边说一下遇到的问题以及解决方案。问题，在组件上直接写样式在小程序中不生效。',
					date: '2020-12-02 21:00'
				},{
					id: 11,
					type: "市场通知",
					desc: '最近在开发多终端开发时，遇到了一个神奇的坑，那就是写在组件上的样式不生效，折腾了半天，最后才曲线救国弄好了。下边说一下遇到的问题以及解决方案。问题，在组件上直接写样式在小程序中不生效。',
					date: '2020-12-02 21:00'
				},{
					id: 12,
					type: "市场通知",
					desc: '最近在开发多终端开发时，遇到了一个神奇的坑，那就是写在组件上的样式不生效，折腾了半天，最后才曲线救国弄好了。下边说一下遇到的问题以及解决方案。问题，在组件上直接写样式在小程序中不生效。',
					date: '2020-12-02 21:00'
				}]
			}
		},
		methods: {
		
		}
	}
</script>

<style scoped lang="scss">
	$iconW: 60rpx;
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
					.icon {
						width: $iconW;
					}
					.title {
						flex: 1;
						font-weight: 600;
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
