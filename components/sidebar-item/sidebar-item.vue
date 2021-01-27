<template>
	<view class="v-sidebar-item" :class="{'v-sidebar-item--select': select}" @click="onClick">
		<text class="v-sidebar-item__text" v-if="!$slots.title">{{title}}</text>
		<view class="v-badge" v-if="badge">{{badge}}</view>

		<slot name="title"></slot>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				defaule: ''
			},
			badge: {
				type: [Number, String],
				defaule: undefined
			}
		},
		data() {
			return {
				idx: this.$parent.$children.indexOf(this)
			}
		},
		computed: {
			select: function() {
				return this.idx === +this.$parent.value;
			}
		},
		methods: {
			onClick: function() {
				// this.$emit('click', this.idx);
				this.$parent.$emit('input', this.idx);
				this.$parent.setIndex(this.idx);
			}
		}
	}
</script>

<style lang="scss">
	.v-sidebar-item {
		position: relative;
		display: flex;
		height: 100rpx;
		align-items: center;
		justify-content: center;
	}


	.v-sidebar-item--select {
		font-weight: 500;
		background-color: #fff;
		/* border-top-left-radius: 35rpx 35rpx;
		border-bottom-left-radius: 35rpx 35rpx; */
		color: $uni-color-success;

		.v-sidebar-item__text {
			display: block;
			transform: scale(1.22);
		}
	}

	.v-sidebar-item--select::before {
		position: absolute;
		top: 50%;
		left: 0;
		width: 8rpx;
		height: 100%;
		background-color: $uni-color-success;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
		content: '';
	}

	.v-sidebar-item__text {
		font-size: 28rpx;
	}

	.v-badge {
		position: absolute;
		top: 0;
		right: 0;
		box-sizing: border-box;
		min-width: 16px;
		padding: 0 3px;
		color: #fff;
		font-weight: 500;
		font-size: 12px;
		font-family: -apple-system-font, Helvetica Neue, Arial, sans-serif;
		line-height: 1.2;
		text-align: center;
		background-color: $uni-color-success;
		border: 1px solid #fff;
		border-radius: 16px;
		transform: translateY(50%);
		transform-origin: 100%;
	}
</style>
