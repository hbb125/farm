<template>
	<view class="feedback-page">
		<view class="item">
			<textarea v-model="ziMechant_name" placeholder="请输入要授权的子账户" :maxlength="200" />
			</view>
		<button class="btn" @click="grant">授权</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ziMechant_name:"",
			}
		},
		methods: {
			grant(){
				if (this.ziMechant_name == "") {
					uni.showModal({
						title:"提示",
						content:"子账户名不能为空",
					})
					return;
				}
				this.myRequest('/merchant/grant',{
					username:this.ziMechant_name
				},"POST").then(res => {
					console.log(res)
					if (res.data.status == 200) {
						uni.showToast({
							title:"授权成功"
						})
						setTimeout(function() {
							uni.navigateBack()
						},1000)
					} else if (res.data.status == 90003) {
						uni.showModal({
							title:"提示",
							content:res.data.message
						})
					} else if (res.data.status == 90001) {
						uni.showModal({
							title:"提示",
							content:res.data.message
						})
					}else if (res.data.status == 90002) {
						uni.showModal({
							title:"提示",
							content:res.data.message
						})
					}else if (res.data.status == 90004) {
						uni.showModal({
							title:"提示",
							content:res.data.message
						})
					}
				})
			}	
		}
	}
</script>

<style scoped lang="scss">	
	.feedback-page {
		padding: 20rpx;
		.item {
			background-color: #fff;
			border-radius: $borderRadius16;
			margin-bottom: 20rpx;
		}
		textarea {
			width: 100%;
			padding: 20rpx;
		}
		
		.ipt {
			height: 100rpx;
			line-height: 100rpx;
			padding-left: 20rpx;
		}
		
	}
</style>
