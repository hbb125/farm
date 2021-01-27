<template>
	<view class="steelyard-page">
		<view class="func-top">
			<view class="scan" @click="scanCode">
				<uni-icons type="scan" size="16" color="#fff" style="margin-right: 5px;"></uni-icons>
				<text>扫码登录</text>
			</view>
			<view class="add-goods" @click="interceptLogin({route: '/goodsPage/myGoods/myGoods'})">
				<text>商品管理</text>
			</view>
		</view>

		<view class="content">
			<!-- 秤信息start -->
			<view class="steelyard-info">
				<view class="st-top">
					<image :src="photoSrc" mode="" class="steelyard-img"></image>
					
					<text class="market-name">{{market_name}}</text>
					<view class="status">
						<text>{{status ? '在线' : '离线'}}</text>
					</view>
				</view>
				
				<view class="info-list">
					<view class="item">
						<text class="label">产品名称</text>
						<text class="desc">{{product_name}}</text>
					</view>
					<view class="item">
						<text class="label">产品型号</text>
						<text class="desc">{{product_model}}</text>
					</view>
					<view class="item">
						<text class="label">出厂日期</text>
						<text class="desc">{{production_date}}</text>
					</view>
				</view>
			</view>
			<!-- 秤信息end -->
			
			<!-- 修改密码start -->
		<!-- <view class="modify-pwd" @click="interceptLogin({route: '/myPage/modifyPwd/modifyPwd'})">
				<text>修改密码</text>
				<uni-icons type="arrowright" size="14"></uni-icons>
			</view> -->
			<!-- 修改密码end -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				photoSrc:"/static/images/logo.png",
				market_name: '巨磊市场',
				status: 1,
				product_name: '测试设备名称',
				product_model: '测试设备型号',
				production_date: '测试日期2020-11-13'
			}
		},
		methods: {
			onShow(){
				this.getUserInfo()
			},
			getUserInfo(){
				this.myRequest('/merchant-staff/get-current-merchant-staff','POST').then(res => {
					console.log(res)
					if (res.data.status == 401) {
						this.photoSrc =  "/static/images/logo.png"
						return
					}
					if (res.data.status == 200) {
						let data = res.data.data
						this.market_name = data.merchant_name
						this.photoSrc = data.merchant_staff_head_sculpture == "" ? "/static/images/logo.png" : data.merchant_staff_head_sculpture
					}	 
				})
			},
			scanCode() {
				var token = uni.getStorageSync('token');
				if (!token) {
					uni.showModal({
						title:"提示",
						content:"请先登录"
					})
					return
				}
				uni.scanCode({
					onlyFromCamera: true,
					success: (res) => {
						console.log(res)
						if (res.result.indexOf("http")+1) {
							uni.showModal({
								title:"提示",
								content:"请扫描电子秤二维码"
							})
							return;
						}
						let data = JSON.parse(res.result)
						let electronic_balance_uuid = data.device_id
						let code_request_token = data.token
						
						console.log(electronic_balance_uuid,code_request_token)
						this.myRequest("/merchant/verify-two-bar-code-request",{
							electronic_balance_uuid,
							code_request_token,
						},"POST").then(res => {
							console.log(res)
					        
							if(res.data.status == 200){
								uni.showToast({
									title:"扫码登陆成功",
								})
							}
							if(res.data.status == 50003){
								uni.showModal({
									title:"提示",
									content:res.data.message
								})
							}
							if (res.data.status == 50002) {
								uni.showModal({
									title:"提示",
									content:"二维码已过期"
								})
							}
						})
					}
				})
			}
		}
	}
</script>


<style scoped lang="scss">
	.steelyard-page {
		.func-top {
			display: flex;
			justify-content: space-between;
			align-items: start;
			// height: 280rpx;
			padding: 34rpx 20rpx 190rpx ;
			background-color: $uni-bg-color-main;

			.scan,
			.add-goods,
			text {
				color: #fff;
				font-size: 32rpx;
			}
		}

		.content {
			padding: 0 20rpx;
		}

		.steelyard-info {
			padding: 0 20rpx;
			border-radius: $borderRadius16;
			margin-top: -140rpx;
			background-color: #fff;

			.st-top {
				display: flex;
				flex-direction: column;
				align-items: center;
				border-bottom: 1px dotted #999;

				.steelyard-img {
					width: 220rpx;
					height: 220rpx;
					margin-top: -60rpx;
					margin-bottom: 25rpx;
					border-radius: 50%;
					
				}
				.market-name {
					font-size: 36rpx;
					color: #333;
					margin-bottom: 6rpx;
				}
				.status {
					font-size: 24rpx;
					color: #666;
					margin-bottom: 30rpx;
				}
			}

			.info-list {
				padding: 20rpx 10rpx;
				.item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 70rpx;
					font-size: 30rpx;
					.label {
						color: #333;
					}
					.desc {
						color: #999;
					}
				}
			}
		}
		// .modify-pwd {
		// 	display: flex;
		// 	justify-content: space-between;
		// 	align-items: center;
		// 	height: 110rpx;
		// 	padding: 0 30rpx;
		// 	background-color: #fff;
		// 	margin-top: 20rpx;
		// 	font-size: 30rpx;
		// 	border-radius: $borderRadius16;
		// }
	}
</style>
