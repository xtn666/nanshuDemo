import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
const whiteList = ['/login'] //设置白名单

Vue.use(VueRouter)

export const routes = [{
    path: '/user',
    name: 'user',
    alias: '/',
    component: () =>
        import ('../views/User.vue'),
    children: [{
        path: '/user/indivi',
        name: '个人信息',
        component: () =>
            import ('../views/Individual.vue')
    }, {
        path: '/user/todo',
        name: '我的待办',
        component: () =>
            import ('../views/Todo.vue'),
    }, {
        path: '/user/statistics',
        name: '数据统计',
        component: () =>
            import ('../views/Statistics.vue')
    }, {
        path: '/user/setting',
        name: '设置',
        component: () =>
            import ('../views/Setting.vue')
    }, {
        path: '/user/about',
        name: '关于',
        component: () =>
            import ('../views/About.vue')
    }]
}, ]

const router = new VueRouter({
    mode: 'history',
    routes: routes

})

export default router