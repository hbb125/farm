<template>
	<view>
		<view class="chunk"></view>
		<view class="content">
			<view class="top">
				<view class="img">
					<image src="../../static/images/zfb1.jpg" mode=""></image>
				</view>

				<view class="input-box">
					<view v-if="tailorPath === ''" class="upload" @click="choosePhoto">
						<view class="camera">
							<uni-icons type="camera" size="50" color="#fff" class="icon"></uni-icons>
						</view>
						<!-- <uni-icons size="32" type="image" class="upload-icon" color="#999"></uni-icons> -->
						<view class="upload-text">点击上传收款码</view>
					</view>
					<view v-else class="preview">
						<image :src="tailorPath" class="upload"></image>
						<uni-icons size="20" type="clear" class="del" @click="delImg" color="#f00"></uni-icons>
					</view>

					<picture-tailor ref="pictureTailor" :pictureSrc="photoSrc" @createImg="createImg"></picture-tailor>
				</view>

			</view>
			<view class="btn">
				<button type="primary" @click="uploadBase64">确定</button>
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
			}
		},
		methods: {
			onShow(){
				this.myRequest('/merchant-staff/get-current-merchant-staff',"POST").then(res => {
					console.log(res)
					let data = res.data.data
					this.tailorPath = data.merchant_payment_alipay
				})
			},
			choosePhoto() {
				uni.chooseImage({
					count: 1,
					sizeType: ["compressed"],
					success: (res) => {
						this.photoSrc = res.tempFilePaths[0];
						this.$refs.pictureTailor.show();
					}
				});
			},
			createImg(e) {
				this.tailorPath = e;
			},
			delImg() {
				this.tailorPath = ""		
			},
			uploadBase64() {
				this.photoSrc.length > 0 ?
					uni.getFileSystemManager().readFile({
						filePath: this.photoSrc,
						encoding: 'base64',
						success: r => {
							// console.log(r.data)
							let base64 = r.data
							this.myRequest('/merchant/alipay-pic', {
								pic: base64
							}, "POST").then(res => {
								console.log(res)
								if (res.data.status == 200) {
									uni.showToast({
										title: "图片上传成功",
										success() {
											setTimeout(function() {
												uni.navigateBack()
											}, 1000)
										}
									})
								}
							})
						}
					}) : uni.showToast({
						title: "请选择图片"
					})
			},
			toJSON() {
				return this
			}
		}
	}
</script>

<style scoped lang="scss">
	.chunk {
		height: 110rpx;
		background-color: $uni-bg-color-main;
	}

	.input-box {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 400rpx;

		.camera {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 30rpx;
			width: 150rpx;
			height: 150rpx;
			border-radius: 50%;
			background-color: green;
		}

		.upload {
			display: flex;
			width: 400rpx;
			height: 400rpx;
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

	.content {
		padding: 0 50rpx;

		.top {
			margin-top: -80rpx;
			background-color: #fff;
			border: 1px solid #fff;
			padding-bottom: 100rpx;

			.img {
				margin: 50rpx auto;
				width: 200rpx;
				height: 70rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}


		}
	}
</style>
