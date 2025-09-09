<template>
  <view class="container">
    <view class="title">{{ shopName }}</view>
    <view class="list">
      <view v-for="item in shopGoods" :key="item.id" class="goods-item">
        <text>{{ item.id }}. {{ item.name }}</text>
        
        <view class="counter">
          <button size="mini" @click="decrease(item)">-</button>
          <text>{{ item.count }}</text>
          <button size="mini" @click="increase(item)">+</button>
        </view>
      </view>
    </view>

    <!-- 购物车按钮 -->
    <view class="cart-btn" @click="goCart">
      去购物车 ({{ cartTotal }})
    </view>
    
    <!-- 订单按钮 -->
    <view class="orders-btn" @click="goOrders">
      查看订单
    </view>
  </view>
</template>

<script>
import goodsData from "@/static/data.json"

export default {
  data() {
    return {
      shopName: "",
      shopGoods: [],
      cart: []
    }
  },
  computed: {
    cartTotal() {
      return this.cart.reduce((sum, g) => sum + g.count, 0)
    }
  },
  onLoad(options) {
    console.log('接收到的参数:', options)
    this.shopName = options.shopName || options.shop
    console.log('商家名称:', this.shopName)
    console.log('可用商家:', Object.keys(goodsData))
    
    if (this.shopName && goodsData[this.shopName]) {
      this.shopGoods = goodsData[this.shopName].map(g => ({ ...g })) // 深拷贝
      console.log('商品列表:', this.shopGoods)
    } else {
      console.error('未找到商家:', this.shopName)
      uni.showToast({
        title: '商家不存在',
        icon: 'none'
      })
    }
  },
  methods: {
    increase(item) {
      item.count++
      this.updateCart()
    },
    decrease(item) {
      if (item.count > 0) {
        item.count--
        this.updateCart()
      }
    },
    updateCart() {
      this.cart = this.shopGoods.filter(g => g.count > 0).map(item => ({
        ...item,
        shopName: this.shopName
      }))
      // 持久化到本地缓存
      uni.setStorageSync("cart", this.cart)
    },
    goCart() {
      uni.navigateTo({ url: "/pages/cart/cart" })
    },
    goOrders() {
      // tabBar页面跳转
      uni.switchTab({ url: "/pages/orders/orders" })
    }
  }
}
</script>

<style>
.container { padding: 20rpx; }
.title { font-size: 36rpx; font-weight: bold; margin-bottom: 20rpx; }
.goods-item { display: flex; justify-content: space-between; align-items: center; padding: 15rpx 0; border-bottom: 1px solid #eee; font-size: 28rpx; }
.counter { display: flex; align-items: center; gap: 10rpx; }
.cart-btn { position: fixed; bottom: 40rpx; left: 30%; transform: translateX(-50%); background: #007aff; color: #fff; padding: 20rpx 30rpx; border-radius: 40rpx; }
.orders-btn { position: fixed; bottom: 40rpx; right: 30%; transform: translateX(50%); background: #28a745; color: #fff; padding: 20rpx 30rpx; border-radius: 40rpx; }
</style>
