<template>
  <div id="app">
    <router-view />
    
    <!-- 底部导航栏 -->
    <div class="tabbar">
      <div class="tabbar-item" :class="{ active: $route.path === '/' }" @click="goTo('/')">
        <div class="tabbar-icon">🏠</div>
        <div class="tabbar-text">首页</div>
      </div>
      <div class="tabbar-item" :class="{ active: $route.path === '/cart' }" @click="goTo('/cart')">
        <div class="tabbar-icon">🛒</div>
        <div class="tabbar-text">购物车</div>
      </div>
      <div class="tabbar-item" :class="{ active: $route.path === '/orders' }" @click="goTo('/orders')">
        <div class="tabbar-icon">📋</div>
        <div class="tabbar-text">订单</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    goTo(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f5f5f5;
  padding-bottom: 60px;
}

#app {
  min-height: 100vh;
}

.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: white;
  border-top: 1px solid #eee;
  display: flex;
  z-index: 1000;
}

.tabbar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 0.3s;
}

.tabbar-item.active {
  color: #667eea;
}

.tabbar-icon {
  font-size: 24px;
  margin-bottom: 4px;
}

.tabbar-text {
  font-size: 12px;
}
</style> 