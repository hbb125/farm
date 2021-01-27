<template>
	<view class="stock-page">
		<view class="basic-info">
			<view class="form-item border">
				<!-- <view class="label">
					<text>供货商：</text>
				</view> -->
				<!-- <picker mode="selector" :range="supplierList" range-key="supplier_name" @change="bindSupplierChange" class="picker">
					<input class="uni-input" v-model="form.supplier" type="text" disabled placeholder-class="placeholder-color"
					 placeholder="请选择供货商">
				</picker> -->
				<!-- <uni-icons class="input-arrow" type="arrowdown" size="14"></uni-icons> -->
				
				<combox-list labelWidth="180rpx" placeholder="请输入并选择供货商" label="供货商：" :candidates="supplierList"
				 :supplierData="supplierData" @getSupplierId='getSupplierId' emptyTips="暂无该供应商">
				</combox-list>
				
			</view>
			<view class="form-item border">
				<view class="label">
					<text>进货单号：</text>
				</view>
				<input v-model="order_id" class="uni-input" placeholder-class="placeholder-color" type="text" placeholder="请输入运货单号">
			</view>
			<!-- 上传凭证 -->
			<g-upload class="mb20" ref='gUpload' uploadText="上传凭证" :mode="imgList" @chooseFile='chooseFile' @imgDelete='imgDelete'></g-upload>

		</view>

		<!-- 商品添加 -->
		<view class="goods" v-for="(item, index) in goodsList" :key="index">
			<view class="title">
				<text>商品{{index+1}}</text>
				<uni-icons v-if="goodsList.length > 1" type="trash" size="18" color="#666" @click="dleGoodsHandle(index)"></uni-icons>
			</view>

			<view class="basic-info">
				<uni-combox @getGoodsId="getGoodsId" @loadMore="loadMore" v-model="item.goods_id" class="border" labelWidth="180rpx"
				 required placeholder="请输入并选择商品" label="商品名称：" :candidates="queryList" :goodsData="goodsData" emptyTips="暂无该商品">
				</uni-combox>

				<view class="form-item quxing border">
					<view class="label">
						<text>计价方式：</text>
					</view>
					<input v-model="pricingMethod[item.pricing_method]" disabled placeholder-class="placeholder-color" class="uni-input"
					 type="text" placeholder="请选择计价方式" @click="selectMethod(index)">
					<uni-icons class="input-arrow" type="arrowdown" size="14"></uni-icons>
				</view>

				<view class="form-item quxing border">
					<view class="label">
						<text>进货单位：</text>
					</view>
					<input v-model="item.unit" disabled placeholder-class="placeholder-color" class="uni-input" type="text"
					 placeholder="请选择单位" @click="selectUnit(index)">
					<uni-icons class="input-arrow" type="arrowdown" size="14"></uni-icons>
				</view>

				<view class="form-item border">
					<view class="label">
						<text>进货数量：</text>
					</view>
					<input v-model="item.amount" placeholder-class="placeholder-color" class="uni-input" type="digit" placeholder="请输入进货数量">
				</view>

				<view class="form-item quxing border">
					<view class="label">
						<text>进货单价：</text>
					</view>
					<input v-model="item.unit_price" placeholder-class="placeholder-color" class="uni-input" type="digit" placeholder="请输入进货单价">
					<view class="mark-right">元</view>
				</view>

				<view class="form-item">
					<view class="label">
						<text>进货日期：</text>
					</view>
					<picker mode="date" @change="bindDateChange($event, item)" class="picker">
						<input class="uni-input" v-model="date1" type="text" disabled placeholder-class="placeholder-color" placeholder="请选择进货时间">
					</picker>
					<uni-icons class="input-arrow" type="arrowdown" size="14"></uni-icons>
				</view>
			</view>
		</view>
		<!-- 商品添加 -->
		<view class="addGoodsBtn" @click="addGoodsHandle">
			<uni-icons type="plus" size="20" color="#666" class="icon"></uni-icons>
			<text class="txt">新增商品</text>
		</view>

		<view class="uplaod" @click="upload">
			<text class="txt">进货</text>
		</view>
	</view>
</template>

