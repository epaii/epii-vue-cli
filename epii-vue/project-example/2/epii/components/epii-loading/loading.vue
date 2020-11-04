<template>
	<div>
		<div class="page-loading" v-show="is_showloading">
			加载中
		</div>
		<div v-show="!show_loading">
			<slot></slot>
		</div>
	</div>
</template>
<script>
	export default {
		name: "epii-loading",
		props: {
			timeout: {
				type: Number,
				default: 5000
			}
		},
		data() {
			return {
				show_loading: true,
				is_showloading: false
			};
		},
		mounted() {
			setTimeout(() => {
				if (this.show_loading) {
					this.show_loading = true;
					this.is_showloading = true;
				}
			}, 500);

			setTimeout(() => {
				this.show();
			}, this.timeout);
		},
		methods: {
			show() {
				this.show_loading = false;
				this.is_showloading = false;
			},
			loading() {
				this.show_loading = true;
				this.is_showloading = false;
				setTimeout(() => {
					if (this.show_loading) {
						this.show_loading = true;
						this.is_showloading = true;
					}
				}, 800);
			}
		}
	};
</script>
<style scoped>
	.page-loading {
		background-color: #ffffff;
		height: 100vh;
		display: "table-cell";
		justify-content: center;
		align-items: center;
		line-height: 100vh;
		/** 垂直居中 **/
		text-align: center;
		vertical-align: middle;
		font-size: 20px;
	}

	.page-loading img {
		height: 8vh;
		width: 8vh;
	}
</style>
