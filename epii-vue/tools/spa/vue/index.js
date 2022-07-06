

import { createApp } from 'vue'
import router from './router'
(async () => {
    let root = null;
    try {
        root = require("@project/hooks/App.vue").default
    } catch (e) {
        try {
            root = require("@project/src/pages/App.vue").default
        } catch (e) {
            root = require("./root.vue").default;
        }

    }

    const app = createApp(root)
    app.___app = app.config.globalProperties;
    try {
        const on_boot = require("@project/hooks/boot.js")
        if (typeof on_boot.default == "function")
            await on_boot.default(app);
    } catch (e) {
        console.log("error in  boot:",e)
    }
    try {

        const on_router = require("@project/hooks/router.js")
        if (on_router && on_router.root) {
            router.addRoute({ path: '/', redirect: on_router.root, name: '主页' });
        } else {
            router.addRoute({ path: '/', redirect: '/root.html', name: '主页' });
        }
        if (on_router.default) {
            if (typeof on_router.default == "function")
                await on_router.default(router);
            else router = on_router.default;
        }

    } catch (error) {
        router.addRoute({ path: '/', redirect: '/root.html', name: '主页' });
    }

    app.use(router);
    app.mount('#root')
    if (window.getAppHandler) {
        window.getAppHandler().stopLoading();
    }
})();