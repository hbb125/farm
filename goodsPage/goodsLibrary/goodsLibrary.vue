<template>
	<view class="">
		<view class="btn">
			<button class="save" size="mini" type="default" @click="cansel">取消</button>
			<button class="save" size="mini" type="primary" @click="save">上架</button>
		</view>
		<view class="page-body" :style="'height:'+height+'px'">
			<scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'" :scroll-top="scrollLeftTop"
			 scroll-with-animation>
				<view class="nav-left-item" @click="categoryClickMain(item,index)" :key="index" :class="index==categoryActive?'active':''"
				 v-for="(item,index) in classifyData">
					{{item.goods_type.goods_type_info.type_name}}
					<!-- <view v-if="isShow" class="grid-dot">
						<uni-badge :text="number" size="small" type="error" />
					</view> -->
				</view>
			</scroll-view>

			<scroll-view @scrolltolower="scrolltolower" lower-threshold="50" :class="nav-right" scroll-y :scroll-top="scrollTop"
			 @scroll="scroll" :style="'height:'+height+'px'" scroll-with-animation>
				<view v-for="(goods,index) in classifyData" :key="index" class="box">
					<view class="type">{{goods.goods_type.goods_type_info.type_name}}</view>
					<view ref="goods" :id="i==0?'first':''" :class="{'nav-right-item':true,'active1': add_active.indexOf(item.stock_id)>=0  } "
					 v-for="(item,i) in goods.goods_type.goods_list" :key="i" @click="cart(item,item.goods_name)">
						<image :src="url + item.pic_goods" />
						<view class="dot">{{item.goods_name}}</view>
						<view class="k_btm">
							<view class="kecun">
								<!-- <text>库存:{{item.amount+"/"+item.unit}}</text> -->
								<!-- <text>库存:{{item.pricing_method == "2" ? parseInt(item.amount)+"/"+item.unit : item.amount+"/"+item.unit}}</text> -->
								<text>库存:{{item.pricing_method == "2" ? parseInt(item.amount) : item.amount}}<text>/</text>{{item.unit}}</text>
							</view>
							<view class="k_price">
								<text>￥{{item.guiding_price}}</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<!-- <view class="loading-text safearea-bottom">
				<uni-load-more :status="more" :iconSize="18"></uni-load-more>
			</view> -->

		</view>

	</view>

