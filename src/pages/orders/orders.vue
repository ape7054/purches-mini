<template>
  <view class="orders-container">
    <view class="header">
      <text class="title">我的订单</text>
      <text v-if="orders.length > 0" class="order-count">共 {{ orders.length }} 个订单</text>
    </view>
    
    <!-- 订单为空时显示 -->
    <view v-if="orders.length === 0" class="empty-orders">
      <image class="empty-icon" src="/static/logo.png"></image>
      <text class="empty-text">暂无订单</text>
      <text class="empty-desc">快去购买心仪的商品吧</text>
      <button class="go-shopping-btn" @click="goShopping">去购物</button>
    </view>
    
    <!-- 订单列表 -->
    <view v-else class="orders-list">
      <view class="order-item" v-for="order in orders" :key="order.id">
        <view class="order-header">
          <view class="order-info">
            <text class="order-number">订单号：{{ order.orderNo }}</text>
            <text class="order-time">{{ order.createTime }}</text>
          </view>
          <view class="order-status" :class="getStatusClass(order.status)">
            {{ order.status }}
          </view>
        </view>
        
        <view class="order-content">
          <view class="order-summary">
            <text class="summary-text">共 {{ order.totalItems }} 件商品</text>
            <text class="total-amount">¥{{ order.totalAmount.toFixed(2) }}</text>
          </view>
          
          <!-- 商品详情展开/收起 -->
          <view class="toggle-details" @click="toggleOrderDetails(order.id)">
            <text class="toggle-text">{{ order.showDetails ? '收起详情' : '查看详情' }}</text>
            <text class="toggle-icon">{{ order.showDetails ? '▲' : '▼' }}</text>
          </view>
          
          <!-- 商品详情列表 -->
          <view v-if="order.showDetails" class="order-details">
            <view v-for="item in order.items" :key="item.id" class="detail-item">
              <view class="item-info">
                <text class="item-name">{{ item.id }}. {{ item.name }}</text>
                <text class="item-supplier">{{ item.shopName }}</text>
              </view>
              <view class="item-pricing">
                <text class="item-price">¥{{ item.price }}/{{ item.unit }}</text>
                <text class="item-quantity">x{{ item.count }}</text>
                <text class="item-subtotal">¥{{ (item.price * item.count).toFixed(2) }}</text>
              </view>
              <text class="item-desc">{{ item.description }}</text>
            </view>
          </view>
        </view>
        
        <view class="order-actions">
          <button class="action-btn cancel" v-if="order.status === '待处理'" @click="cancelOrder(order)">取消订单</button>
          <button class="action-btn reorder" @click="reorder(order)">再次购买</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      orders: []
    }
  },
  mounted() {
    this.loadOrders()
  },
  methods: {
    loadOrders() {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      // 为每个订单添加显示详情的状态
      this.orders = orders.map(order => ({
        ...order,
        showDetails: false
      }))
    },
    
    getStatusClass(status) {
      switch (status) {
        case '待处理':
          return 'status-pending'
        case '已完成':
          return 'status-completed'
        case '已取消':
          return 'status-cancelled'
        default:
          return 'status-default'
      }
    },
    
    toggleOrderDetails(orderId) {
      const order = this.orders.find(o => o.id === orderId)
      if (order) {
        order.showDetails = !order.showDetails
      }
    },
    
    cancelOrder(order) {
      if (confirm('确定要取消这个订单吗？')) {
        // 更新订单状态
        order.status = '已取消'
        this.saveOrders()
        
        alert('订单已取消')
      }
    },
    
    reorder(order) {
      if (confirm(`将 ${order.totalItems} 件商品添加到购物车吗？`)) {
        // 获取当前购物车
        const currentCart = JSON.parse(localStorage.getItem('cart') || '[]')
        
        // 添加订单商品到购物车（如果已存在则累加数量）
        order.items.forEach(orderItem => {
          const existingItem = currentCart.find(cartItem => 
            cartItem.id === orderItem.id && cartItem.shopName === orderItem.shopName
          )
          
          if (existingItem) {
            existingItem.count += orderItem.count
          } else {
            currentCart.push({ ...orderItem })
          }
        })
        
        // 保存购物车
        localStorage.setItem('cart', JSON.stringify(currentCart))
        
        alert('已添加到购物车')
        
        // 跳转到购物车
        setTimeout(() => {
          this.$router.push('/cart')
        }, 1000)
      }
    },
    
    saveOrders() {
      const ordersToSave = this.orders.map(order => {
        const { showDetails, ...orderData } = order
        return orderData
      })
      localStorage.setItem('orders', JSON.stringify(ordersToSave))
    },
    
    goShopping() {
      this.$router.push('/')
    }
  }
}
</script>

