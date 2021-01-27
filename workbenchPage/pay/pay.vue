<template>
	<view class="content">
		<!-- 用户信息 -->
		<view class="userInfo">
			<view class="userInfo_left">
				<image :src="user.avatarUrl" mode="" class="avatar"></image>
				<span class="name">
					{{user.nickName}}
				</span>
			</view>
			<view class="payRecord">
				缴费记录
			</view>
		</view>
		<!-- 我的摊位 -->
		<view class="myStall">
			<view class="stall">
				<text class="textStall">我的摊位</text>
				<text class="textStall">...</text>
			</view>
			<view  v-for="(item,index) in Booth" :key="index">
				<navigator class="electricity_fees" :url="item.url">
					<view>
						<view class="name">{{item.name}}</view>
						<text class="phone">{{item.phone}}</text>
					</view>
					<uni-icons type="arrowright" size="13"></uni-icons>
				</navigator>
			</view>
		</view>
		<!-- 消息 -->
		<view class="goods">
			<text>您暂时没有需要缴纳的费用!</text>
		</view>
		<!-- 更多缴费 -->
		<view class="myStall">
			<view class="stall">
				<text class="textStall">更多缴费</text>
			</view>
			<view class="morefees">
				<view class="item" v-for="(item,index) in morePay" :key="index">
					<image :src="item.picUrl" mode=""></image>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					avatarUrl: "",
				},
				Booth: [{
					id:1,
					icon: '',
					name: '电费',
					phone: '17837038832',
					url: "./paymentBill/paymentBill?id=1"
				}, {
					id:2,
					icon: '',
					name: '水费',
					phone: '17837038832',
					url: "./paymentBill/paymentBill?id=2"
				}, {
					id:3,
					icon: '',
					name: '摊位费',
					phone: '17837038832',
					url: "./paymentBill/paymentBill?id=3"
				}, ],
				morePay: [{
					picUrl: "../../static/images/goods1.png",
					name: '电费'
				}, {
					picUrl: "../../static/images/goods1.png",
					name: '水费'
				}, {
					picUrl: "../../static/images/goods1.png",
					name: '摊位费'
				}, {
					picUrl: "../../static/images/goods1.png",
					name: '物业费'
				}, {
					picUrl: "../../static/images/goods1.png",
					name: '停车费'
				}]
			}
		},
		onShow() {
			if (this.checkLogin()) {
				this.getUserInfo()
			}
		},
		methods: {
            getUserInfo() {
            	this.myRequest('/merchant-staff/get-current-merchant-staff', 'POST').then(res => {
            		let data = res.data.data
            		console.log(data)
            		this.user = {
            			avatarUrl: data.merchant_staff_head_sculpture == '' ? "/static/images/logo.png" : data.merchant_staff_head_sculpture,
            			nickName: data.staff_name
            		}
            	})
            },
		}
	}
</script>

<style scoped lang="scss">
	$fs:35rpx;

	.userInfo {
		display: flex;
		width: 100%;
		height: 300rpx;
		padding-top: 40rpx;
		background-color: #375cc4;
		justify-content: space-between;

		.userInfo_left {
			display: flex;
			margin-left: 40rpx;

			.avatar {
				display: inline-block;
				width: 122rpx;
				height: 122rpx;
				border-radius: 50%;
				// background-color: pink;
				vertical-align: middle;
			}

			.name,
				{
				font-size: $fs;
				color: #fff;
				margin-top: 40rpx;
				margin-left: 20rpx;
			}
		}

		.payRecord {
			font-size: $fs;
			color: #fff;
			margin-top: 40rpx;
			margin-right: 20rpx;
		}
	}

	.myStall {

		padding: 40rpx 25rpx;
		width: 95%;
		margin: -100rpx auto;
		background-color: #fff;

		.stall {
			display: flex;
			justify-content: space-between;

			.textStall {
				font-size: $fs;
				color: #6e6e6e;
			}
		}

		.electricity_fees {
			margin-top: 100rpx;
			display: flex;
			justify-content: space-between;

			.name {
				color: #6d6d6d;
				font-size: $fs;
			}

			.phone {
				color: #b6b6b6;
			}
		}
	}

	.goods {
		width: 95%;
		margin: 0 auto;
		background-color: #fff;
		padding: 30rpx 0;
		margin: 120rpx 0 120rpx 20rpx;

		text {
			margin-left: 100rpx;
			color: #8c8c8c;
		}
	}

	.morefees {
		display: flex;
		flex-wrap: wrap;

		.item {
			margin: 80rpx 50rpx 0 0;
			text-align: center;
			width: 16%;
			height: 180rpx;

			image {
				border-radius: 50%;
				height: 100rpx;
				width: 100rpx;
				margin-bottom: 40rpx;
			}
		}
	}

	.morefees .item:nth-of-type(4n+1) {
		margin-left: 35rpx;
	}
</style>