</template>
<script>
	export default {
		data() {
			return {
				n: 1,
				loading: false,
				finished: false,
				url: 'https://backend.juleikeji.com/',
				name: "wkiwi",
				height: 0,
				categoryActive: 0,
				scrollTop: 0,
				scrollLeftTop: 0,
				// scrollHeight: 0,
				classifyData: [],
				arr: [0, 584, 1168, 1752, 2336, 2805, 3274, 3858, 4442, 4911, 5380, 5734, 6203, 6672, 7017], //初始值，后边计算会根据手机适配覆盖
				leftItemHeight: 51, //49行会计算出新值进行覆盖
				navLeftHeight: 0, //左边scroll-view 内层nav的总高度
				diff: 0, //左边scroll-view 内层nav的总高度与视口之差
				tabBarHeight: 0, //如果此页面为Tab页面，自己改变高度值,,一般tab高度为51
				filter_type_id: 0,
				page_size: 0, //注意 每页显示多少条数据 数据多时会溢出，出现bug 每页设置100 500较好
				isShow: false,
				number: 0,
				filterId: 96,
				goods: [],
				add_active: [],
			}
		},
		created() {
			//如果你的分类数据为后台异步获取请	将下方代码放置你的数据回调中
			// this.$nextTick(()=>{
			// 	this.getHeightList();
			// })
		},
		onLoad: function() {
			this.height = uni.getSystemInfoSync().windowHeight - this.tabBarHeight;
		},
		onReady() {
			this.getHeightList();
			this.getGoodsData();
		},
		computed: {
			// more() {
			// 	return this.finished ? "noMore" : 'loading'
			// }
		},

		methods: {
			scrolltolower() {
				// 触底的时候请求数据，即为上拉加载更多
				console.log("触底了");
				this.n++;
				!this.finished && (this.loading = true, this.getGoodsData(this.n))
			},
			getGoodsData() {
				let that = this;
				this.$nextTick(() => {
					this.myRequest("/stock/get-my-stock?page=" + this.n + "", {
						filter_type_id: this.filter_type_id,
						page_size: this.page_size,
					}, "POST").then(res => {
						console.log(res);
						// res.data.data.forEach(item => {	
						// 	that.classifyData.push(item)
						// })
						that.classifyData = res.data.data;
					})
					this.getHeightList();
				})

			},
			getHeightList() {
				let _this = this;
				let selectorQuery = uni.createSelectorQuery();

				selectorQuery.selectAll('.nav-left-item').boundingClientRect(function(rects) {
					_this.leftItemHeight = rects[0].height;
					_this.navLeftHeight = _this.leftItemHeight * _this.classifyData.length;
					_this.diff = _this.navLeftHeight - _this.height;
				});

				setTimeout(function() {
					selectorQuery.selectAll('.box').boundingClientRect(function(rects) {
						// console.log(rects)
						let arr = [0];
						let top = 0;
						rects.forEach(function(rect) {
							//rect.id      // 节点的ID
							//rect.dataset // 节点的dataset
							//rect.left    // 节点的左边界坐标
							//rect.right   // 节点的右边界坐标
							//rect.top     // 节点的上边界坐标
							//rect.bottom  // 节点的下边界坐标
							//rect.width   // 节点的宽度
							//rect.height  // 节点的高度
							top += rect.height;
							arr.push(top)
						})
						// console.log(arr)
						_this.arr = arr
					}).exec()
				}, 1000)

			},
			scroll(e) {
				let _this = this
				if (this.timeoutId) {
					clearTimeout(this.timeoutId);
				}
				this.timeoutId = setTimeout(function() { //节流
					// _this.scrollHeight = e.detail.scrollTop + 1 + _this.height / 2;
					_this.scrollHeight = e.detail.scrollTop + 1;
					//+1不要删除，解决最后一项某种情况下翻到底部，左边按钮并不会切换至最后一个
					//若想使切换参考线为屏幕顶部请删除 _this.height/2
					for (let i = 0; i < _this.arr.length; i++) {
						let height1 = _this.arr[i];
						let height2 = _this.arr[i + 1];
						if (!height2 || (_this.scrollHeight >= height1 && _this.scrollHeight < height2)) {
							_this.categoryActive = i;
							(_this.diff > 0) && (_this.scrollLeftTop = Math.round((_this.categoryActive * _this.diff) / (_this.classifyData
								.length - 1)));
							return false;
						}
					}
					_this.categoryActive = 0;
					_this.timeoutId = undefined;
				}, 10)
			},
			categoryClickMain(item, index) {
				console.log(item)
				this.filterId = item.goods_type.goods_type_info.type_id
				// console.log(this.filterId)
				this.categoryActive = index;
				this.scrollTop == this.arr[index] ? this.scrollTop = this.scrollTop + 1 : this.scrollTop = this.arr[index] //防止两次相等造成点击不触发滚动时间
			},
			cart: function(goods, text) {
				console.log(goods)
				this.goods.push({
					"goods_id": parseInt(goods.goods_id),
					"pricing_method": parseInt(goods.pricing_method),
					"unit": goods.unit,
					"unit_price": parseFloat(goods.guiding_price),
				})
                // 根据多个条件对数组中的对象去重
				let newobj = {}
				this.goods = this.goods.reduce((preVal, curVal) => {
				    newobj[curVal.goods_id + curVal.pricing_method + curVal.unit + curVal.unit_price] ? '' : newobj[curVal.goods_id + curVal.pricing_method + curVal.unit + curVal.unit_price] = preVal.push(curVal);
					return preVal
				}, [])
				console.log(this.goods)
				
				let i = this.add_active.indexOf(goods.stock_id)
				if (i >= 0) {
					this.add_active.splice(i, 1);
					this.goods.splice(i, 1)
				} else {
					uni.showToast({
						title: "选中了 " + text,
						icon: "none",
					})
					this.add_active.push(goods.stock_id);
				}

			},
			cansel() {
				if (this.goods.length != 0) {
					this.goods = []
					uni.showToast({
						title: "商品已取消"
					})
				}
				uni.navigateBack()
				// uni.navigateTo({
				// 	url:"/goodsPage/myGoods/myGoods"
				// })
				this.showGoods = false
			},
			save() {
				let that = this
				if (this.goods.length != 0) {
					uni.request({
						url: "https://api.juleikeji.com/goods-shelves/add",
						method: "POST",
						dataType: "JSON",
						header: {
							'content-type': 'application/json', // 默认值
							"Authorization": 'Bearer ' + uni.getStorageSync('token')
						},
						data: this.goods,
						success(res) {
							let responseData = JSON.parse(res.data)
							console.log(responseData)
							if (responseData.status == 200) {
								uni.showToast({
									title: "商品上架成功",
								})
								that.goods = []
								that.add_active = []
								setTimeout(function() {
									uni.navigateTo({
										url: "../myGoods/myGoods"
									})
								}, 1000)
							} else if (responseData.status == 60010) {
								uni.showToast({
									title: responseData.message,
								})
								that.goods = []
								that.add_active = []
							} else {
								uni.showToast({
									title: "商品上架失败",
								})
							}
						}
					})

				} else {
					uni.showToast({
						title: "请选择商品"
					})
				}

			}

		},
		components: {}
	}
