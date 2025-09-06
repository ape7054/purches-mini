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
      <!-- 商品列表 -->
      <view class="cart-list">
        <view v-for="(item, index) in cartItems" :key="index" class="cart-item">
          <view class="item-info">
            <text class="item-name">{{ item.name }}</text>
            <text class="item-shop">{{ item.shopName }}</text>
          </view>
          
          <view class="item-controls">
            <view class="quantity-control">
              <button 
                class="quantity-btn" 
                :class="{ disabled: item.count <= 0 }"
                @click="decreaseQuantity(item, index)"
              >
                -
              </button>
              <text class="quantity">{{ item.count }}</text>
              <button class="quantity-btn" @click="increaseQuantity(item, index)">+</button>
            </view>
            
            <button class="delete-btn" @click="removeItem(index)">删除</button>
          </view>
        </view>
      </view>

      <!-- 底部操作栏 -->
      <view class="bottom-bar">
        <view class="total-info">
          <text class="total-text">共 {{ totalItems }} 件商品</text>
        </view>
        
        <view class="action-buttons">
          <button class="clear-btn" @click="clearCart">清空购物车</button>
          <button class="checkout-btn" @click="checkout">确认订单</button>
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
        content: `共 ${this.totalItems} 件商品，确认提交订单吗？`,
        success: (res) => {
          if (res.confirm) {
            // 这里可以添加提交订单的逻辑
            uni.showToast({
              title: '订单提交成功',
              icon: 'success'
            })
            // 清空购物车
            this.cartItems = []
            this.updateCart()
          }
        }
      })
    },
    
    goShopping() {
      uni.switchTab({
        url: '/pages/index/index'
      })
    }
  }
}
</script>

<style>
.container {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 120rpx;
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
}

.cart-list {
  background: #fff;
  border-radius: 20rpx;
  overflow: hidden;
  margin-bottom: 20rpx;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx 20rpx;
  border-bottom: 1px solid #f0f0f0;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-info {
  flex: 1;
}

.item-name {
  font-size: 30rpx;
  color: #333;
  font-weight: 500;
  display: block;
  margin-bottom: 8rpx;
}

.item-shop {
  font-size: 24rpx;
  color: #999;
}

.item-controls {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 15rpx;
}

.quantity-btn {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  background: #f0f0f0;
  color: #333;
  border: none;
  font-size: 28rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-btn.disabled {
  background: #f5f5f5;
  color: #ccc;
}

.quantity {
  font-size: 28rpx;
  color: #333;
  min-width: 40rpx;
  text-align: center;
}

.delete-btn {
  background: #ff6b6b;
  color: #fff;
  border: none;
  padding: 10rpx 20rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 20rpx;
  border-top: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.total-info {
  flex: 1;
}

.total-text {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.action-buttons {
  display: flex;
  gap: 20rpx;
}

.clear-btn {
  background: #f0f0f0;
  color: #666;
  border: none;
  padding: 20rpx 30rpx;
  border-radius: 40rpx;
  font-size: 26rpx;
}

.checkout-btn {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: #fff;
  border: none;
  padding: 20rpx 40rpx;
  border-radius: 40rpx;
  font-size: 28rpx;
  font-weight: 500;
}
</style>





