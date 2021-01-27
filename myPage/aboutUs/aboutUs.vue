<template>
	<view class="about-us-page">
		<view class="chunk-top"></view>

		<view class="content">
			<view class="info">
				<image src="../../static/images/banner1.jpg" mode="" class="gs-img"></image>
				<text class="desc">巨磊科技主要从事农业科技软硬件研发制造、物联网，大数据、云计算、信息咨询等服务；团队依托丰富的农业产业经验，专注于服务中大型涉农企业、生鲜电商企业等，通过互联网信息技术，有效帮助企业解决数字化运营管理、数据精准分析、供应链管理等核心问题。
				</text>
			</view>
			<view class="contact">
				<view>
					<uni-list>
						<uni-list-item rightText="195-1217-4568" clickable :showArrow="false" @click="callHandle">
							<view class="hd" slot="header">
								<uni-icons type="phone" size="19" class="icon"></uni-icons>
								<text>咨询热线</text>
							</view>
						</uni-list-item>
						<uni-list-item rightText="office@juleikeji.com" :showArrow="false">
							<view class="hd" slot="header">
								<uni-icons type="email" size="19" class="icon"></uni-icons>
								<text>公司邮箱</text>
							</view>
						</uni-list-item>
						<uni-list-item rightText="上海市虹口区临潼路170号401室" :showArrow="false">
							<view class="hd" slot="header">
								<uni-icons type="map-pin-ellipse" size="19" class="icon"></uni-icons>
								<text>公司地址</text>
							</view>
						</uni-list-item>
					</uni-list>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			callHandle: function() {
				uni.makePhoneCall({
				    phoneNumber: '195-1217-4568' //仅为示例
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.about-us-page {
		.info {
			padding: 24rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: #fff;
			margin-bottom: 20rpx;
			.desc {
				margin-top: 20rpx;
			}
			.gs-img {
				height: 350rpx;
				border-radius: $borderRadius12;
			}
		}
		
		.hd {
			display: flex;
			align-items: end;
		}
		.icon {
			margin-right: 6rpx;
		}
	}
</style>
