<template>
  <view class="orders-container">
    <view class="header">
      <text class="title">我的订单</text>
    </view>
    <view class="orders-list">
      <view class="order-item" v-for="order in orders" :key="order.id">
        <view class="order-header">
          <text class="order-number">订单号：{{order.orderNo}}</text>
          <text class="order-status">{{order.status}}</text>
        </view>
        <view class="order-content">
          <view class="product-info">
            <text class="product-name">{{order.productName}}</text>
            <text class="product-price">¥{{order.price}}</text>
          </view>
          <text class="order-time">{{order.createTime}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      orders: [
        {
          id: 1,
          orderNo: '202312250001',
          status: '已完成',
          productName: '苹果手机',
          price: '5999.00',
          createTime: '2023-12-25 10:30:00'
        },
        {
          id: 2,
          orderNo: '202312240002',
          status: '待发货',
          productName: '华为平板',
          price: '2999.00',
          createTime: '2023-12-24 16:20:00'
        }
      ]
    }
  }
}
</script>

<style>
.orders-container {
  padding: 20rpx;
}

.header {
  text-align: center;
  padding: 30rpx 0;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
}

.order-item {
  background: #fff;
  margin-bottom: 20rpx;
  padding: 30rpx;
  border-radius: 10rpx;
  box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.order-number {
  font-size: 28rpx;
  color: #333;
}

.order-status {
  font-size: 28rpx;
  color: #007aff;
}

.product-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10rpx;
}

.product-name {
  font-size: 30rpx;
  color: #333;
}

.product-price {
  font-size: 30rpx;
  color: #ff4d4f;
  font-weight: bold;
}

.order-time {
  font-size: 24rpx;
  color: #999;
}
</style>