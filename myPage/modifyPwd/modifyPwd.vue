<template>
	<view class="modify-pwd-page">
		<form @submit="formSubmit" class="form">
			<view class="content">
				<!-- 
				<view class="uni-form-item uni-column required border">
					<view class="label">手机号</view>
					<input v-model="phone" type="number" class="uni-input" name="phone" placeholder="请输入新手机号码" />
				</view>
				<view class="uni-form-item uni-column required border">
					<view class="label">验证码</view>
					<input v-model="code" type="number" class="uni-input" name="code" placeholder="请输入短信验证码" />
					<view class="sendCode" @click="sendCodeHandle">
						<text v-if="codeFlag" class="color-main">获取验证码</text>
						<text v-else class="ing">{{second}}s后重发</text>
					</view>
				</view> -->

				<view class="uni-form-item uni-column required border">
					<view class="label">旧密码</view>
					<input v-model="oldPassword" type="password" class="uni-input" name="password" placeholder="请输入旧密码" />
				</view>

				<view class="uni-form-item uni-column required">
					<view class="label">新密码</view>
					<input v-model="newPassword" type="password" class="uni-input" name="password_again" placeholder="请输入新密码" />
				</view>

				<view class="uni-form-item uni-column required">
					<view class="label">确认新密码</view>
					<input v-model="password_again" type="password" class="uni-input" name="password_again" placeholder="请确认新密码" />
				</view>

			</view>
			<button form-type="submit" class="btn">确认</button>
			<!-- <button form-type="reset">Reset</button> -->
		</form>
	</view>
</template>

<script>
	let timer;
	export default {
		data() {
			return {
				// phone: '18963344336',
				phone: '17837038832',
				code: '',
				oldPassword: '',
				newPassword: '',
				password_again: '',
				codeFlag: true,
				second: 60
			}
		},
		onUnload() {
			clearInterval(timer)
		},
		methods: {
			formSubmit: function(e) {
				var formdata = e.detail.value
				let rule = /^[0-9a-zA-Z]{6,16}$/
				let sure = rule.test(this.newPassword)
				if (this.oldPassword == "" || this.newPassword == "" || this.password_again == "") {
					uni.showModal({
						content: "请检查密码是否输入"
					})
					
				} else {
					if (sure && this.newPassword == this.password_again) {
						this.submit()
					} else if (!sure) {
						uni.showToast({
							icon: "none",
							title: "请输入6-16位密码"
						})
						return
					} else {
						uni.showToast({
							icon: "none",
							title: "两次密码输入不一致",
							
						})
						return
					}
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
			submit() {
				let oldPassword = this.oldPassword
				let newPassword = this.newPassword
				this.myRequest("/merchant-staff/change-password", {
					old_password:oldPassword,
					new_password:newPassword,
				}, "POST").then(res => {
					console.log(res)
					if (res.data.status == 200) {
						uni.showToast({
							title: "密码修改成功"
						})
						setTimeout(function() {
							uni.navigateTo({
								url: "/pages/login/xiaocong-login/login/login"
							})
						}, 1000);
					} else if (res.data.status == 20050) {
						uni.showModal({
							content: "请检查旧密码是否正确"
						});
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.modify-pwd-page {
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


	}
</style>
