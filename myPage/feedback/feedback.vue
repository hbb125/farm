<template>
	<view class="feedback-page">
		<view class="item">
			<textarea v-model="content" placeholder="请留下你对市场的宝贵意见或建议" :maxlength="200"/>
		</view>
		<view class="item">
			<input class="ipt" type="text" v-model="phone" placeholder="手机号(必填)"/>
		</view>
		
		<button class="btn">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
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
