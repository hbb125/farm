<template>
	<view class="my-page">
		<view class="user">
			<!-- 我的信息 -->
			<view class="user-info" @click="interceptLogin({route: '/personalPage/personalInfo/personalInfo'})">
				<image :src="user.avatarUrl" mode="" class="avatar"></image>
				<view v-if="isLogin" class="user-name">
					<text class="login txt-cut">{{user.nickName}}</text>
					<text>{{user.market}}</text>
				</view>

				<view v-else class="user-name">
					<text class="login txt-cut">登录/注册</text>
					<text class="tip">登录后同步您的数据</text>
				</view>

				<view v-if="isLogin">
					<text class="information">完善身份信息</text>
					<uni-icons type="arrowright" size="16" color="#fff"></uni-icons>
				</view>
			</view>
			<!-- 我的信息 -->
		</view>

		<view class="content">
			<view class="message">
				<text>欢迎入驻巨磊智慧农贸市场！</text>
			</view>
			<!-- 我的功能 -->
			<view class="my-service">
				<navigator v-for="(item, index) in myService" :key="index" url="" class="item" @click="interceptLogin(item)">
					<text>{{item.name}}</text>
					<text class="en">{{item.en_name}}</text>
				</navigator>
			</view>
			<!-- 我的功能 -->

			<!-- 功能列表 -->
			<view class="func-list">
				<view v-for="(item, index) in functionList" :key="index" class="func-item" @click="interceptLogin(item)">
					<view class="icon" >{{index+1}}</view>					
					<text class="title">{{item.title}}</text>
					<uni-icons type="arrowright" size="13"></uni-icons>
				</view>
			</view>
			<!-- 功能列表 -->

			<!-- 退出登录 -->
			<view class="login-out" @click="loginOut">
				<text>退出登录</text>
			</view>
			<!-- 退出登录 -->

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin: false,
				user: {
					avatarUrl: "/static/images/logo.png",
					nickName: "",
					market: String
				},
				myService: [{
					image: '',
					name: '我的合同',
					en_name: 'Contract',
					route: '/workbenchPage/promotion/promotion'
				}, {
					image: '',
					name: '我的消息',
					en_name: 'Message',
					route: '/myPage/message/message'
				}, {
					image: '',
					name: '投诉处理',
					en_name: 'Complaint',
					route: '/personalPage/complaint/complaint'
				}, {
					image: '',
					name: '支付配置',
					en_name: 'Repair',
					route: '/workbenchPage/payment/payment'
				}, {
					image: '',
					name: '我的库存',
					en_name: 'Stock',
					route: '/goodsPage/goodsLibrary/goodsLibrary'
				}, {
					image: '',
					name: '上架商品',
					en_name: 'Put on the shelves',
					route: '/goodsPage/myGoods/myGoods'
				}],
				functionList: [{
					icon: '',
					title: '修改手机',
					route: '/myPage/modifyMobile/modifyMobile'
				}, {
					icon: '',
					title: '修改密码',
					route: '/myPage/modifyPwd/modifyPwd'
				}, {
					icon: '',
					title: '关于我们',
					route: '/myPage/aboutUs/aboutUs'
				}, {
					icon: '',
					title: '客服中心',
					route: '/workbenchPage/kefu/kefu'
				}, {
					icon: '',
					title: '意见反馈',
					route: '/myPage/feedback/feedback'
				}, {
					icon: '',
					title: '授权子账户',
					route: '/myPage/grant/grant'
				}]
			}
		},
		onShow() {
			// if (this.isLogin = this.checkLogin()) {
			// 	this.user = {
			// 		avatarUrl: uni.getStorageSync('avatarUrl') ? uni.getStorageSync('avatarUrl') : '/static/images/goods1.png',
			// 		// nickName: uni.getStorageSync('username'),
			// 		// market: uni.getStorageSync('username')
			// 	}
			// }
			this.myRequest("/merchant-staff-account/heart-beat", {
				access_token: uni.getStorageSync('token')
			}, "POST").then(res => {
				// console.log(res)
				if (!res.data.success) {
					this.isLogin = false
					return
				}
				this.getUserInfo()
				this.isLogin = true
			})
		},
		onReady() {
			// 当前商户信息的接口
			// this.myRequest("/merchant-staff/get-current-merchant-staff", "POST").then(res => {
			// 	console.log(res)
			// 	uni.setStorageSync("username",res.data.data.staff_name)
			// 	this.user.market = res.data.data.staff_name
			// })
		},

		methods: {
			getUserInfo() {
				this.myRequest('/merchant-staff/get-current-merchant-staff', 'POST').then(res => {
					let data = res.data.data
					console.log(data)
					this.user = {
						avatarUrl: data.merchant_staff_head_sculpture == '' ? "/static/images/logo.png" : data.merchant_staff_head_sculpture,
						nickName: data.staff_name == '' ? "请完善信息" : data.staff_name
					}
				})
			},
			// 退出登陆
			loginOut() {
				let that = this
				uni.showModal({
					title: "提示",
					content: "确认退出当前账号？",
					success(res) {
						if (res.confirm) {
							let token = uni.getStorageSync("token")
							console.log(token)
							that.myRequest("/merchant/logout?access-token=" + token + "").then(res => {
								// console.log(res)
								if (res.data.status == 200) {
									uni.showLoading({
										title: "退出中"
									})
									setTimeout(() => {
										uni.reLaunch({
											url: '/pages/my/my'
										})
									}, 1000)
									uni.clearStorageSync()
								}
							})

						}
					}
				})
			}

		}
	}
