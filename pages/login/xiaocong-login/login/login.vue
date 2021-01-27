<template>
	<view class="content">
		<view class="login-bg">
			<view class="login-card">
				<view class="login-head">请输入你的账户</view>
				<view class="login-input login-margin-b">
					<input v-model="username" type="text" placeholder="请输入用户名" />
				</view>
				<view class="login-input">
					<input v-model="password" type="text" placeholder="请输入密码(6-16位)" />
				</view>
				<view class="login-function">
					<view class="login-forget" @click="go_forget">忘记密码</view>
					<view class="login-register" @click="go_register">快速注册></view>
				</view>
			</view>
		</view>
		<view class="login-btn">
			<button class="landing" type="primary" @click="Login">登陆</button>
			<button class="wxlanding" open-type="getUserInfo" @getuserinfo="getUserInfo" type="primary">微信登录</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				username: '',
				password: '',
				isCanUse:false,
				code:'',
				//验证的规则
				rules: {
					username: {
						rule: /\S/,
						msg: "账号不能为空"
					},
					password: {
						rule: /^[0-9a-zA-Z]{6,16}$/,
						msg: "密码应该为6-16位"
					}
				}
			}
		},
		onLoad() {
			// this.login()
		},
		methods: {
			// 账号密码登陆
			Login() {
				if (!this.validate('username')) return;
				if (!this.validate("password")) return;
				uni.showLoading({
					title: "登录中..."
				});

				setTimeout(() => {
					//隐藏登录状态
					uni.hideLoading();
					let that = this;
					// 发送请求
					this.myRequest("/merchant-staff-account/login", {
							username: that.username,
							password: that.password,
						},"POST").then(res => {
						console.log(res)
						if (res.data.status == 50001) {
							uni.showToast({
								icon:'none',
								title:res.data.message
							})
							// return
						}
						let access_token = res.data.data.access_token.access_token				
						uni.setStorageSync('token', access_token);
						uni.switchTab({
							url: "../../../index/index"
						})
					}).catch(err => {
						console.log(err)
					})
				}, 1000)

			},
			//判断验证是否符合要求
			validate(key) {
				let bool = true;
				if (!this.rules[key].rule.test(this[key])) {
					//提示信息
					uni.showToast({
						title: this.rules[key].msg,
					})
					//取反
					bool = false;
					return false;
				}
				return bool;
			},
			// 微信登陆
			getUserInfo() {		
				let _this = this;
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						/* let nickName = infoRes.userInfo.nickName; //昵称
						let avatarUrl = infoRes.userInfo.avatarUrl; //头像 */
						try {
							// console.log(infoRes)
							uni.setStorageSync('isCanUse', false); //记录是否第一次授权  false:表示不是第一次授权
							uni.setStorageSync('token', 'wqeqwewqe');
							uni.setStorageSync('nickName', infoRes.userInfo.nickName);
							uni.setStorageSync('avatarUrl', infoRes.userInfo.avatarUrl);
							// _this.updateUserInfo();
							uni.navigateBack()

						} catch (e) {
							console.log(e)
						}
					},
					fail(res) {
						console.log('登录失败')
					}
				})
			},
			// 1.wx获取登录用户code
			login() {
				let _this = this;
				uni.showLoading({
					title: '正在登录中'
				});
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						_this.code = loginRes.code;
						console.log(_this.isCanUse, _this.code)
						if (!_this.isCanUse) {
							//非第一次授权获取用户信息
							uni.getUserInfo({
								provider: 'weixin',
								success: function(infoRes) {
									console.log(infoRes)
									//获取用户信息后向调用信息更新方法
									let nickName = infoRes.userInfo.nickName; //昵称
									let avatarUrl = infoRes.userInfo.avatarUrl; //头像
								
									// _this.updateUserInfo(); //调用更新信息方法
								}
							});
						}

						//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
						uni.request({
							url: '服务器地址',
							data: {
								code: _this.code,
							},
							method: 'GET',
							header: {
								'content-type': 'application/json'
							},
							success: (res) => {
								//openId、或SessionKdy存储//隐藏loading
								uni.hideLoading();
							}
						});
					},
					fail(e) {
						console.log(e)
						uni.hideLoading();
					}
				})
			},
			//向后台更新信息
			updateUserInfo() { 
				this.setName(this.nickName, this.avatarUrl)
				let _this = this;
				var obj = {
					appid: "wx1*********0f06",
					secret: "07bd3*************096",
					code: this.code,
					// appid: "wx955561f82f6dd8ce",
					// secret: "1302ef07106ff1a1dffe00fccd530337",
					// code: this.code
				}
				
				// 这个接口要在后端调用(https://api.weixin.qq.com无法加入白名单)
				// https://api.weixin.qq.com/sns/jscode2session?appid="+appid+"&secret="+secret+"&js_code="+code+"&grant_type=authorization_code
				// 请求微信端地址获取用户唯一标识的
				htxcx(obj.appid, obj.secret, obj.code).then(res => {
					console.log("res:", res)

					res.data.openid // 唯一
					res.data.session_key
					this.encryptedData
					this.iv

					uni.reLaunch({ //信息更新成功后跳转到小程序首页
						url: '/pages/index/index'
					});
				}, err => {
					console.log("err:", err)
				})
			},

			go_forget() {
				uni.navigateTo({
					url: '../forget/forget',
					fail(Error) {
						console.log(Error)
					}
				})
			},
			go_register() {
				uni.navigateTo({
					url: '../register/register'
				})
			}

		}
	}
</script>

<style>
	.wxlanding {
		height: 84upx;
		line-height: 84upx;
		border-radius: 44upx;
		font-size: 32upx;
		margin-top: 20upx;
		background: linear-gradient(left, #00ff00, #aaff00);
	}

	.landing {
		height: 84upx;
		line-height: 84upx;
		border-radius: 44upx;
		font-size: 32upx;
        background: linear-gradient(left, #375cc4, #75c57a);
	}

	.login-btn {
		padding: 10upx 20upx;
		margin-top: 350upx;
	}

	.login-function {
		overflow: auto;
		padding: 20upx 20upx 30upx 20upx;
	}

	.login-forget {
		float: left;
		font-size: 26upx;
		color: #999;
	}

	.login-register {
		color: #666;
		float: right;
		font-size: 26upx;

	}

	.login-input input {
		background: #F2F5F6;
		font-size: 28upx;
		padding: 10upx 25upx;
		height: 62upx;
		line-height: 62upx;
		border-radius: 8upx;
	}

	.login-margin-b {
		margin-bottom: 25upx;
	}

	.login-input {
		padding: 10upx 20upx;
	}

	.login-head {
		font-size: 34upx;
		text-align: center;
		padding: 25upx 10upx 55upx 10upx;
	}

	.login-card {
		background: #fff;
		border-radius: 12upx;
		padding: 10upx 25upx;
		box-shadow: 0 6upx 18upx rgba(0, 0, 0, 0.12);
		position: relative;
		margin-top: 120upx;
	}

	.login-bg {
		height: 260upx;
		padding: 25upx;
		background: linear-gradient(top, #375cc4, #75c57a);
	}
</style>
