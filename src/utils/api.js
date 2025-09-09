// API工具文件 - 封装所有后端接口调用
const API_BASE_URL = 'https://www.ency.asia/api'

// 统一的请求处理函数
function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${API_BASE_URL}${url}`,
      method: options.method || 'GET',
      header: {
        'Content-Type': 'application/json',
        ...(options.header || {})
      },
      data: options.data,
      success: (res) => {
        if (res.data.code === 200) {
          resolve(res.data.data)
        } else {
          console.error('API错误:', res.data.message) 
          uni.showToast({
            title: res.data.message || '请求失败',
            icon: 'error',
            duration: 2000
          })
          reject(new Error(res.data.message))
        }
      },
      fail: (err) => {
        console.error('网络错误:', err)
        uni.showToast({
          title: '网络连接失败',
          icon: 'error',
          duration: 2000
        })
        reject(err)
      }
    })
  })
}

// 商店相关API
export const shopApi = {
  // 获取商店列表
  getShops() {
    return request('/shops')
  },
  
  // 获取商店商品列表
  getShopProducts(shopId) {
    return request(`/shops/${shopId}/products`)
  }
}

// 商品相关API
export const productApi = {
  // 获取所有商品
  getAllProducts() {
    return request('/products')
  },
  
  // 根据供应商获取商品
  getProductsBySupplier(supplier) {
    return request(`/products?supplier=${encodeURIComponent(supplier)}`)
  },
  
  // 搜索商品
  searchProducts(keyword) {
    return request(`/products/search?q=${encodeURIComponent(keyword)}`)
  }
}

// 购物车相关API
export const cartApi = {
  // 查看购物车
  getCart() {
    return request('/cart')
  },
  
  // 添加商品到购物车
  addItem(productId, quantity) {
    return request('/cart/items', {
      method: 'POST',
      data: { productId, quantity }
    })
  },
  
  // 修改购物车商品数量
  updateItem(productId, quantity) {
    return request(`/cart/items/${productId}`, {
      method: 'PUT',
      data: { quantity }
    })
  },
  
  // 删除购物车商品
  deleteItems(productIds) {
    return request('/cart/items', {
      method: 'DELETE',
      data: { productIds }
    })
  },
  
  // 清空购物车
  clearCart() {
    return request('/cart', {
      method: 'DELETE'
    })
  }
}

// 订单相关API
export const orderApi = {
  // 提交订单
  createOrder(remark = '') {
    return request('/orders', {
      method: 'POST',
      data: { remark }
    })
  },
  
  // 获取订单列表
  getOrders(status = '') {
    const url = status ? `/orders?status=${status}` : '/orders'
    return request(url)
  },
  
  // 获取订单详情
  getOrderDetail(orderId) {
    return request(`/orders/${orderId}`)
  },
  
  // 更新订单状态
  updateOrderStatus(orderId, status) {
    return request(`/orders/${orderId}/status`, {
      method: 'PUT',
      data: { status }
    })
  },
  
  // 更新订单最终结算价格
  updateOrderFinalPrice(orderId, finalPrice) {
    return request(`/orders/${orderId}/final-price`, {
      method: 'PUT',
      data: { finalPrice }
    })
  }
}

// 系统API
export const systemApi = {
  // 健康检查
  healthCheck() {
    return request('/health')
  }
} 