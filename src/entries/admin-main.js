// 管理员入口
import Vue from 'vue'
import VueRouter from 'vue-router'

import 'bootstrap'
import 'sweetalert'

import Dashboard from '../route-component/admin/dashboard.vue'
import Categories from '../route-component/admin/admin-categories.vue'
import Category from '../route-component/admin/admin-category.vue'
import Albums from '../route-component/admin/admin-albums.vue'
import Album from '../route-component/admin/admin-album.vue'

Vue.use(VueRouter)

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
                'content': Albums
            }
        },{
            path: '/album/:albumKey',
            components: {
                'nva': Dashboard,
                'content': Album
            }
        }, {
            path: '/category',
            components: {
                'nva': Dashboard,
                'content': Categories
            }
        }, {
            path: '/category/:name',
            components: {
                'nva': Dashboard,
                'content': Category
            }
        }
    ]
})

new Vue({
    el: '#admin-main',
    router: router
})