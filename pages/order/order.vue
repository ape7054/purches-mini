<template>
  <view class="order-container">
    <!-- 头部 -->
    <view class="header">
      <text class="title">产品目录</text>
      <text class="subtitle">1-82号产品浏览下单</text>
    </view>

    <!-- 商品列表 -->
    <view class="products-list">
      <view 
        class="product-item" 
        v-for="(product, index) in allProducts" 
        :key="product.id"
      >
        <view class="product-info">
          <text class="product-name">{{ product.name }}</text>
          <text class="product-supplier">{{ product.supplier }}</text>
          <text class="product-price">¥{{ product.price }}/{{ product.unit }}</text>
        </view>
        
        <view class="quantity-controls">
          <button 
            class="quantity-btn minus" 
            @click="decreaseQuantity(index)"
            :disabled="product.count <= 0"
          >-</button>
          <input 
            class="quantity-input" 
            type="number" 
            v-model="product.count"
            @input="updateQuantity(index, $event)"
            min="0"
          />
          <button 
            class="quantity-btn plus" 
            @click="increaseQuantity(index)"
          >+</button>
        </view>
      </view>
    </view>

    <!-- 底部提交按钮 -->
    <view class="submit-section">
      <button 
        class="submit-btn" 
        @click="submitOrder"
        :disabled="totalQuantity === 0"
      >
        提交订单 ({{ totalQuantity }} 件商品)
      </button>
    </view>
  </view>
</template>

<script>
import productsData from '@/static/products.json'

export default {
  data() {
    return {
      allProducts: [],
      totalQuantity: 0
    }
  },
  
  onLoad() {
    this.initProducts()
  },
  
  methods: {
    // 初始化商品数据
    initProducts() {
      this.allProducts = productsData.map(product => ({
        ...product,
        count: 0
      }))
      this.calculateTotal()
    },
    
    // 增加数量
    increaseQuantity(index) {
      this.allProducts[index].count++
      this.calculateTotal()
    },
    
    // 减少数量
    decreaseQuantity(index) {
      if (this.allProducts[index].count > 0) {
        this.allProducts[index].count--
        this.calculateTotal()
      }
    },
    
    // 更新数量
    updateQuantity(index, event) {
      const value = parseInt(event.detail.value) || 0
      this.allProducts[index].count = Math.max(0, value)
      this.calculateTotal()
    },
    
    // 计算总数量
    calculateTotal() {
      this.totalQuantity = this.allProducts.reduce((sum, product) => sum + product.count, 0)
    },
    
    // 提交订单
    submitOrder() {
      if (this.totalQuantity === 0) {
        uni.showToast({
          title: '请选择商品',
          icon: 'none'
        })
        return
      }
      
      // 筛选出数量大于0的商品
      const selectedProducts = this.allProducts.filter(product => product.count > 0)
      
      // 按商家分组
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
      
      // 保存到本地缓存
      uni.setStorageSync('orders', orders)
      
      uni.showToast({
        title: '订单提交成功',
        icon: 'success'
      })
      
      // 跳转到订单页面
      setTimeout(() => {
        uni.switchTab({
          url: '/pages/orders/orders'
        })
      }, 1500)
    }
  }
}
</script>

<style scoped>
.order-container {
  padding: 20rpx;
  padding-bottom: 120rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40rpx 30rpx;
  border-radius: 20rpx;
  margin-bottom: 30rpx;
  text-align: center;
  color: white;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  display: block;
  margin-bottom: 10rpx;
}

.subtitle {
  font-size: 28rpx;
  opacity: 0.9;
}

.products-list {
  background: white;
  border-radius: 20rpx;
  overflow: hidden;
  margin-bottom: 30rpx;
  width: 100%;
}

.product-item {
  display: flex;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
  width: 100%;
  box-sizing: border-box;
}

.product-item:last-child {
  border-bottom: none;
}

.product-info {
  flex: 1;
}

.product-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 8rpx;
}

.product-supplier {
  font-size: 24rpx;
  color: #666;
  display: block;
  margin-bottom: 5rpx;
}

.product-price {
  font-size: 28rpx;
  color: #e74c3c;
  font-weight: bold;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.quantity-btn {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  border: 2rpx solid #007aff;
  background: white;
  color: #007aff;
  font-size: 32rpx;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-btn:disabled {
  opacity: 0.3;
  border-color: #ccc;
  color: #ccc;
}

.quantity-input {
  width: 100rpx;
  height: 60rpx;
  border: 2rpx solid #ddd;
  border-radius: 10rpx;
  text-align: center;
  font-size: 28rpx;
  font-weight: bold;
}

.submit-section {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 30rpx;
  border-top: 1rpx solid #eee;
  z-index: 100;
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
}

.submit-btn:disabled {
  background: #ccc;
  color: #999;
}
</style>