</script>

<style scoped lang="scss">
	$H: 100rpx;

	.modify-pwd {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 110rpx;
		padding: 0 30rpx;
		background-color: #fff;
		margin-top: 20rpx;
		font-size: 30rpx;
		border-radius: $borderRadius16;
	}

	.my-page {
		.information {
			color: red;
		}

		.user {
			background-color: $uni-bg-color-main;
			padding: 4rpx 20rpx 90rpx;

			.user-info {
				display: flex;
				align-items: center;
			}

			.avatar {
				width: 122rpx;
				height: 122rpx;
				border-radius: 50%;
			}

			.user-name {
				flex: 1;
				margin-left: 20rpx;

				.login {
					width: 50%;
					font-size: 36rpx;
					margin-bottom: 4rpx;
					font-weight: 600;
				}

				.tip {
					font-size: 24rpx;
				}
			}

			text {
				color: #fff;
			}
		}
	}

	.content {
		padding: 0 20rpx;

		.message {
			display: flex;
			align-items: center;
			height: $H;
			padding-left: 30rpx;
			margin-top: -($H/2);
			background-color: #fff;
			border-radius: $borderRadius16;
			font-size: 28rpx;
			margin-bottom: 20rpx;
		}

		.my-service {
			display: flex;
			justify-content: space-between;
			align-content: space-between;
			flex-wrap: wrap;
			height: 598rpx;
			padding: 12rpx;
			margin-bottom: 20rpx;
			background-color: #fff;
			border-radius: $borderRadius16;

			.item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				width: 338rpx;
				height: 182rpx;
				padding-left: 30rpx;
				background-color: #808080;
				border-radius: $borderRadius12;
				overflow: hidden;


				text {
					font-size: 32rpx;
					color: #fff;

					&.en {
						color: #fafafa;
						font-size: 26rpx;
					}
				}
			}
		}

		.func-list {
			background-color: #fff;
			border-radius: $borderRadius16;
			padding: 10rpx 0;
			margin-bottom: 20rpx;

			.func-item {
				display: flex;
				justify-content: space-between;
				padding: 26rpx 20rpx 26rpx 30rpx;

				.title {
					flex: 1;
				}
			}
		}

		.login-out {
			padding: 26rpx 0;
			text-align: center;
			background-color: #fff;
			border-radius: $borderRadius16;
			margin-bottom: 30rpx;
		}
	}
</style>
