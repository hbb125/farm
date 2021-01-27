<template>
	<view :class="{'my-goods-page':true,'act':background}">

		<view class="placeholder-h"></view>
		<view class="header">
			<view class="h-l">
				<text>
					共<text class="color-main">{{totalNum}}</text>件商品
				</text>
			</view>
			<navigator url="../goodsLibrary/goodsLibrary" hover-class="none" class="h-r">
				<uni-icons type="plus" size="17" color="#666" class="icon"></uni-icons>
				<text>商品上架</text>
			</navigator>
		</view>

		<view>
			<good-list @updatePrice="updatePrice1" ref="empty" @update="updateGoods" @update1="updateGoods1" :list="goods"></good-list>
		</view>

		<view class="bottom" v-show="showGoods">
			<button type="default" @click="changePrice">更改菜价</button>
			<button type="default" @click="del">删除商品</button>
			<button type="default" @click="cansel">取消</button>
		</view>
		<view class="loading-text safearea-bottom">
			<uni-load-more :status="more" :iconSize="18"></uni-load-more>
		</view>
		<!-- 更改菜价 -->
		<view class="model" v-show="isShow">
			<view class="m_top">
				<text>{{changeGoodsName}}</text>
			</view>
			<view class="m_price">
				<text>更改单价</text>
				<input :focus="isShow" type="digit" v-model="price" value="" placeholder="0.00" >
			</view>
			<view class="m_btn">
				<button type="default" @click="cansel1">取消</button>
				<button type="primary" @click="sure">确定</button>
			</view>
		</view>
		<!-- 更改菜价 -->
	</view>
</template>

<script>
	let flag = true
	export default {
		data() {
			return {
				n: 1,
				filter_type_id: 0,
				page_size: 10,
				totalNum: '',
				goods: [], // 数据列表
				arrGoods: [],
				loading: false,
				finished: false,
				showGoods: false,
				newarr: [],
				arr: [],
				changeGoodsName: '',
				isShow: false,
				price: "",
				goods_shelves_id: '',
				background: false,
				index:Number,
				pic_goods:''
				
			}
		},
		computed: {
			more() {
				return this.finished ? "noMore" : 'loading'
			}
		},
		onReady() {
			// this.showGoods = false
			this.request()
		},

		onPullDownRefresh() {
			this.n = 1
			this.goods = []
			this.request()
			this.finished = false
			
			console.log('refresh_start');
			setTimeout(function() {
				uni.stopPullDownRefresh();
				console.log('refresh_end');
			}, 300);
		},
		onReachBottom() {
			// 触底的时候请求数据，即为上拉加载更多
			console.log("触底了");
			this.n++;
			!this.finished && (this.loading = true, this.request())
		},
		methods: {
			updateGoods1(good) {
				console.log(good)
				this.changeGoodsName = good.goods_name
				this.goods_shelves_id = good.goods_shelves_id
				this.pic_goods = good.pic_goods
			},
			cansel1() {
				this.isShow = false
			},
			updatePrice1(index){
				console.log(index)
				this.index = index
			    if (this.price !="") {
					//强制刷新页面，更新价格
					this.$set(this.goods,this.index,{
						unit_price:this.price,
						goods_shelves_id:this.goods_shelves_id,
						goods_name:this.changeGoodsName,
						pic_goods:this.pic_goods
						})
				    this.price = ""
				}
			},
			sure() {
				let that = this
				
				this.$nextTick(function() {
					let price = parseFloat(this.price)
					this.myRequest("/goods-shelves/update-price", {
						goods_shelves_id: this.goods_shelves_id,
						unit_price: price,
					}, "POST").then(res => {
						console.log(res)
						if (res.data.status != 200) {
							return
						}
						uni.showToast({
							title: "单价修改成功"
						})
						
						// 待调试 不好
						this.updatePrice1(this.index)
						// that.goods = []
						// this.request()
						// console.log(res)
					})
				})
				this.isShow = false
			},

			updateGoods(add_active) {
				console.log(add_active)
				this.newarr = add_active
				add_active.length != 0 ? this.showGoods = true : this.showGoods = false
			},
			changePrice() {
			
				this.background = true
				this.isShow = true
			},
			
			del() {
				let that = this
				uni.showModal({
					title: '提示',
					content: '确定要删除所选商品',
					success: function(res) {
						if (res.confirm) {
							uni.request({
								url: "https://api.juleikeji.com/goods-shelves/remove",
								method: "POST",
								dataType: "JSON",
								header: {
									'content-type': 'application/json', // 默认值
									"Authorization": 'Bearer ' + uni.getStorageSync('token')
								},
								data: that.newarr,
								success(res) {
									that.arrGoods = []
									console.log(res)
									that.n = 1
									that.goods = []
									that.$refs.empty.emptyActive();
									that.finished = false
									that.request()
								}
							})
							that.showGoods = false
						} else if (res.cancel) {
							console.log('用户点击取消');
							that.showGoods = false
						}
					}
				});

			},
			cansel() {
				this.arrGoods = []
				this.$refs.empty.emptyActive();
				this.showGoods = false
			},

			request() {
				this.myRequest("/goods-shelves/get-goods-shelves?page=" + this.n + "", {
					filter_type_id: this.filter_type_id,
					page_size: this.page_size,
				}, "POST").then(res => {
					console.log(res)
					// this.goods = res.data.data.items
					res.data.data.items.forEach(item => {
						this.goods.push(item)
					})
					if (res.data.data.items.length <= 0) {
						this.finished = true
					}
					
					this.totalNum = res.data.data.pages.totalCount
					let pageCount = res.data.data.pages.pageCount
					if (this.n == pageCount) {
						this.finished = true
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	$ph: 95rpx;

	//    .act{
	// 	background-color: rgba(0,0,0,.5);
	// }
	.model {
		position: fixed;
		top: 300rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 80%;
		height: 500rpx;
		z-index: 999;
		background-color: #fff;

		.m_top {
			text-align: center;
			font-size: 30rpx;
			height: 100rpx;
			line-height: 100rpx;
			background-color: #eee;
		}

		.m_price {
			padding-left: 40rpx;

			text {
				font-size: 30rpx;
				display: inline-block;
				margin-top: 50rpx;
			}

			input {
				font-style: 50rpx;
				margin-top: 20rpx;
				width: 90%;
				height: 80rpx;
				padding-left: 20rpx;
				background-color: #E5E5E5;
			}
		}

		.m_btn {
			display: flex;
			justify-content: space-around;

			button {
				width: 35%;
				height: 100rpx;
				margin-top: 70rpx;
			}
		}
	}

	.bottom {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 330rpx;
		// border: 1px solid red;
		background-color: #EEEEEE;

		button {
			margin-top: 20rpx;
		}
	}

	.bottom button:nth-child(2) {
		color: red;
	}

	.my-goods-page {
		.placeholder-h {
			height: $ph;
			margin-bottom: 20rpx;
		}

		.header {
			position: fixed;
			display: flex;
			top: 0;
			width: 100%;
			height: $ph;
			padding: 0 30rpx;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;
			z-index: 9999;

			.h-l,
			.h-r {
				font-size: 32rpx;
				color: #666;
			}

			.h-r {
				display: flex;
				align-items: end;

				.icon {
					margin-right: 4rpx;
					margin-top: 2rpx;
				}
			}
		}

		.loading-text {
			line-height: 100rpx;
			margin-bottom: 20rpx;
			text-align: center;
		}
	}
</style>
