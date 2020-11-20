import Vue from "vue";
import configBase from '../config/config.base'
import configDev from '../config/config.development'
import configPro from '../config/config.production'
export default {
	install() {
 		Eapp.initialize({
			vue: Vue
		});
		Eapp.window.listener.beforIn = function(url,next){
			console.log(url)
			console.log("你可以在这里设置是否需要登录")
			next()
		}
		
		if (process.env.NODE_ENV === 'development') {
			Eapp.config = Object.assign(configBase, configDev);
		} else {
			Eapp.config = Object.assign(configBase, configPro);
		}

		if (Eapp.config&& Eapp.config.hasOwnProperty("api_url_base")) {
			Eapp.http.setApiBase(Eapp.config.api_url_base)
			Eapp.uploader.setUploadApi(Eapp.config.api_url_base + Eapp.config.upload_uri)
		}

		if (Eapp.localData.get("token")) {
			Eapp.http.setBaseData({
				token: Eapp.localData.get("token"),
			});
		}
		Vue.mixin({
			data: function () {
				return {
					api: {}
				}
			}
		});
		Vue.prototype.show = function() {
			let djs = setInterval(() => {
				if (this.$children.length > 0) {
					clearInterval(djs)
					if (this.$children[0] && this.$children[0]["show"] && (typeof this.$children[0]["show"] === "function")) {
						this.$children[0].show()
					}
				}
			}, 10);
		}
		Vue.prototype.loading = function() {
			if (this.$children[0] && this.$children[0]["loading"] && (typeof this.$children[0]["loading"] === "function")) {
				this.$children[0].loading()
			}
		}

	}
}
