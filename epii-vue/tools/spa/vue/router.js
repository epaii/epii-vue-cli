 
import {createRouter,createWebHashHistory} from 'vue-router'
 
import routes from '@project/runtime/spa_router';
 

 
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
})

export default router