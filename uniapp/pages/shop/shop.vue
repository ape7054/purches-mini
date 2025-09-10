<template>
  <view class="container">
    <view class="header">
      <text class="shop-title">{{ shopName }}</text>
      <text class="product-count">共 {{ shopGoods.length }} 个产品</text>
    </view>
    
    <view class="goods-list">
      <view v-for="item in shopGoods" :key="item.id" class="goods-item">
        <view class="goods-info">
          <view class="goods-header">
            <text class="goods-id">{{ item.id }}.</text>
            <text class="goods-name">{{ item.name }}</text>
          </view>
          
          <view class="goods-price">
            <text class="price">¥{{ item.price }}</text>
            <text class="unit">/{{ item.unit }}</text>
          </view>
          
          <view class="goods-desc">
            <text>{{ item.description }}</text>
          </view>
        </view>
        
        <view class="goods-actions">
          <view class="counter">
            <button class="counter-btn minus" :disabled="item.count === 0" @click="decrease(item)">-</button>
            <text class="count">{{ item.count }}</text>
            <button class="counter-btn plus" @click="increase(item)">+</button>
          </view>
          
          <view v-if="item.count > 0" class="subtotal">
            小计: ¥{{ (item.price * item.count).toFixed(2) }}
          </view>
        </view>
      </view>
    </view>

    <!-- 底部操作栏 -->
    <view class="bottom-bar">
      <view class="total-info">
        <text class="total-text">总计: ¥{{ totalAmount.toFixed(2) }}</text>
        <text class="item-count">{{ cartTotal }}件商品</text>
      </view>
      
      <view class="action-buttons">
        <button class="cart-btn" @click="goCart">
          购物车 ({{ cartTotal }})
        </button>
        <button class="orders-btn" @click="goOrders">
          查看订单
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import goodsData from "/static/data.json"

export default {
  data() {
    return {
      shopName: '',
      shopGoods: [],
      cart: []
    }
  },
  computed: {
    cartTotal() {
      return this.cart.reduce((sum, g) => sum + g.count, 0)
    },
    totalAmount() {
      return this.cart.reduce((sum, g) => sum + (g.price * g.count), 0)
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
      
      // 从本地存储恢复购物车状态
      this.loadCartFromStorage()
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
    loadCartFromStorage() {
      const savedCart = uni.getStorageSync("cart") || []
      // 恢复当前商家的商品数量
      savedCart.forEach(cartItem => {
        if (cartItem.shopName === this.shopName) {
          const shopItem = this.shopGoods.find(item => item.id === cartItem.id)
          if (shopItem) {
            shopItem.count = cartItem.count
          }
        }
      })
      this.updateCart()
    },
    goCart() {
      uni.switchTab({ url: "/pages/cart/cart" })
    },
    goOrders() {
      uni.switchTab({ url: "/pages/orders/orders" })
    }
  }
}
</script>

<style>
.container {
  padding: 0 0 180rpx 0;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40rpx 30rpx;
  color: white;
}

.shop-title {
  font-size: 40rpx;
  font-weight: bold;
  display: block;
  margin-bottom: 10rpx;
}

.product-count {
  font-size: 28rpx;
  opacity: 0.9;
}

.goods-list {
  padding: 20rpx;
}

.goods-item {
  background: white;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.goods-info {
  margin-bottom: 20rpx;
}

.goods-header {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}

.goods-id {
  color: #999;
  font-size: 24rpx;
  margin-right: 10rpx;
  min-width: 40rpx;
}

.goods-name {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
  flex: 1;
}

.goods-price {
  display: flex;
  align-items: baseline;
  margin-bottom: 15rpx;
}

.price {
  font-size: 36rpx;
  font-weight: bold;
  color: #ff6b6b;
}

.unit {
  font-size: 24rpx;
  color: #999;
  margin-left: 5rpx;
}

.goods-desc {
  font-size: 26rpx;
  color: #666;
  line-height: 1.5;
}

.goods-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.counter {
  display: flex;
  align-items: center;
  background: #f8f8f8;
  border-radius: 30rpx;
  padding: 5rpx;
}

.counter-btn {
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;
  border: none;
  font-size: 28rpx;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.minus {
  background: #ff6b6b;
  color: white;
}

.minus:disabled {
  background: #ccc;
  color: #999;
  cursor: not-allowed;
}

.plus {
  background: #4ecdc4;
  color: white;
}

.count {
  min-width: 60rpx;
  text-align: center;
  font-size: 28rpx;
  font-weight: 500;
}

.subtotal {
  font-size: 24rpx;
  color: #ff6b6b;
  font-weight: 500;
}

.bottom-bar {
  position: fixed;
  bottom: 60px;
  left: 0;
  right: 0;
  background: white;
  padding: 20rpx 30rpx;
  border-top: 1px solid #eee;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.total-info {
  text-align: center;
  margin-bottom: 20rpx;
}

.total-text {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  display: block;
}

.item-count {
  font-size: 24rpx;
  color: #999;
}

.action-buttons {
  display: flex;
  gap: 20rpx;
}

.cart-btn,
.orders-btn {
  flex: 1;
  height: 80rpx;
  border-radius: 40rpx;
  border: none;
  font-size: 28rpx;
  font-weight: 500;
  cursor: pointer;
}

.cart-btn {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
}

.orders-btn {
  background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
  color: white;
}
</style>
