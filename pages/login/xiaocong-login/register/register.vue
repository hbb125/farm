<template>
	<view class="content">
		<view class="forget-bg">
			<view class="forget-card">
				<!-- <view class="forget-input forget-margin-b">
					<input type="number" placeholder="请输入您的手机号" />
				</view>
				<view class="forget-input forget-margin-b">
					<view class="verify-left">
						<input type="number" placeholder="请输入验证码" />
					</view>
					<view class="verify-right">
						<button class="verify-btn" type="primary">获取验证码</button>
					</view>
				</view> -->
				<view class="forget-input">
					<input class="xingxing" type="username" required="required" v-model="userInfo.username" placeholder="请输入用户名" />
				</view>

				<view class="forget-input">
					<input class="xingxing" type="text" v-model="userInfo.password" placeholder="请输入密码(6-16位)" />
				</view>

				<view class="forget-input" @click="showMarket">
					<input type="text" disabled placeholder="选择市场" />
					<uni-icons class="input-arrow" type="arrowdown" size="14"></uni-icons>
				</view>

				<view v-if="isShow" class="dd">
					<view class="forget-input">
						<picker @change="market" :range="marketTypeArray">
							<input type="text" disabled v-model="marketType" placeholder="市场名" />
							<uni-icons class="input-arrow" type="arrowdown" size="14"></uni-icons>
						</picker>
					</view>

					<view class="forget-input">
						<input type="text" v-model="userInfo.merchant_name" placeholder="店铺名" />
					</view>
				</view>

				<!-- <view class="forget-input">
					<input type="text" v-model="userInfo.market_id" placeholder="市场id" />
				</view> -->

				<!-- <view class="radio1">
					<input disabled placeholder="是否为负责人"></input>
					<label class="radio" @click="radio(1)">
						<radio value="1" :checked="1 == userInfo.is_legal" />是</label>
					<label class="radio" @click="radio(2)">
						<radio value="2" :checked="2 == userInfo.is_legal" />否</label>
				</view> -->
				<view class="forget-input" @click="showQita">
					<input type="text" disabled placeholder="选填信息" />
					<uni-icons class="input-arrow" type="arrowdown" size="14"></uni-icons>
				</view>
				
				<view v-show="isShow1" class="dd">
					<view class="forget-input">
						<input type="text" v-model="userInfo.staff_name" placeholder="员工名称" />
					</view>
					<view class="radio1">
						<input disabled placeholder="性别"></input>
						<label class="radio" @click="sex(1)">
							<radio value="1" :checked="1 == userInfo.staff_gender" />男</label>
						<label class="radio" @click="sex(2)">
							<radio value="2" :checked="2 == userInfo.staff_gender" />女</label>
					</view>

					<view class="forget-input">
						<input type="number" v-model="userInfo.staff_phone" placeholder="员工电话" />
					</view>

					<view class="forget-input">
						<picker @change="politics" :range="politicsTypeArray">
							<input type="text" disabled v-model="politicsType" placeholder="政治面貌" />
							<uni-icons class="input-arrow" type="arrowdown" size="14"></uni-icons>
						</picker>
					</view>

					<view class="forget-input">
						<picker @change="education" :range="educationTypeArray">
							<input type="text" disabled v-model="educationType" placeholder="文化程度" />
							<uni-icons class="input-arrow" type="arrowdown" size="14"></uni-icons>
						</picker>
					</view>

					<view class="forget-input">
						<input type="text" v-model="userInfo.staff_id_card" placeholder="身份证号" />
					</view>

					<view class="forget-input last">
						<input type="text" v-model="userInfo.staff_home_address" placeholder="家庭住址" />
					</view>

					<view class="input-box" v-for="(item,index) in imgArr" :key="index">
						<view v-if="item.tailorPath === ''" class="upload" @click="choosePhoto(index)">
							<view class="camera">
								<uni-icons type="camera" size="50" color="#fff" class="icon"></uni-icons>
							</view>
							<!-- <uni-icons size="32" type="image" class="upload-icon" color="#999"></uni-icons> -->
							<view class="upload-text">{{item.content}}</view>
						</view>
						<view v-else class="preview">
							<image :src="item.tailorPath" class="upload"></image>
							<uni-icons size="20" type="clear" class="del" @click="delImg(index)" color="#f00"></uni-icons>
						</view>

						<picture-tailor ref="pictureTailor" :pictureSrc="item.photoSrc" @createImg="createImg(index)"></picture-tailor>
					</view>
				</view>

				<view class="forget-btn">
					<button class="landing" type="primary" @click="submit">提交</button>
				</view>		
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false,
				isShow1: false,
				imgArr: [{
					photoSrc: '',
					tailorPath: "",
					content: "点击上传 / 拍摄 头像"
				}, {
					photoSrc: '',
					tailorPath: "",
					content: "点击上传 / 拍摄 健康证照片"
				}, {
					photoSrc: '',
					tailorPath: "",
					content: "点击上传 / 拍摄 身份证人像面"
				}, ],

				userInfo: {
					username: "",
					password: "",
					merchant_name: "",
					market_id: "",
					// is_legal: 1,
					staff_name: "",
					staff_gender: 1,
					staff_phone: "",
					staff_politics: 0,
					staff_education: 0,
					staff_market: 0,
					staff_id_card: '',
					staff_home_address: "",
				},
				// 下拉框 政治面貌
				politicsTypeArray: ['------请选择------', '群众', '党员'],
				politicsType: '',
				// 下拉框 文化程度
				educationTypeArray: ['------请选择------', '没上过学', '小学', "初中", "高中", "大学", "硕士", "博士"],
				educationType: '',
				// 下拉框
				marketTypeArray: [],
				marketType: '',
				//验证的规则
				rules: {
					username: {
						rule: /\S/,
						msg: "用户名不能为空"
					},
					password: {
						rule: /^[0-9a-zA-Z]{6,16}$/,
						msg: "密码应该为6-16位"
					},
					merchant_name: {
						rule: /\S/,
						msg: "店铺名不能为空"
					},
					market_id: {
						rule: /\S/,
						msg: "市场名不能为空"
					},
					// staff_name: {
					// 	rule: /\S/,
					// 	msg: "员工名称不能为空"
					// },
					// staff_phone: {
					// 	rule: /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/,
					// 	msg: "请输入正确的手机号"
					// },
					// staff_id_card: {
					// 	rule: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
					// 	msg: "请输入正确的身份证号"
					// },
					// staff__home_address: {
					// 	rule: /\S/,
					// 	msg: "家庭地址不能为空"
					// }
				},
			}
		},
		onLoad() {
			this.getMarket()
		},
		methods: {
			showMarket() {
				this.isShow = !this.isShow
			},
			showQita(){
				this.isShow1 = !this.isShow1
			},
			choosePhoto(index) {
				uni.chooseImage({
					count: 1,
					// sizeType: ["compressed"],
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择、摄像头
					success: (res) => {
						this.imgArr[index].photoSrc = res.tempFilePaths[0];
						console.log(this.$refs.pictureTailor[index])
						this.$refs.pictureTailor[index].show();
					}
				});
			},
			createImg(index) {
				this.imgArr[index].tailorPath = this.imgArr[index].photoSrc;
				this.uploadBase64(this.imgArr[index].photoSrc, index)
				// console.log(index)
			},
			delImg(index) {
				// console.log(index)
				this.imgArr[index].tailorPath = ""
			},

			uploadBase64(photoSrc, index) {
				uni.getFileSystemManager().readFile({
					filePath: photoSrc,
					encoding: 'base64',
					success: r => {
						let base64 = r.data
						switch (index) {
							case 0:
								this.userInfo.pic_head_sculpture = base64
								break;
							case 1:
								this.userInfo.pic_health_certificate = base64
								break;
							case 2:
								this.userInfo.pic_id_card = base64
								break;
						}
					}
				})
			},
			//判断验证是否符合要求
			validate(key) {
				let bool = true;
				if (!this.rules[key].rule.test(this.userInfo[key])) {
					//提示信息
					uni.showToast({
						icon: "none",
						title: this.rules[key].msg,
					})
					//取反
					bool = false;
					return false;
				}

				return bool;
			},
			getMarket() {
				this.myRequest('/merchant-staff-account/get-all-market', "POST").then(res => {
					console.log(res)
					res.data.data.items.forEach(item => {
						this.marketTypeArray.push(item.market_name)

					})

				})
			},
			submit() {
				if (!this.validate('username')) return;
				if (!this.validate("password")) return;
				if (this.userInfo.merchant_name !== '') {
					if (!this.validate("market_id")) return;
				}
				if (this.userInfo.market_id !== '') {
					if (!this.validate('merchant_name')) return;
				}
				// if (!this.validate('merchant_name')) return;
				// if (!this.validate("market_id")) return;
				// if (!this.validate('staff_name')) return;
				// if (!this.validate("staff_phone")) return;
				// if (!this.validate('staff_id_card')) return;
				// if (!this.validate("staff__home_address")) return;
				let data = this.userInfo
				console.log(this.userInfo)
				// this.imgArr.every(item => item.photoSrc.length > 0) 
				this.myRequest("/merchant-staff-account/merchant-register", data, "POST").then(res => {
					console.log(res)
					if (res.data.status == 200) {
						uni.showModal({
							title: "提示",
							content: '注册成功,请等待审核',
							success(res) {
								if (res.confirm) {
									setTimeout(function() {
										uni.navigateBack()
									}, 1000)
								} else if (res.cancel) {
									console.log('用户点击取消')
								}

							}
						})
					} else if (res.data.status == 20001) {
						uni.showModal({
							content: "该账户已被注册"
						})
					} else {
						uni.showToast({
							title: "注册失败",
						})
					}
				})
			},
			authorization() {
				console.log("授权")
				this.isShouQuan = !this.isShouQuan
			},
			// radio(n) {
			// 	console.log(n)
			// 	this.userInfo.is_legal = n;
			// },

			sex(n) {
				console.log(n)
				this.userInfo.staff_gender = n;
			},
			// 下拉框 政治面貌
			politics(e) {
				this.userInfo.staff_politics = e.target.value;
				this.politicsType = this.politicsTypeArray[this.userInfo.staff_politics]
				console.log(this.userInfo.staff_politics)
			},
			// 下拉框 文化程度
			education(e) {
				this.userInfo.staff_education = e.target.value;
				this.educationType = this.educationTypeArray[this.userInfo.staff_education]
				console.log(this.userInfo.staff_education)
			},
			//市场id
			market(e) {
				let that = this
				this.userInfo.staff_market = e.target.value;
				this.marketType = this.marketTypeArray[this.userInfo.staff_market]
				// console.log(this.userInfo.staff_market)
				console.log(this.marketType)
				this.$nextTick(function() {
					this.myRequest('/merchant-staff-account/get-all-market', "POST").then(res => {
						console.log(res)
						res.data.data.items.forEach(item => {
							if (that.marketType == item.market_name) {
								that.userInfo.market_id = item.market_id
								console.log(that.userInfo.market_id)
							}
						})

					})
				})

			},
			toJSON() {
				return this
			}
		}
	}
