<template>
  <view class="container">
    <view class="supplier-header">
      <text class="supplier-name">{{ currentSupplier }}</text>
      <view class="supplier-summary">
        <view class="summary-item">
          <text class="summary-label">商品种类</text>
          <text class="summary-value">{{ totalProducts }} 种</text>
        </view>
        <view class="summary-item">
          <text class="summary-label">订单金额</text>
          <text class="summary-value">¥{{ totalPrice.toFixed(2) }}</text>
        </view>
        <view class="summary-item">
          <text class="summary-label">订单数量</text>
          <text class="summary-value">{{ orderCount }} 个</text>
        </view>
      </view>
    </view>
    
    <view v-if="supplierOrders.length === 0" class="empty-orders">
      <text class="empty-text">未找到该供应商的订单</text>
      <text class="empty-desc">可能订单已被清空或供应商名称有误</text>
    </view>
    
    <view v-else class="orders-detail">
      <view v-for="(order, index) in supplierOrders" :key="order.id" class="order-detail">
        <view class="order-header">
          <text class="order-number">订单号：ORD{{ order.id.toString().slice(-6) }}</text>
          <text class="order-status">{{ order.status }}</text>
        </view>
        
        <view class="products-list">
          <view v-for="item in order.products" :key="item.id" class="product-detail">
            <view class="product-info">
              <text class="product-name">{{ item.name }} × {{ item.count }} {{ item.unit }}</text>
              <text class="product-price">¥{{ item.totalPrice.toFixed(2) }}</text>
            </view>
          </view>
        </view>
        
        <view class="order-footer">
          <view class="total-section">
            <view class="total-original">
              <text>原始总价：¥{{ order.totalPrice.toFixed(2) }}</text>
            </view>
            <view class="total-final">
              <text>最终结算：¥</text>
              <input 
                class="final-price-input" 
                type="number" 
                :value="order.totalPrice.toFixed(2)"
                @input="updateFinalPrice(index, $event)"
              />
            </view>
          </view>
          
          <view class="custom-content-section">
            <text class="custom-content-label">📝 补充说明：</text>
            <textarea 
              class="custom-content-input" 
              placeholder="请输入额外的备注或具体要求..."
              v-model="order.customContent"
            ></textarea>
          </view>
          
          <view class="order-actions">
            <button class="copy-btn-full" @click="copyOrderContent(order, index)">
              📋 复制订单
            </button>
          </view>
          
          <view class="order-time">{{ formatTime(order.createTime) }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentSupplier: '',
      supplierOrders: [],
      totalProducts: 0,
      totalPrice: 0,
      orderCount: 0
    }
  },
  onLoad(options) {
    this.currentSupplier = decodeURIComponent(options.supplier || '')
    if (!this.currentSupplier) {
      uni.showToast({
        title: '供应商信息错误',
        icon: 'none'
      })
      return
    }
    this.loadSupplierDetails()
  },
  methods: {
    loadSupplierDetails() {
      const orders = uni.getStorageSync('orders') || []
      this.supplierOrders = orders.filter(order => order.supplier === this.currentSupplier)
      
      if (this.supplierOrders.length === 0) {
        return
      }
      
      // 计算统计信息
      this.totalProducts = this.supplierOrders.reduce((sum, order) => sum + order.products.length, 0)
      this.totalPrice = this.supplierOrders.reduce((sum, order) => sum + order.totalPrice, 0)
      this.orderCount = this.supplierOrders.length
      
      // 为每个订单添加自定义内容字段
      this.supplierOrders = this.supplierOrders.map(order => ({
        ...order,
        customContent: order.customContent || ''
      }))
    },
    
    generateCopyContent(products) {
      let content = ''
      products.forEach(item => {
        content += `${item.description}，${item.count} ${item.unit}\n\n`
      })
      content += '明天早上 8 点前送到，谢谢！'
      return content
    },
    
    copyOrderContent(order, index) {
      const copyContent = this.generateCopyContent(order.products)
      let finalContent = copyContent
      
      if (order.customContent && order.customContent.trim()) {
        const deliveryText = '明天早上 8 点前送到，谢谢！'
        const contentWithoutDelivery = copyContent.replace(deliveryText, '').trim()
        finalContent = contentWithoutDelivery + '\n\n' + order.customContent.trim() + '\n\n' + deliveryText
      }
      
      // 复制到剪贴板（小程序环境下使用setClipboardData）
      uni.setClipboardData({
        data: finalContent,
        success: () => {
          uni.showToast({
            title: '订单内容已复制到剪贴板！',
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
    
    updateFinalPrice(index, event) {
      const finalPrice = event.detail.value
      console.log(`订单 ${index + 1} 的最终价格更新为：¥${finalPrice}`)
    },
    
    formatTime(timeString) {
      const date = new Date(timeString)
      return date.toLocaleString('zh-CN')
    }
  }
}
</script>

<style>
.container {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 40rpx;
}

.supplier-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40rpx 30rpx;
  margin-bottom: 20rpx;
  text-align: center;
}

.supplier-name {
  font-size: 56rpx;
  font-weight: bold;
  display: block;
  margin-bottom: 20rpx;
}

.supplier-summary {
  display: flex;
  justify-content: space-around;
  margin-top: 30rpx;
}

.summary-item {
  text-align: center;
}

.summary-label {
  font-size: 28rpx;
  opacity: 0.8;
  display: block;
  margin-bottom: 10rpx;
}

.summary-value {
  font-size: 36rpx;
  font-weight: bold;
}

.empty-orders {
  text-align: center;
  padding: 100rpx;
  color: #999;
}

.empty-text {
  font-size: 32rpx;
  display: block;
  margin-bottom: 20rpx;
}

.empty-desc {
  font-size: 28rpx;
}

.orders-detail {
  padding: 20rpx;
}

.order-detail {
  background: white;
  margin-bottom: 30rpx;
  padding: 30rpx;
  border-radius: 15rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
  padding-bottom: 20rpx;
  border-bottom: 1px solid #eee;
}

.order-number {
  font-size: 28rpx;
  color: #666;
}

.order-status {
  padding: 10rpx 24rpx;
  border-radius: 30rpx;
  font-size: 24rpx;
  font-weight: bold;
  background: #fff3cd;
  color: #856404;
}

.products-list {
  margin-bottom: 30rpx;
}

.product-detail {
  margin-bottom: 30rpx;
  padding: 20rpx;
  background: #f8f9fa;
  border-radius: 10rpx;
  border-left: 6rpx solid #28a745;
}

.product-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-name {
  font-size: 32rpx;
  color: #333;
  font-weight: 500;
  flex: 1;
}

.product-price {
  font-size: 32rpx;
  color: #e74c3c;
  font-weight: bold;
}

.order-footer {
  border-top: 4rpx solid #eee;
  padding-top: 30rpx;
  margin-top: 30rpx;
}

.total-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
  gap: 30rpx;
}

.total-original {
  color: #666;
  font-size: 28rpx;
}

.total-final {
  display: flex;
  align-items: center;
  gap: 10rpx;
  font-weight: bold;
  color: #e74c3c;
}

.final-price-input {
  border: 4rpx solid #007aff;
  border-radius: 10rpx;
  padding: 10rpx 16rpx;
  font-size: 32rpx;
  font-weight: bold;
  color: #e74c3c;
  width: 200rpx;
  text-align: center;
}

.custom-content-section {
  margin: 40rpx 0;
  padding: 30rpx 0;
  border-top: 2rpx solid #eee;
}

.custom-content-label {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 16rpx;
}

.custom-content-input {
  width: 100%;
  padding: 24rpx;
  border: 4rpx solid #ddd;
  border-radius: 16rpx;
  font-size: 28rpx;
  line-height: 1.4;
  min-height: 120rpx;
  box-sizing: border-box;
}

.order-actions {
  display: flex;
  justify-content: center;
}

.copy-btn-full {
  width: 100%;
  padding: 30rpx 40rpx;
  border: none;
  border-radius: 16rpx;
  cursor: pointer;
  font-size: 32rpx;
  font-weight: bold;
  background: #17a2b8;
  color: white;
}

.order-time {
  font-size: 24rpx;
  color: #999;
  margin-top: 30rpx;
  text-align: center;
}
</style> 