</script>

<style>
	.active1 {
		border: 1px solid #7FFF00;
	}

	.grid-dot {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 9999;
	}

	.btn {
		text-align: right;
		background-color: #fff;
		height: 80rpx;
		border-bottom: 1px solid #eee;
		z-index: 9999;
	}

	.save {
		margin: 10rpx;
		font-size: 20rpx;
	}

	.loading-text {
		position: fixed;
		bottom: 0;
		left: 50%;
		border: 1px solid red;
	}

	.type {
		font-size: 30rpx;
		color: #ff89b1;
	}

	.page-body {
		display: flex;
		background: #fff;
		overflow: hidden;
	}

	.nav {
		display: flex;
		width: 100%;
	}

	.nav-left {

		width: 25%;
		background: #fafafa;
	}

	.nav-left-item {
		position: relative;
		height: 100upx;
		border-right: solid 1px #f1f1f1;
		border-bottom: solid 1px #f1f1f1;
		font-size: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-left-item:last-child {
		border-bottom: none;
	}

	.nav-right {
		width: 75%;

	}

	.box {
		display: block;
		overflow: hidden;
		border-bottom: 20upx solid #f3f3f3;
		/* min-height: 100vh; */
		/*若您的子分类过少想使得每个子分类占满屏请放开上边注视 */
	}

	.k_btm {
		display: flex;
		justify-content: space-between;
		margin-top: 5rpx;
		height: 30rpx;
		font-size: 16rpx;

	}

	.kecun {
		/* text-align: left; */
	}

	.k_price {
		text-align: right;
		color: red;
	}

	.dot {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.box:last-child {
		border: none;
		min-height: 100vh;
	}

	.nav-right-item {
		width: 33.3%;
		height: 250upx;
		float: left;
		text-align: center;
		padding: 11upx;
		font-size: 28upx;
		/* background: #fff; */
	}

	.nav-right-item image {
		width: 150upx;
		height: 150upx;
	}

	.active {
		color: #FF80AB;
		background: #fff;
		border-right: 0;
	}

	::-webkit-scrollbar {
		/*取消小程序的默认导航条样式*/
		width: 0;
		height: 0;
		color: transparent;
	}
</style>