<script>
	import {
		clone
	} from "../../util/commonly"

	let goodsItem = {
		goods_id: '',
		unit: '',
		amount: '',
		unit_price: '',
		purchase_date: "",
		pricing_method: ''
	}
	export default {
		data() {
			return {
				queryList: [],
				unitList: ['斤', 'kg', '件'],
				pricingMethod: ["", '计重', '计件'],
				// form: {
				// 	order: '',
				// 	supplier: '',
				// 	supplier_id: '',
				// },
				supplierId:'',
				goodsList: [clone(goodsItem)],
				imgList: [],
				supplierList: [],
				goodsData: [],
				supplierData: [],
				page_size: 0,
				goods_id: '',
				order_id: '',
				base64Arr: [],
				date1: new Date().toISOString().slice(0, 10),
			}
		},
		onLoad() {
			this.getGoodsData()
			this.getSupplierList()
		},

		methods: {
			getSupplierId(supplierId) {
				console.log(supplierId)
				this.supplierId = supplierId
			},
			// 下拉加载更多，暂时不需要
			// loadMore(n) {
			// 	this.getGoodsData(n)
			// },
			getSupplierList() {
				this.myRequest('/merchant-staff/show-supplier', {
					page_size: this.page_size
				}, "POST").then(res => {
					// console.log(res)
					this.supplierData = res.data.data.items
					res.data.data.items.forEach((item) => {
						this.supplierList.push(item.supplier_name)
					})
				})
			},
			getGoodsData(n) {
				let that = this;			
				this.$nextTick(() => {
					this.myRequest("/goods/get-all-goods","POST").then(res => {
						console.log(res)
						res.data.data.forEach((item) => {
							that.goodsData.push.apply(that.goodsData, item.goods_type.goods_list)
							// console.log(that.goodsData)
							item.goods_type.goods_list.forEach(it => {
								that.queryList.push(it.goods_name)
							})
						})				
					})
				})
			},
			// bindSupplierChange: function(e) {
			// 	console.log(e)
			// 	console.log('picker发送选择改变，携带值为', e.target)
			// 	let index = e.target.value;
			// 	this.form.supplier = this.supplierList[index].supplier_name
			// 	this.form.supplier_id = this.supplierList[index].supplier_id
			// 	console.log(this.form)
			// },
			bindDateChange: function(e, item) {
				console.log('picker发送选择改变，携带值为', e.target, item)
				// item.purchase_date = e.target.value;
				this.date1 = e.target.value;
			},
			selectMethod(idx) {
				let _that = this;
				console.log(idx)
				uni.showActionSheet({
					itemList: this.pricingMethod,
					success(res) {
						console.log(res)
						_that.goodsList[idx].pricing_method = res.tapIndex
						switch (res.tapIndex) {
							case 1:
								_that.unitList = ['斤', 'kg']
								_that.goodsList[idx].unit = 'kg'
								break;
							case 2:
								_that.goodsList[idx].unit = '件'
								_that.unitList = ['件']
								break;
						}
					}
				})
			},
			selectUnit(idx) {
				let _that = this;
				uni.showActionSheet({
					itemList: this.unitList,
					success(res) {
						console.log(res)
						// _that.goodsList[idx].unit = res.tapIndex
						_that.goodsList[idx].unit = _that.unitList[res.tapIndex]

					}
				})
			},
			addGoodsHandle() {
				this.goodsList.push(clone(goodsItem))
			},
			dleGoodsHandle(idx) {
				this.goodsList.splice(idx, 1)
			},
			/*
			上传后返回的值：
			list：上传后图片数组
			v：返回当前上传图片的临时路径
			*/
			chooseFile(list, v) {
				console.log("上传图片_list：", list)
				console.log("上传图片_v：", v);
				this.uploadFileToServe(v)
				this.urlTobase64(v[0])

			},
			urlTobase64(url) {
				console.log('调用了urlTobase64')
				let base64 = uni.getFileSystemManager().readFileSync(url, "base64")
				// console.log(base64)
				this.base64Arr.push(base64)
			},
			/*
			删除图片：
			list：删除返回删除后剩余的图片数组
			eq：返回删除的数组
			*/
			imgDelete(list, eq) {
				console.log("删除图片_list：", list)
				console.log("删除图片_eq：", eq)
				this.base64Arr.splice(eq,1)
				// console.log(this.base64Arr)
			},
			/* 上传图片到服务器 */
			uploadFileToServe(v) {

			},
			getGoodsId(goods_id) {
				console.log(goods_id)
				this.goodsList[this.goodsList.length - 1].goods_id = goods_id

			},
			checked() {
				uni.showModal({
					title: "提示",
					content: "请检查信息是否填写完善"
				})
			},
			upload() {
				// console.log(this.order_id, this.supplierId, this.base64Arr)
				if (this.supplierId == '') {
					uni.showModal({
						title:"提示",
						content:'请选择供货商'
					})
					return
				}
				if (this.order_id == '') {
					uni.showModal({
						title:"提示",
						content:'请选择进货单号'
					})
					return
				}
				if (this.base64Arr.length == 0) {
					uni.showModal({
						title:"提示",
						content:'请上传凭证'
					})
					return
				}
				let flag = this.goodsList.every(item => {
					item.purchase_date = this.date1
					return item.goods_id != "" && item.amount != "" && item.purchase_date != ""
				})
				console.log(flag)
				if (!flag) {
					this.checked()
					return
				}
				let that = this
				let batch_inf = {
					batch_num: this.order_id,
					supplier_id: this.supplierId,
				}
				let obj = {
					batch_inf: batch_inf,
					batch_pics: this.base64Arr,
					goods_list: this.goodsList,
				}
				console.log(this.goodsList)
				console.log(this.base64Arr)
				console.log(obj)

				uni.request({
					url: "https://api.juleikeji.com/stock/add-purchase-and-stock",
					method: "POST",
					dataType: "JSON",
					header: {
						'content-type': 'application/json', // 默认值
						"Authorization": 'Bearer ' + uni.getStorageSync('token')
					},
					data: obj,
					success(res) {
						console.log(res)
						let data = JSON.parse(res.data)
						if (data.status == 200) {
							uni.showToast({
								title: "商品进货成功"
							})
							that.goodsList = []
							setTimeout(function() {
								uni.navigateTo({
									url: "/goodsPage/goodsLibrary/goodsLibrary"
								})
							}, 500)
						}
						if (data.status == 1001) {
							uni.showModal({
								title: "提示",
								content: "批次已存在请勿重复添加"
							})
							return
						}

					}
				})

			}
		}
	}
