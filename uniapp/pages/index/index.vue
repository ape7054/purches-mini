<template>
  <view class="container">
    <!-- 头部 -->
    <view class="header">
      <image class="logo" src="/static/logo.png"></image>
      <text class="title">产品目录</text>
      <text class="subtitle">1-82号产品浏览下单</text>
    </view>
    
    <!-- 商品列表 -->
    <view class="products-list">
      <view v-for="product in allProducts" :key="product.id" class="product-item">
        <view class="product-info">
          <view class="product-header">
            <text class="product-id">{{ product.id }}.</text>
            <text class="product-name">{{ product.name }}</text>
          </view>
          
          <view class="product-details">
            <view class="price-info">
              <text class="price">¥{{ product.price }}</text>
              <text class="unit">/{{ product.unit }}</text>
            </view>
            <text class="supplier">{{ product.supplier }}</text>
          </view>
          
          <view class="product-desc">
            <text>{{ product.description }}</text>
          </view>
        </view>
        
        <view class="product-controls">
          <view class="quantity-control">
            <button 
              class="quantity-btn minus" 
              :class="{ disabled: product.count === 0 }"
              @click="decreaseQuantity(product)"
            >
              -
            </button>
            <text class="quantity">{{ product.count }}</text>
            <button class="quantity-btn plus" @click="increaseQuantity(product)">+</button>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部提交区域 -->
    <view class="submit-section">
      <view class="total-info">
        <text>已选商品：<text class="total-count">{{ totalCount }}</text> 件</text>
        <text>总金额：¥<text class="total-count">{{ totalPrice.toFixed(2) }}</text></text>
      </view>
      <button 
        class="submit-btn" 
        :class="{ disabled: totalCount === 0 }"
        @click="submitOrder"
        :disabled="totalCount === 0"
      >
        提交订单
      </button>
    </view>
  </view>
</template>

<script>
import allProducts from "/static/data.json"

export default {
  data() {
    return {
      allProducts: []
    }
  },
  computed: {
    totalCount() {
      return this.allProducts.reduce((sum, product) => sum + product.count, 0)
    },
    totalPrice() {
      return this.allProducts.reduce((sum, product) => sum + (product.price * product.count), 0)
    }
  },
  onLoad() {
    this.loadProducts()
  },
  onShow() {
    this.loadProducts()
  },
  methods: {
    loadProducts() {
      // 为每个商品添加count属性
      this.allProducts = allProducts.map(product => ({
        ...product,
        count: 0
      }))
    },
    
    increaseQuantity(product) {
      product.count++
    },
    
    decreaseQuantity(product) {
      if (product.count > 0) {
        product.count--
      }
    },
    
    submitOrder() {
      const selectedProducts = this.allProducts.filter(product => product.count > 0)
      
      if (selectedProducts.length === 0) {
        uni.showToast({
          title: '请选择商品',
          icon: 'none'
        })
        return
      }
      
      // 按供应商分组
      const ordersBySupplier = {}
      selectedProducts.forEach(product => {
        const supplier = product.supplier
        if (!ordersBySupplier[supplier]) {
          ordersBySupplier[supplier] = []
        }
        ordersBySupplier[supplier].push({
          ...product,
          totalPrice: product.price * product.count
        })
      })
      
      // 生成订单数据
      const orders = Object.keys(ordersBySupplier).map(supplier => ({
        id: Date.now() + Math.random(),
        supplier: supplier,
        products: ordersBySupplier[supplier],
        totalPrice: ordersBySupplier[supplier].reduce((sum, product) => sum + product.totalPrice, 0),
        createTime: new Date().toISOString(),
        status: '待处理'
      }))
      
      // 保存到本地存储
      uni.setStorageSync('orders', orders)
      
      uni.showToast({
        title: '订单提交成功！',
        icon: 'success'
      })
      
      // 重置商品数量
      this.allProducts.forEach(product => product.count = 0)
      
      // 跳转到订单页面
      setTimeout(() => {
        uni.switchTab({ url: '/pages/orders/orders' })
      }, 1000)
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
  margin-bottom: 30rpx;
  text-align: center;
  color: white;
}

.logo {
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 15rpx;
}

.title {
  font-size: 40rpx;
  font-weight: bold;
  display: block;
  margin-bottom: 10rpx;
}

.subtitle {
  font-size: 28rpx;
  opacity: 0.9;
}

.products-list {
  padding: 20rpx;
}

.product-item {
  background: white;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.product-info {
  margin-bottom: 20rpx;
}

.product-header {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}

.product-id {
  color: #999;
  font-size: 24rpx;
  margin-right: 10rpx;
  min-width: 40rpx;
}

.product-name {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
  flex: 1;
}

.product-details {
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

.supplier {
  font-size: 24rpx;
  color: #666;
  background: #f0f0f0;
  padding: 5rpx 15rpx;
  border-radius: 15rpx;
}

.product-desc {
  font-size: 26rpx;
  color: #666;
  line-height: 1.5;
}

.product-controls {
  display: flex;
  justify-content: flex-end;
  align-items: center;
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

.submit-section {
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15rpx;
  font-size: 28rpx;
  color: #666;
}

.total-count {
  font-weight: bold;
  color: #007aff;
}

.submit-btn {
  width: 100%;
  height: 80rpx;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  border: none;
  border-radius: 40rpx;
  font-size: 32rpx;
  font-weight: bold;
  cursor: pointer;
}

.submit-btn.disabled {
  background: #ccc;
  color: #999;
  cursor: not-allowed;
}
</style>
