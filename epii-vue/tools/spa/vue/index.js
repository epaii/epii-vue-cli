
import Vue from 'vue'
import router from './router'
(async () => {

    try {
        const on_boot = require("@project/hooks/boot.js")
        if (typeof on_boot.default == "function")
            await on_boot.default();
    } catch (e) {

    }
    try {
        const on_router = require("@project/hooks/router.js")
        if (typeof on_router.default == "function")
             await on_router.default(router);
        else router = on_router.default;
    } catch (error) {
        
    }
    let root = null;
    try {
        root = require("@project/hooks/App.vue").default

    } catch (e) {
        root = require("./root.vue").default;
    }
    Vue.config.productionTip = false
    Vue.config.devtools = true
    Vue.___app = (new Vue({
        router,
        render: h => h(root)
    })).$mount("#root");
})();