<style>
.orders-container {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 40rpx;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40rpx 30rpx;
  color: white;
  text-align: center;
}

.title {
  font-size: 40rpx;
  font-weight: bold;
  display: block;
  margin-bottom: 10rpx;
}

.order-count {
  font-size: 28rpx;
  opacity: 0.9;
}

.empty-orders {
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

.orders-list {
  padding: 20rpx;
}

.order-item {
  background: white;
  margin-bottom: 20rpx;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 30rpx;
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
}

.order-info {
  flex: 1;
}

.order-number {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
  display: block;
  margin-bottom: 8rpx;
}

.order-time {
  font-size: 24rpx;
  color: #999;
}

.order-status {
  padding: 10rpx 20rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
  font-weight: 500;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
}

.status-completed {
  background: #d4edda;
  color: #155724;
}

.status-cancelled {
  background: #f8d7da;
  color: #721c24;
}

.status-default {
  background: #e2e3e5;
  color: #383d41;
}

.order-content {
  padding: 30rpx;
}

.order-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.summary-text {
  font-size: 28rpx;
  color: #666;
}

.total-amount {
  font-size: 36rpx;
  font-weight: bold;
  color: #ff6b6b;
}

.toggle-details {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15rpx;
  background: #f8f9fa;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
  cursor: pointer;
}

.toggle-text {
  font-size: 26rpx;
  color: #666;
  margin-right: 10rpx;
}

.toggle-icon {
  font-size: 20rpx;
  color: #666;
}

.order-details {
  border-top: 1px solid #f0f0f0;
  padding-top: 20rpx;
}

.detail-item {
  padding: 20rpx 0;
  border-bottom: 1px solid #f8f9fa;
}

.detail-item:last-child {
  border-bottom: none;
}

.item-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10rpx;
}

.item-name {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
  flex: 1;
}

.item-supplier {
  font-size: 22rpx;
  color: #666;
  background: #f0f0f0;
  padding: 5rpx 12rpx;
  border-radius: 12rpx;
}

.item-pricing {
  display: flex;
  align-items: center;
  gap: 15rpx;
  margin-bottom: 10rpx;
}

.item-price {
  font-size: 26rpx;
  color: #ff6b6b;
  font-weight: 500;
}

.item-quantity {
  font-size: 26rpx;
  color: #666;
}

.item-subtotal {
  font-size: 28rpx;
  color: #333;
  font-weight: bold;
  margin-left: auto;
}

.item-desc {
  font-size: 24rpx;
  color: #999;
  line-height: 1.4;
}

.order-actions {
  display: flex;
  gap: 20rpx;
  padding: 20rpx 30rpx;
  background: #fafafa;
  border-top: 1px solid #f0f0f0;
}

.action-btn {
  flex: 1;
  padding: 20rpx;
  border-radius: 10rpx;
  border: none;
  font-size: 26rpx;
  font-weight: 500;
  cursor: pointer;
}

.cancel {
  background: #f8d7da;
  color: #721c24;
}

.reorder {
  background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
  color: white;
}
</style>