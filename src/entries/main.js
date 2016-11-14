import Vue from 'vue'
import VueRouter from 'vue-router'

import App from '../component/App.vue'
import LandingRoute from '../route-component/Lading.vue'
import Categories from '../route-component/Categories.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/' , 
            component: LandingRoute
        },
        {
            path: '/category/:category',
            component: Categories
        }
    ]
})

new Vue({
  el: '#app',
  router: router,
  render: h => h('router-view')
})