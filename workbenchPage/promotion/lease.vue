
<template>
	<view class="">
		<uni-table class="table" border stripe emptyText="暂无更多数据" >
		    <!-- 表头行 -->
		    <uni-tr>
		        <uni-th align="center">商户名称</uni-th>
		        <uni-th align="center">商户账户姓名</uni-th>
		        <uni-th align="center">商户账户</uni-th>
		        <uni-th align="center">摊位编号</uni-th>
				<uni-th align="center">起始时间</uni-th>
		    </uni-tr>
		    <!-- 表格数据行 -->
		    <uni-tr v-if="item.contract_id == contract_id"  v-for="(item,index) in leaseList" :key='index'>
		        <uni-td align="center">{{item.merchant_name}}</uni-td>
		        <uni-td align="center">{{item.merchant_staff_username}}</uni-td>
		        <uni-td align="center">{{item.merchant_staff_name}}</uni-td>
		        <uni-td align="center">{{item.stall}}</uni-td>
		        <uni-td align="center">{{item.rent_begin_date}} 至 {{item.rent_end_date}}</uni-td>
		    </uni-tr>	
		</uni-table>

	</view>
</template>

<script>
	export default {
		data(){
			return{
				contract_id:'',
				leaseList:[]
			}
		},
		onShow() {
			
		},
		onLoad(option) {
			console.log(option)
			this.contract_id = option.contract_id
		},
		onReady() {
			this.myRequest('/contract/contract-list?page=1',{
				flag:"rent",
				page_size:0,
				contract_id:0,
			},"POST").then(res => {
				console.log(res)
				this.leaseList = res.data.data
			})
		},
		methods:{
			
		}
	}
</script>

<style>
	.table{
		margin-bottom: 20rpx;
	}
</style>
