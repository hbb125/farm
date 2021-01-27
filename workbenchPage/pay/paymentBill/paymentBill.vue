<template>
	<view class="content">
		<view class="top"></view>
		<view class="header">
			<view class="h_left">
				<text>电费</text>
			</view>
			<view class="h_right">
				<text>查看账单</text>
			</view>
		</view>
		<view class="mian">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(options) {
			console.log(options.id);
			
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
     .top{
		width: 100%;
		height: 100rpx;
		background-color: #375cc4;
	 }
	 .header{
		 display: flex;
		 justify-content: space-between;
		 align-items: center;
		  width: 95%;
		  height: 100rpx;
		  margin: -70rpx auto 0;
		  padding: 0 20rpx;
		  font-size: 30rpx;
		  border-radius: 10rpx;
		  background-color: #fff;
	 }
	 .mian{
	 }
</style>
