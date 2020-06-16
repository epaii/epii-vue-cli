
import Vue from 'vue'
import root from './root.vue'
import router from './router'


(async () => {

    try {
        const on_boot = require("@project/hooks/boot.js")
        if (typeof on_boot.default == "function")
            await on_boot.default();
    } catch (e) {

    }


    Vue.config.productionTip = false
    Vue.config.devtools = true
    Vue.___app = (new Vue({
        router,
        render: h => h(root)
    })).$mount("#root");
})();