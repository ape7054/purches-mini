<template>
  <view class="detail-container">
    <!-- 头部 -->
    <view class="header">
      <text class="supplier-name">{{ order.supplier }}</text>
      <text class="order-status">{{ order.status }}</text>
    </view>
    
    <!-- 商品清单 -->
    <view class="products-section">
      <text class="section-title">商品清单</text>
      <view class="products-list">
        <view 
          class="product-item" 
          v-for="product in order.products" 
          :key="product.id"
        >
          <view class="product-info">
            <text class="product-name">{{ product.name }}</text>
            <text class="product-desc">{{ product.description }}</text>
            <text class="product-price">¥{{ product.price }}/{{ product.unit }}</text>
          </view>
          <view class="product-quantity">
            <text class="quantity">× {{ product.count }}</text>
            <text class="total-price">¥{{ product.totalPrice.toFixed(2) }}</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 订单信息 -->
    <view class="order-info">
      <view class="info-row">
        <text class="label">订单时间：</text>
        <text class="value">{{ formatTime(order.createTime) }}</text>
      </view>
      <view class="info-row">
        <text class="label">商品种类：</text>
        <text class="value">{{ order.products.length }} 种</text>
      </view>
      <view class="info-row total-row">
        <text class="label">订单总额：</text>
        <text class="value total-amount">¥{{ order.totalPrice.toFixed(2) }}</text>
      </view>
    </view>
    
    <!-- 操作按钮 -->
    <view class="actions">
      <button class="copy-btn" @click="copyOrder">
        📋 复制订单
      </button>
      <button class="send-btn" @click="sendOrder">
        💬 发送给商家
      </button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      order: {}
    }
  },
  
  onLoad(options) {
    this.loadOrderDetail(options.orderId)
  },
  
  methods: {
    // 加载订单详情
    loadOrderDetail(orderId) {
      const orders = uni.getStorageSync('orders') || []
      const order = orders.find(o => o.id == orderId)
      
      if (order) {
        this.order = order
      } else {
        uni.showToast({
          title: '订单不存在',
          icon: 'none'
        })
        setTimeout(() => {
          uni.navigateBack()
        }, 1500)
      }
    },
    
    // 格式化时间
    formatTime(timeString) {
      const date = new Date(timeString)
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    
    // 复制订单
    copyOrder() {
      const orderText = this.generateOrderText()
      
      uni.setClipboardData({
        data: orderText,
        success: () => {
          uni.showToast({
            title: '订单已复制到剪贴板',
            icon: 'success'
          })
        },
        fail: () => {
          uni.showToast({
            title: '复制失败',
            icon: 'none'
          })
        }
      })
    },
    
    // 发送订单
    sendOrder() {
      this.copyOrder()
      setTimeout(() => {
        uni.showModal({
          title: '发送提示',
          content: '订单内容已复制，请打开微信或钉钉粘贴发送给商家',
          showCancel: false,
          confirmText: '知道了'
        })
      }, 1000)
    },
    
    // 生成订单文本
    generateOrderText() {
      let text = `商家：${this.order.supplier}\n\n`
      
      this.order.products.forEach(product => {
        text += `${product.description}，${product.count} ${product.unit}\n\n`
      })
      
      text += `订单总额：¥${this.order.totalPrice.toFixed(2)}\n`
      text += `明天早上 8 点前送到，谢谢！`
      
      return text
    }
  }
}
</script>

<style scoped>
.detail-container {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 200rpx;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40rpx 30rpx;
  border-radius: 20rpx;
  margin-bottom: 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.supplier-name {
  font-size: 36rpx;
  font-weight: bold;
}

.order-status {
  font-size: 24rpx;
  background: rgba(255,255,255,0.2);
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
}

.products-section {
  background: white;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 30rpx;
  padding-bottom: 15rpx;
  border-bottom: 2rpx solid #f0f0f0;
}

.products-list {
  margin-bottom: 20rpx;
}

.product-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 25rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.product-item:last-child {
  border-bottom: none;
}

.product-info {
  flex: 1;
  margin-right: 20rpx;
}

.product-name {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 8rpx;
}

.product-desc {
  font-size: 24rpx;
  color: #666;
  display: block;
  margin-bottom: 8rpx;
  line-height: 1.4;
}

.product-price {
  font-size: 26rpx;
  color: #e74c3c;
  font-weight: bold;
}

.product-quantity {
  text-align: right;
  min-width: 120rpx;
}

.quantity {
  font-size: 28rpx;
  color: #333;
  font-weight: bold;
  display: block;
  margin-bottom: 5rpx;
}

.total-price {
  font-size: 26rpx;
  color: #e74c3c;
  font-weight: bold;
}

.order-info {
  background: white;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.info-row:last-child {
  border-bottom: none;
}

.total-row {
  border-top: 2rpx solid #e0e0e0;
  margin-top: 10rpx;
  padding-top: 20rpx;
}

.label {
  font-size: 28rpx;
  color: #666;
}

.value {
  font-size: 28rpx;
  color: #333;
  font-weight: bold;
}

.total-amount {
  font-size: 32rpx;
  color: #e74c3c;
}

.actions {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 30rpx;
  border-top: 1rpx solid #eee;
  display: flex;
  gap: 20rpx;
}

.copy-btn, .send-btn {
  flex: 1;
  height: 80rpx;
  border: none;
  border-radius: 40rpx;
  font-size: 28rpx;
  font-weight: bold;
}

.copy-btn {
  background: #17a2b8;
  color: white;
}

.send-btn {
  background: #25d366;
  color: white;
}
</style>



