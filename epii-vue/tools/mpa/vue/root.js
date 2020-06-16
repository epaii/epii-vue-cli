
import Vue from 'vue'
import root from "root_path"
(async ()=>{
    "inject_other"

    Vue.config.productionTip = false
    Vue.config.devtools = true
    Vue.___app = (new Vue({
        render: h => h(root)
    })).$mount("#root");
})()

