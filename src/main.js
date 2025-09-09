import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// 导入页面组件
import IndexPage from './pages/index/index.vue'
import ShopPage from './pages/shop/shop.vue'
import CartPage from './pages/cart/cart.vue'
import OrdersPage from './pages/orders/orders.vue'

// 配置路由
const routes = [
  { path: '/', component: IndexPage },
  { path: '/shop/:shopName', component: ShopPage, props: true },
  { path: '/cart', component: CartPage },
  { path: '/orders', component: OrdersPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 创建应用
const app = createApp(App)

// 注册uni-app标签映射
app.component('view', {
  template: '<div><slot /></div>'
})

app.component('text', {
  template: '<span><slot /></span>'
})

app.component('image', {
  props: ['src', 'class'],
  template: '<img :src="src" :class="$attrs.class" />'
})

app.use(router)
app.mount('#app') 