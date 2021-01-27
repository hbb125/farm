<template>
	<view class="content">

		<uni-list>
			<uni-list :border="true">
				<!-- 显示圆形头像 -->
				<uni-list-chat v-for="(item,index) in contractList" :key="index" :avatar-circle="true" title="我的合同" avatar="/static/images/banner1.jpg"
				 :note="item.contract_num" :time="item.contract_date" link @click="onClick($event,item.contract_id)">
				</uni-list-chat>
			</uni-list>
		</uni-list>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				contractList: []
			}
		},
		onReady() {
			this.$nextTick(function() {
				this.myRequest('/contract/contract-list?page=1', {
					flag: "contract",
					page_size: 0,
					contract_id: 0,
				}, "POST").then(res => {
					console.log(res)
					this.contractList = res.data.data
				})
			})
		},
		methods: {
			onClick(e, id) {
				console.log(e)
				uni.navigateTo({
					url: `/workbenchPage/promotion/lease?contract_id=${id}`
				})
			},
		}
	}
</script>