</script>

<style scoped lang="scss">
	
	.dd {
		width: 95%;
		margin: 0 auto;
	}
	.radio1 {
		display: flex;
		justify-content: space-between;
		margin: 20upx 0;
		padding: 0 20upx;
	}

	.last {
		margin-bottom: 30upx;
	}

	.verify-left {
		width: calc(100% - 260upx);
	}

	.verify-right {
		padding-left: 20upx;
	}

	.verify-btn {
		height: 80upx;
		line-height: 80upx;
		font-size: 28upx;
		width: 240upx;
		border-radius: 8upx;
		background: linear-gradient(left, #FF978D, #FFBB69);
	}

	.verify-left,
	.verify-right {
		float: left;
	}

	.landing {
		height: 84upx;
		line-height: 84upx;
		border-radius: 44upx;
		font-size: 32upx;
		margin-bottom: 20rpx;
		background: linear-gradient(left, #375cc4, #7cd170);
	}

	.forget-btn {
		width: 90%;
		margin: 20rpx auto;
	}

	.forget-input input {
		background: #F2F5F6;
		font-size: 28upx;
		padding: 10upx 25upx;
		height: 62upx;
		line-height: 62upx;
		border-radius: 8upx;
	}

	.forget-margin-b {
		margin-bottom: 25upx;
	}

	.forget-input .xingxing {
		&::before {
			content: "*";
			position: absolute;
			left: 0px;
			top: 15px;
			font-size: 32rpx;
			color: $uni-color-error;
		}
	}

	.forget-input {
		position: relative;
		padding: 10upx 20upx;
		overflow: auto;

		.input-arrow {
			padding: 10upx;
			position: absolute;
			right: 40upx;
			top: 25upx;
		}
	}

	.forget-card {
	
		background: #fff;
		border-radius: 12upx;
		padding: 60upx 25upx;
		box-shadow: 0 6upx 18upx rgba(0, 0, 0, 0.12);
		position: relative;
		margin-top: 120upx;
	}

	.forget-bg {
		height: 260upx;
		padding: 25upx;
		background: linear-gradient(top, #375cc4, #75c57a);

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
				width: 600rpx;
				height: 350rpx;
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
</style>
