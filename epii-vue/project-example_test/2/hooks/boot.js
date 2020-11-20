import Vue from "vue";
import epiiLoading from '../epii/components/epii-loading/loading.vue'

export default async () => {
    Eapp.initialize({
        vue: Vue
    });
    Vue.component('epii-loading', epiiLoading)

    Eapp.config = APP_CONFIG;

    if (Eapp.config && Eapp.config.hasOwnProperty("api_url_base")) {
        Eapp.http.setApiBase(Eapp.config.api_url_base)
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
    Vue.prototype.show = function () {
        let djs = setInterval(() => {
            if (this.$children.length > 0) {
                clearInterval(djs)
                if (this.$children[0] && this.$children[0]["show"] && (typeof this.$children[0]["show"] === "function")) {
                    this.$children[0].show()
                }
            }
        }, 10);
    }
    Vue.prototype.loading = function () {
        if (this.$children[0] && this.$children[0]["loading"] && (typeof this.$children[0]["loading"] === "function")) {
            this.$children[0].loading()
        }
    }
}