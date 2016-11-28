// 用户主页入口
import Vue from 'vue'
import VueRouter from 'vue-router'

import LandingRoute from '../route-component/Lading.vue'
import Categories from '../route-component/Categories.vue'
import Album from '../route-component/Album.vue'
import Search from '../route-component/Search.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/' , 
            component: LandingRoute
        },
        {
            path: '/category/:name',
            component: Categories
        },{
            path: '/album/:key',
            component: Album
        },{
            path: '/search/:query',
            component: Search
        }
    ]
})

new Vue({
  el: '#app',
  router: router,
  render: h => h('router-view')
})