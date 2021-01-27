<template>
	<view class="login-page">
		<image src="../../static/images/goods1.png" mode=""></image>
		<button  type="default" open-type="getUserInfo" @getuserinfo="getUserInfo" class="login-btn">微信登录</button>
		<view class="toggle-login">
			<text>手机号码登录/注册</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
              isShow:false,
			}
		},
		onLoad() {
			this.login()
		},
		methods: {
			getUserInfo() {
				// this.login()
				let _this = this;
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						/* let nickName = infoRes.userInfo.nickName; //昵称
						let avatarUrl = infoRes.userInfo.avatarUrl; //头像 */
						try {
							console.log(infoRes)
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
						let code = loginRes.code;
						console.log(_this.isCanUse,code)
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
								code: code,
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
			updateUserInfo() { //向后台更新信息
				this.setName(this.nickName, this.avatarUrl)
				let _this = this;
				var obj = {
					appid: "wx1*********0f06",
					secret: "07bd3*************096",
					code: this.code
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
			}
		
		}
	}
</script>

<style scoped lang="scss">

	.login-page {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		padding: 0 40rpx;

		.login-btn {
			width: 100%;
			line-height: 88rpx;
			color: #fff;
			border: none;
			outline: none;
			background-color: #4fab3d;
			border-radius: 44rpx;
		}

		.toggle-login {
			padding: 25rpx 0;
		}
	}
</style>
