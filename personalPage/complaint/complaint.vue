<template>
	<view class="complaint-page">
		<view class="chunk"></view>
		<view class="content">
			<s-tabs type="round" :barWidth="barWidth" :barHeight="barHeight" @change="change" @render="render">
				<s-tab v-for="(item, index) in tabList" :title="item.title" :key="index" class="t-con">
					<navigator url="/personalPage/complaint/complaintDetail" hover-class="none" class="c-item" v-for="(itm, idx) in complaintList"
					 :key="idx">
						<view class="hd">
							<text class="person">经办人：{{itm.responsiblePerson}}{{index}}</text>
							<text class="date">{{itm.date}}</text>
						</view>
						<view class="detail">
							<text class="three-txt-cut">{{itm.content}}</text>
						</view>
					</navigator>
				</s-tab>
			</s-tabs>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				barWidth: '',
				barHeight: '',
				tabList: [{
					id: 1,
					title: '全部投诉'
				}, {
					id: 2,
					title: '未查看'
				}],
				complaintList: [{
					responsiblePerson: '张三',
					date: '2020-12-05',
					content: '最近在开发多终端开发时，遇到了一个神奇的坑，那就是写在组件上的样式不生效，折腾了半天，最后才曲线救国弄好了。下边说一下遇到的问题以及解决方案。问题，在组件上直接写样式在小程序中不生效。'
				}, {
					responsiblePerson: '张三',
					date: '2020-12-05',
					content: '最近在开发多终端开发时，遇到了一个神奇的坑，那就是写在组件上的样式不生效，折腾了半天，最后才曲线救国弄好了。下边说一下遇到的问题以及解决方案。问题，在组件上直接写样式在小程序中不生效。'
				}]
			}
		},
		methods: {
			change() {
				console.log(123)
			},
			render() {
				console.log(456)
			}
		}
	}
</script>

<style scoped lang="scss">
	.complaint-page {
		.chunk {
			height: 200rpx;
			background-color: $uni-bg-color-main;
		}

		.content {
			padding: 0 20rpx;
			margin-top: -170rpx;
			overflow: hidden;

			.t-con {
				display: block;
				margin-top: 20rpx;

				.c-item {
					padding: 0 30rpx;
					margin-bottom: 20rpx;
					background-color: #fff;
					border-radius: $borderRadius16;

					.hd {
						display: flex;
						height: 80rpx;
						justify-content: space-between;
						align-items: center;
						border-bottom: 1rpx solid #a8a8a8;

						.person {
							font-size: 32rpx;
							font-weight: 600;
						}

						.date {
							color: #999;
						}
					}

					.detail {
						padding: 30rpx 0;
						font-size: 24rpx;
						color: #666;
					}
				}
			}
		}
	}
</style>
