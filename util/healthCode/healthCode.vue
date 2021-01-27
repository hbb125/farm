<template>
	<view class="bealth-code">
		<view class="chunk"></view>

		<view class="content">
			<view class="temperature">
				<view class="title">
					<text>今日体温</text>
				</view>
				<view class="input-box">
					<input v-model="temperature" type="digit" class="ipt" />
					<text class="unit">℃</text>
				</view>
			</view>

			<view class="code">
				<view class="title">
					<text>健康码上传</text>
				</view>
				<view class="input-box">
					<view v-if="tailorPath === ''" class="upload" @click="choosePhoto">
						<uni-icons size="32" type="image" class="upload-icon" color="#999"></uni-icons>
						<view class="upload-text">上传健康码</view>
					</view>
					<view v-else class="preview">
						<image :src="tailorPath" class="upload"></image>
						<uni-icons size="20" type="clear" class="del" @click="delImg" color="#f00"></uni-icons>
					</view>
					
					<picture-tailor ref="pictureTailor" :pictureSrc="photoSrc" @createImg="createImg"></picture-tailor>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				photoSrc: "",
				tailorPath: "",
				temperature: Number
			}
		},
		methods: {
			choosePhoto() {
				uni.chooseImage({
					count: 1,
					sizeType: ["compressed"],
					success: (res) => {
						console.log(res)
						this.photoSrc = res.tempFilePaths[0];
						this.$refs.pictureTailor.show();
					}
				});
			},
			createImg(e) {
				this.tailorPath = e;
			},
			onBackPress() {
				if (this.$refs.pictureTailor.isShow) {
					this.$refs.pictureTailor.hide();
				}
				return true;
			},
			delImg() {
				this.tailorPath = ""
			}
		}
	}
</script>

<style scoped lang="scss">
	.bealth-code {
		.chunk {
			height: 110rpx;
			background-color: $uni-bg-color-main;
		}

		.content {
			padding: 0 20rpx;

			.title {
				line-height: 90rpx;
				padding-left: 30rpx;
				font-size: 32rpx;
				border-bottom: 1rpx solid #ccc;
			}
		}

		.temperature {
			margin-top: -80rpx;
			background-color: #fff;
			margin-bottom: 20rpx;
			border-radius: $borderRadius16;

			.input-box {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 200rpx;

				.ipt {
					width: 400rpx;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					margin-right: 10rpx;
					font-size: 50rpx;
					border: 2rpx solid #ccc;
					color: $uni-color-success;
					background-color: #eee;
					border-radius: 8rpx;
				}

				.unit {
					font-size: 40rpx;
				}
			}
		}

		.code {
			background-color: #fff;
			border-radius: $borderRadius16;

			.input-box {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 400rpx;

				.upload {
					display: flex;
					width: 230rpx;
					height: 230rpx;
					color: #888;
					background-color: #EEEEEE;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					border-radius: 10rpx;
					.upload-text {
						color: #999;
					}
				}
				
				.preview {
					position: relative;
					.del {
						position: absolute;
						top: 0;
						right: 0;
						transform: translate3d(48%, -48%, 0);
					}
				}

				/deep/ .imglistbx {
					padding-top: 0;
				}

				/deep/ .imglistItem {

					width: 100%;
					height: 100%;
					margin-right: 0;
					margin-bottom: 0;
				}
			}
		}
	}
</style>
