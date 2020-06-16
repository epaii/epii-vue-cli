import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@page/index/index.vue';
import router_arr from '@project/runtime/spa_router';
let routes = [{
    path: '/',
    component: index
}, ...router_arr
];



Vue.use(VueRouter);
const router = new VueRouter({
    routes: routes,
    scrollBehavior(to, from, savedPosition) {

        if (savedPosition)
            document.getElementsByTagName("body")[0].style.height = (document.body.clientWidth + savedPosition.y + 200) + "px";

        return new Promise((resolve, reject) => {
            if (savedPosition) {
                setTimeout(() => {
                    resolve(savedPosition)
                }, 10);

            } else {
                resolve({
                    x: 0,
                    y: 0
                })
            }
        })

    }
})

export default router