<script>
	export default {
		onLaunch: function() {
			// #ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary');
			//plus.screen.lockOrientation('landscape');
			if (Eapp.config.hasOwnProperty("app_update_api") && Eapp.config.app_update_api.length > 0) {
				plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
					Eapp.http.post(Eapp.config.app_update_api, {
						version: widgetInfo.version,
						name: widgetInfo.name,
						version_code: widgetInfo.versionCode
					}, (result) => {

						var data = result;
						if (data.update && data.wgtUrl) {
							uni.downloadFile({
								url: data.wgtUrl,
								success: (downloadResult) => {
									if (downloadResult.statusCode === 200) {
										plus.runtime.install(downloadResult.tempFilePath, {
											force: false
										}, function() {

											plus.runtime.restart();
										}, function(e) {

										});
									}
								}
							});
						} else if (data.update && data.pkgUrl) {
							// 提醒用户更新
							uni.showModal({
								title: '更新提示',
								content: data.msg ? data.msg : '是否选择更新',
								success: (showResult) => {
									if (showResult.confirm) {
										plus.runtime.openURL(data.pkgUrl);
									}
								}
							})
						}
					});
				});
			}

			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	.group-margin-top {
		margin-top: 15upx !important;
	}

	.page-margin {
		margin: auto 20upx;
	}


	.page_epii {
		width: 100%;
		margin-left: 0;
		min-height: calc(100vh - 44px);
		background-color: #EFEFF4;
		overflow: hidden;
	}
</style>
