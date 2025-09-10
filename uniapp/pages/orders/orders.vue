<template>
  <view class="container">
    <view class="header">
      <text class="title">我的订单</text>
      <text v-if="suppliers.length > 0" class="order-count">共 {{ suppliers.length }} 个供应商</text>
    </view>
    
    <!-- 订单为空时显示 -->
    <view v-if="suppliers.length === 0" class="empty-orders">
      <image class="empty-icon" src="/static/logo.png"></image>
      <text class="empty-text">暂无订单</text>
      <text class="empty-desc">快去购买心仪的商品吧</text>
      <button class="go-shopping-btn" @click="goShopping">去购物</button>
    </view>
    
    <!-- 供应商列表 -->
    <view v-else class="suppliers-list">
      <view v-for="supplier in suppliers" :key="supplier.supplier" class="supplier-item" @click="goToSupplierDetail(supplier.supplier)">
        <view class="supplier-simple">
          <text class="supplier-name-only">{{ supplier.supplier }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      suppliers: []
    }
  },
  onLoad() {
    this.loadOrders()
  },
  onShow() {
    this.loadOrders()
  },
  methods: {
    loadOrders() {
      const orders = uni.getStorageSync('orders') || []
      
      if (orders.length === 0) {
        this.suppliers = []
        return
      }
      
      // 按供应商分组并统计
      const supplierSummary = {}
      orders.forEach(order => {
        const supplier = order.supplier
        if (!supplierSummary[supplier]) {
          supplierSummary[supplier] = {
            supplier: supplier,
            totalProducts: 0,
            totalPrice: 0,
            orderCount: 0,
            latestTime: order.createTime
          }
        }
        
        supplierSummary[supplier].totalProducts += order.products.length
        supplierSummary[supplier].totalPrice += order.totalPrice
        supplierSummary[supplier].orderCount += 1
        
        // 更新最新时间
        if (new Date(order.createTime) > new Date(supplierSummary[supplier].latestTime)) {
          supplierSummary[supplier].latestTime = order.createTime
        }
      })
      
      this.suppliers = Object.values(supplierSummary)
    },
    
    goShopping() {
      uni.switchTab({ url: '/pages/index/index' })
    },
    
    goToSupplierDetail(supplierName) {
      // 跳转到供应商详情页面，传递供应商名称
      uni.navigateTo({
        url: `/pages/supplier-detail/supplier-detail?supplier=${encodeURIComponent(supplierName)}`
      })
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

.suppliers-list {
  padding: 20rpx;
}

.supplier-item {
  background: white;
  margin-bottom: 15rpx;
  padding: 20rpx;
  border-radius: 15rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.supplier-item:hover {
  transform: translateY(-2rpx);
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.15);
}

.supplier-simple {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20rpx;
  text-align: center;
}

.supplier-name-only {
  font-size: 48rpx;
  font-weight: bold;
  color: #333;
}
</style>