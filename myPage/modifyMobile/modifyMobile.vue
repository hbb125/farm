<template>
	<view class="modify-mobile-page">
		<form @submit="formSubmit" class="form">
			<view class="content">
				<view class="uni-form-item uni-column required border">
					<view class="label">原手机号</view>
					<input v-model="oldPhone" disabled class="uni-input" name="oldPhone" placeholder="原手机号" />
				</view>
				<view class="uni-form-item uni-column required border">
					<view class="label">新手机号</view>
					<input v-model="newPhone" type="number" class="uni-input" name="newPhone" placeholder="请输入新手机号码" />
				</view>
			<!-- 	<view class="uni-form-item uni-column required">
					<view class="label">验证码</view>
					<input v-model="code" type="number" class="uni-input" name="code" placeholder="请输入短信验证码" />
					<view class="sendCode" @click="sendCodeHandle">
						<text v-if="codeFlag" class="color-main">获取验证码</text>
						<text v-else class="ing">{{second}}s后重发</text>
					</view>
				</view> -->
			</view>
			<button form-type="submit" class="save-btn">保存</button>
			<!-- <button form-type="reset">Reset</button> -->
		</form>
	</view>
</template>

<script>
	let timer;
	export default {
		data() {
			return {
				oldPhone: '',
				newPhone: '',
				code: '',
				codeFlag: true,
				second: 60
			}
		},
		onUnload() {
			clearInterval(timer)
		},
		methods: {
			onReady(){
				this.getUserInfo()
			},
			getUserInfo(){
				this.myRequest('/merchant-staff/get-current-merchant-staff','POST').then(res => {
					let data = res.data.data
					this.oldPhone = data.staff_phone
				})
			},
			formSubmit: function(e) {
				var formdata = e.detail.value
				let reg_tel = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/;
				let sign_tel = RegExp(reg_tel).test(formdata.newPhone);
				let sign_tel1 = RegExp(reg_tel).test(formdata.oldPhone);
				if (!sign_tel || !sign_tel1) {
					uni.showModal({
						title:"提示",
						content: "请检查电话号码"
					});
				} else {
					// console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
					// uni.showModal({
					// 	content: '表单数据内容：' + JSON.stringify(formdata),
					// 	showCancel: false
					// });
					let newPhone = this.newPhone
					this.myRequest("/merchant-staff/change-phone",{
						staff_phone:newPhone
					},"POST").then(res => {
						if (res.data.status == 200) {
							uni.showToast({
								title:"修改手机号成功"
							})
							this.newPhone = ''
						}
					})
				}


			},
			sendCodeHandle: function() {
				if (!this.codeFlag) return;
				this.codeFlag = false
				timer = setInterval(() => {
					console.log(2)
					if (this.second > 0) {
						this.second--
					} else {
						this.codeFlag = true
					}
				}, 1000)
			},
	
		}
	}
</script>

<style scoped lang="scss">
	.modify-mobile-page {
		padding: 20rpx;

		.form {
			display: block;

			.content {
				padding: 0 16rpx;
				background-color: #fff;
				border-radius: $borderRadius16;
			}
		}

		.uni-form-item {
			position: relative;
			display: flex;
			align-items: center;
			height: $inputH;
			padding: $inputPadding;

			.label {
				width: 180rpx;
				font-size: 32rpx;
				color: $uni-color-subtitle;

				.icon {
					color: $uni-color-error;
				}
			}

			.sendCode {
				.ing {
					color: #999;
				}
			}

			.uni-input {
				flex: 1;
				height: $inputH;
				line-height: $inputH;
				font-size: 30rpx;
			}

			&.border {
				border-bottom: 1rpx solid #ddd;
			}

			&.required::before {
				content: "*";
				position: absolute;
				left: 4px;
				font-size: 32rpx;
				color: $uni-color-error;
			}
		}


		.save-btn {
			line-height: 88rpx;
			margin-top: 60rpx;
			color: #fff;
			border-radius: 44rpx;
			background-image: $backGroundGradient;
		}

	}
</style>
