<template>
  <view class="container">
    <!-- 购物车为空时显示 -->
    <view v-if="cartItems.length === 0" class="empty-cart">
      <image class="empty-icon" src="/static/logo.png"></image>
      <text class="empty-text">购物车为空</text>
      <text class="empty-desc">快去选择心仪的商品吧</text>
      <button class="go-shopping-btn" @click="goShopping">去购物</button>
    </view>

    <!-- 购物车有商品时显示 -->
    <view v-else>
      <!-- 头部信息 -->
      <view class="header">
        <text class="header-title">购物车</text>
        <text class="header-count">{{ cartItems.length }}种商品</text>
      </view>

      <!-- 商品列表 -->
      <view class="cart-list">
        <view v-for="(item, index) in cartItems" :key="index" class="cart-item">
          <view class="item-main">
            <view class="item-header">
              <text class="item-id">{{ item.id }}.</text>
              <text class="item-name">{{ item.name }}</text>
            </view>
            
            <view class="item-details">
              <view class="price-info">
                <text class="price">¥{{ item.price }}</text>
                <text class="unit">/{{ item.unit }}</text>
              </view>
              <text class="shop-name">{{ item.shopName }}</text>
            </view>
            
            <view class="item-desc">
              <text>{{ item.description }}</text>
            </view>
          </view>
          
          <view class="item-controls">
            <view class="quantity-control">
              <button 
                class="quantity-btn minus" 
                :class="{ disabled: item.count <= 0 }"
                @click="decreaseQuantity(item, index)"
              >
                -
              </button>
              <text class="quantity">{{ item.count }}</text>
              <button class="quantity-btn plus" @click="increaseQuantity(item, index)">+</button>
            </view>
            
            <view class="item-total">
              <text class="subtotal">小计: ¥{{ (item.price * item.count).toFixed(2) }}</text>
            </view>
            
            <button class="delete-btn" @click="removeItem(index)">删除</button>
          </view>
        </view>
      </view>

      <!-- 底部操作栏 -->
      <view class="bottom-bar">
        <view class="total-section">
          <view class="total-info">
            <text class="total-items">共 {{ totalItems }} 件商品</text>
            <text class="total-amount">总计: ¥{{ totalAmount.toFixed(2) }}</text>
          </view>
        </view>
        
        <view class="action-buttons">
          <button class="clear-btn" @click="clearCart">清空购物车</button>
          <button class="checkout-btn" @click="checkout">确认订单 (¥{{ totalAmount.toFixed(2) }})</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      cartItems: []
    }
  },
  computed: {
    totalItems() {
      return this.cartItems.reduce((sum, item) => sum + item.count, 0)
    },
    totalAmount() {
      return this.cartItems.reduce((sum, item) => sum + (item.price * item.count), 0)
    }
  },
  onLoad() {
    this.loadCartItems()
  },
  onShow() {
    this.loadCartItems()
  },
  methods: {
    loadCartItems() {
      this.cartItems = uni.getStorageSync('cart') || []
    },
    
    increaseQuantity(item, index) {
      item.count++
      this.updateCart()
    },
    
    decreaseQuantity(item, index) {
      if (item.count > 1) {
        item.count--
        this.updateCart()
      } else {
        this.removeItem(index)
      }
    },
    
    removeItem(index) {
      uni.showModal({
        title: '确认删除',
        content: '确定要删除这个商品吗？',
        success: (res) => {
          if (res.confirm) {
            this.cartItems.splice(index, 1)
            this.updateCart()
          }
        }
      })
    },
    
    clearCart() {
      uni.showModal({
        title: '确认清空',
        content: '确定要清空购物车吗？',
        success: (res) => {
          if (res.confirm) {
            this.cartItems = []
            this.updateCart()
            uni.showToast({
              title: '购物车已清空',
              icon: 'success'
            })
          }
        }
      })
    },
    
    updateCart() {
      uni.setStorageSync('cart', this.cartItems)
    },
    
    checkout() {
      if (this.cartItems.length === 0) {
        uni.showToast({
          title: '购物车为空',
          icon: 'none'
        })
        return
      }
      
      uni.showModal({
        title: '确认订单',
        content: `共 ${this.totalItems} 件商品，总金额 ¥${this.totalAmount.toFixed(2)}，确认提交订单吗？`,
        success: (res) => {
          if (res.confirm) {
            // 保存订单到本地存储
            this.saveOrder()
            
            uni.showToast({
              title: '订单提交成功',
              icon: 'success'
            })
            
            // 清空购物车
            this.cartItems = []
            this.updateCart()
            
            // 跳转到订单页面
            setTimeout(() => {
              uni.switchTab({ url: '/pages/orders/orders' })
            }, 1000)
          }
        }
      })
    },
    
    saveOrder() {
      const orders = uni.getStorageSync('orders') || []
      const orderNo = 'PO' + Date.now()
      
      const newOrder = {
        id: Date.now(),
        orderNo: orderNo,
        status: '待处理',
        items: [...this.cartItems],
        totalAmount: this.totalAmount,
        totalItems: this.totalItems,
        createTime: this.formatTime(new Date())
      }
      
      orders.unshift(newOrder) // 新订单添加到开头
      uni.setStorageSync('orders', orders)
    },
    
    formatTime(date) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')
      
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    },
    
    goShopping() {
      uni.switchTab({ url: '/pages/index/index' })
    }
  }
}
</script>

