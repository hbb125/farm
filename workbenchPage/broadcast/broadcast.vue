<template>
	<view class="broadcast-page">
		<view class="chunk"></view>

		<view class="info">
			<view class="tip">
				<text class="tip-txt">
					说明：添加完后会在电子秤上进行相关语音播报，请注意文字措辞，如有违规行为，后果自负！
				</text>
			</view>

			<view class="content">
				<view class="title">
					<text>播放信息添加</text>
				</view>

				<view class="b-con">
					<view class="b-item" v-for="(item, index) in broadcastList" :key="index">
						<input type="text" v-model="item.con" class="ipt" placeholder="请输入详细播报" />
						<uni-icons type="trash" size="15" class="del" color="#999" @click="delBroad(index)"></uni-icons>
					</view>
				</view>

				<view class="add">
					<uni-icons type="plusempty" size="34" color="#999" @click="addBroasd"></uni-icons>
					<text>点击添加新播报</text>
				</view>
			</view>

			<button type="default" class="btn" @click="submit">确认</button>
		</view>
	</view>
</template>

<script>
	import {
		clone
	} from "../../util/commonly"

	let bItem = {
		con: ''
	}
	export default {
		data() {
			return {
				broadcastList: [
					clone(bItem)
				]
			}
		},
		methods: {
			addBroasd() {
                 this.broadcastList.push(clone(bItem))
			},
			delBroad(index){
                 this.broadcastList.splice(index,1)
			},
			submit(){
				this.broadcastList.forEach((item,index) => {
					console.log(this.broadcastList[index].con)
				})	
			}
		},
		
	}
</script>

<style scoped lang="scss">
	.broadcast-page {
		.chunk {
			height: 80rpx;
			background-color: $uni-bg-color-main;
		}

		.info {
			padding: 0 20rpx;

			.tip {
				display: flex;
				height: 110rpx;
				padding: 0 26rpx;
				justify-content: center;
				align-items: center;
				margin-bottom: 20rpx;
				margin-top: -55rpx;
				background-color: #fff;
				border-radius: $borderRadius16;

				.tip-txt {
					font-size: 24rpx;
				}
			}

			.content {
				background-color: #fff;
				border-radius: $borderRadius16;

				.title {
					line-height: 90rpx;
					padding-left: 26rpx;
					font-size: 32rpx;
					font-weight: 600;
					border-bottom: 1rpx solid #ccc;
				}

				.b-con {
					padding: 35rpx 10rpx 35rpx 26rpx;
					border-bottom: 1rpx solid #ccc;

					.b-item {
						display: flex;
						align-items: center;
						justify-content: center;
						margin-bottom: 20rpx;
					}

					.ipt {
						flex: 1;
						height: 76rpx;
						line-height: 76rpx;
						padding-left: 20rpx;
						margin-right: 10rpx;
						border: 1px solid #F1F1F1;
						background-color: #F5F5F5;
						border-radius: 8rpx;
					}

					.del {
						display: flex;
						width: 62rpx;
						height: 62rpx;
						justify-content: center;
						align-items: center;
						border-radius: 50%;
						background-color: #F5F5F5;
					}
				}

				.add {
					display: flex;
					height: 160rpx;
					align-items: center;
					flex-direction: column;
					justify-content: center;
					color: #999;
				}
			}

		}
	}
</style>
