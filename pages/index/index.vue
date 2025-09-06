<template>
	<view class="container">
		<view class="header">
			<image class="logo" src="/static/logo.png"></image>
			<text class="title">采购订单系统</text>
		</view>
		
		<view class="shop-list">
			<view 
				v-for="(shopName, index) in shopNames" 
				:key="index" 
				class="shop-item"
				@click="goToShop(shopName)"
			>
				<view class="shop-info">
					<text class="shop-name">{{ shopName }}</text>
					<text class="shop-desc">点击查看商品列表</text>
				</view>
				<view class="arrow">></view>
			</view>
		</view>
		
		<!-- 购物车入口 -->
		<view class="cart-entry" @click="goToCart">
			<text class="cart-text">购物车 ({{ cartTotal }})</text>
		</view>
	</view>
</template>

<script>
import goodsData from "@/static/data.json"

export default {
	data() {
		return {
			shopNames: [],
			cartTotal: 0
		}
	},
	onLoad() {
		// 从数据中获取所有商家名称
		this.shopNames = Object.keys(goodsData)
		this.loadCartTotal()
	},
	onShow() {
		// 每次显示页面时更新购物车数量
		this.loadCartTotal()
	},
	methods: {
		goToShop(shopName) {
			uni.navigateTo({
				url: `/pages/shop/shop?shopName=${encodeURIComponent(shopName)}`
			})
		},
		goToCart() {
			uni.navigateTo({
				url: '/pages/cart/cart'
			})
		},
		loadCartTotal() {
			const cart = uni.getStorageSync('cart') || []
			this.cartTotal = cart.reduce((sum, item) => sum + item.count, 0)
		}
	}
}
</script>

<style>
.container {
	padding: 20rpx;
	background-color: #f5f5f5;
	min-height: 100vh;
}

.header {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 40rpx 0;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	border-radius: 20rpx;
	margin-bottom: 30rpx;
}

.logo {
	height: 120rpx;
	width: 120rpx;
	margin-bottom: 20rpx;
}

.title {
	font-size: 36rpx;
	color: #fff;
	font-weight: bold;
}

.shop-list {
	background: #fff;
	border-radius: 20rpx;
	overflow: hidden;
	margin-bottom: 30rpx;
}

.shop-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 30rpx 20rpx;
	border-bottom: 1px solid #f0f0f0;
	transition: background-color 0.3s;
}

.shop-item:last-child {
	border-bottom: none;
}

.shop-item:active {
	background-color: #f8f8f8;
}

.shop-info {
	flex: 1;
}

.shop-name {
	font-size: 32rpx;
	color: #333;
	font-weight: 500;
	display: block;
	margin-bottom: 8rpx;
}

.shop-desc {
	font-size: 24rpx;
	color: #999;
}

.arrow {
	font-size: 32rpx;
	color: #ccc;
}

.cart-entry {
	position: fixed;
	bottom: 40rpx;
	left: 50%;
	transform: translateX(-50%);
	background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
	color: #fff;
	padding: 20rpx 40rpx;
	border-radius: 40rpx;
	box-shadow: 0 8rpx 20rpx rgba(255, 107, 107, 0.3);
}

.cart-text {
	font-size: 28rpx;
	font-weight: 500;
}
</style>
