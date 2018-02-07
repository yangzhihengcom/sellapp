// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import goods from '@/components/goods/goods.vue'
import ratings from '@/components/ratings/ratings.vue'
import seller from '@/components/seller/seller.vue'
import vueResource from 'vue-resource'
import './common/stylus/index.styl'

// import './common/stylus/index.styl'
// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
Vue.use(VueRouter)
Vue.use(vueResource)

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/', redirect: '/goods' },
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  linkActiveClass: 'active',
  routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// 现在，应用已经启动了！