<style>
.container {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 200rpx;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40rpx 30rpx;
  color: white;
}

.header-title {
  font-size: 40rpx;
  font-weight: bold;
  display: block;
  margin-bottom: 10rpx;
}

.header-count {
  font-size: 28rpx;
  opacity: 0.9;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100rpx 40rpx;
  text-align: center;
}

.empty-icon {
  width: 120rpx;
  height: 120rpx;
  margin-bottom: 30rpx;
  opacity: 0.6;
}

.empty-text {
  font-size: 32rpx;
  color: #666;
  margin-bottom: 10rpx;
}

.empty-desc {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 40rpx;
}

.go-shopping-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  padding: 20rpx 40rpx;
  border-radius: 40rpx;
  font-size: 28rpx;
  cursor: pointer;
}

.cart-list {
  padding: 20rpx;
}

.cart-item {
  background: white;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.item-main {
  margin-bottom: 20rpx;
}

.item-header {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}

.item-id {
  color: #999;
  font-size: 24rpx;
  margin-right: 10rpx;
  min-width: 40rpx;
}

.item-name {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
  flex: 1;
}

.item-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15rpx;
}

.price-info {
  display: flex;
  align-items: baseline;
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

.shop-name {
  font-size: 24rpx;
  color: #666;
  background: #f0f0f0;
  padding: 5rpx 15rpx;
  border-radius: 15rpx;
}

.item-desc {
  font-size: 26rpx;
  color: #666;
  line-height: 1.5;
}

.item-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15rpx;
}

.quantity-control {
  display: flex;
  align-items: center;
  background: #f8f8f8;
  border-radius: 30rpx;
  padding: 5rpx;
}

.quantity-btn {
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

.minus.disabled {
  background: #ccc;
  color: #999;
  cursor: not-allowed;
}

.plus {
  background: #4ecdc4;
  color: white;
}

.quantity {
  min-width: 60rpx;
  text-align: center;
  font-size: 28rpx;
  font-weight: 500;
}

.item-total {
  flex: 1;
  text-align: center;
}

.subtotal {
  font-size: 26rpx;
  color: #ff6b6b;
  font-weight: 500;
}

.delete-btn {
  background: #ff4757;
  color: #fff;
  border: none;
  padding: 15rpx 25rpx;
  border-radius: 25rpx;
  font-size: 24rpx;
  cursor: pointer;
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

.total-section {
  margin-bottom: 20rpx;
}

.total-info {
  text-align: center;
}

.total-items {
  font-size: 26rpx;
  color: #666;
  display: block;
  margin-bottom: 5rpx;
}

.total-amount {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.action-buttons {
  display: flex;
  gap: 20rpx;
}

.clear-btn {
  flex: 1;
  background: #f0f0f0;
  color: #666;
  border: none;
  padding: 25rpx;
  border-radius: 40rpx;
  font-size: 26rpx;
  cursor: pointer;
}

.checkout-btn {
  flex: 2;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: #fff;
  border: none;
  padding: 25rpx;
  border-radius: 40rpx;
  font-size: 28rpx;
  font-weight: 500;
  cursor: pointer;
}
</style>





