<template>
	<scroll-view :scroll-y="true" class="v-sidebar">
		<slot></slot>
	</scroll-view>
</template>

<script>
	export default {
		props: {
			value: {
				type: [Number, String],
				default: 0
			}
		},
		data() {
			return {
				index: +this.value
			}
		},
		watch: {
			value: {
				handler: function(a,b) {
					// console.log(a,b)
					this.setIndex(+this.value);
				},
				immediate: true
			}
		},
		methods: {
			setIndex: function(index) {
				// console.log(index, this.index)
				if (index !== this.index) {
					this.index = index;
					this.$emit('change', index);
				}
			}
		}
	}
</script>

<style lang="scss">
	.v-sidebar {
		width: 220rpx;
		height: inherit;
	}
</style>