</script>

<style scoped lang="scss">
	/deep/ .placeholder-color {
		color: $uni-text-color-placeholder;
	}

	.mb20 {
		margin-top: 20rpx;
	}

	.stock-page {
		padding: 20rpx 20rpx 30rpx;

		.label {
			width: 180rpx;
			font-size: 32rpx;
			color: $uni-color-subtitle;
		}

		.border {
			border-bottom: 1rpx solid #ddd;
		}

		.form-item {
			position: relative;
			display: flex;
			align-items: center;
			height: $inputH;
			padding: $inputPadding;

			&::before {
				content: "*";
				position: absolute;
				left: 4px;
				font-size: 32rpx;
				color: $uni-color-error;
			}

			.picker {
				flex: 1;
			}

			.uni-input {
				flex: 1;
				height: $inputH;
				line-height: $inputH;
				font-size: 16px;
			}

			.input-arrow {
				padding: 10px;
			}

			.mark-right {
				padding-right: 10px;
				font-size: 16px;
			}
		}

		.quxing {
			&::before {
				content: "";
				position: absolute;
				left: 4px;
				font-size: 32rpx;
				color: $uni-color-error;
			}
		}

		.basic-info {
			background-color: #fff;
			border-radius: $borderRadius16;
			padding: 10rpx 10rpx 10rpx 20rpx;
			margin-bottom: 20rpx;
		}

		.goods {
			background-color: #fff;
			border-radius: $borderRadius16;

			.title {
				height: 100rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-left: 30rpx;
				padding-right: 20rpx;
				border-bottom: 1rpx solid #ddd;
				font-size: 32rpx;
				font-weight: 600;
			}
		}

		/* 添加商品按钮 */
		.addGoodsBtn {
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 30rpx;
			background-color: #FFFFFF;
			border-radius: $borderRadius16;

			.icon {
				margin-top: 2px;
			}

			.txt {
				margin-left: 6rpx;
				font-size: 32rpx;
				color: #666;
			}
		}

		.uplaod {
			line-height: 86rpx;
			margin-bottom: 50rpx;
			text-align: center;
			color: #fff;
			font-size: 32rpx;
			background-image: $backGroundGradient;
			border-radius: 43rpx;
		}
	}
</style>
