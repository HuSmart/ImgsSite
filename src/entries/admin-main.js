// 管理员入口
import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '../route-component/admin/dashboard.vue'
import Categories from '../route-component/admin/admin-categories.vue'

Vue.use(VueRouter)

let album = { template: '<p>album</p>' }

const router = new VueRouter({
    routes: [
        {
            path: '/',
            components: {
                'nva': Dashboard
            }
        }, {
            path: '/album',
            components: {
                'nva': Dashboard,
                'content': album
            }
        },{
            path: '/category',
            components: {
                'nva': Dashboard,
                'content': Categories
            }
        }
    ]
})

new Vue({
    el: '#admin-main',
    router: router
})