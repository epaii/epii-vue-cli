import Vue from 'vue'
import App from './App'
import  epii from './epii/index.js'
Vue.config.productionTip = false
Vue.use(epii);
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
Vue.__app = app;
