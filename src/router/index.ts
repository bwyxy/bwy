import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

const routes = [{
    path : '/',
    name : 'home',
    component : () => import('../pages/index.vue'),
    meta : {title : '百物语 - 飞鸽'}
},{
    path : '/baiwuyu',
    name : 'baiwuyu',
    component : () => import('../pages/froum.vue'),
    meta : { title : '百物语'}
},{
    path : '/login',
    name : 'login',
    component : () => import('../pages/login.vue'),
    meta : { title : '登录'}
}]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router