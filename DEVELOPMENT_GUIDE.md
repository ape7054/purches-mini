# 🛒 采购订单系统开发维护文档

> 一个基于双技术栈的采购订单管理系统，包含Web版本和uni-app小程序版本

## 📋 目录

- [项目概述](#-项目概述)
- [技术架构](#-技术架构)
- [项目结构](#-项目结构)
- [开发环境搭建](#-开发环境搭建)
- [运行指南](#-运行指南)
- [功能模块详解](#-功能模块详解)
- [开发指南](#-开发指南)
- [数据结构说明](#-数据结构说明)
- [部署指南](#-部署指南)
- [常见问题](#-常见问题)
- [维护指南](#-维护指南)

## 🎯 项目概述

### 系统定位
采购订单系统是一个B2B采购管理平台，为餐饮业提供便捷的供应商商品采购、订单管理和跟踪服务。

### 核心特性
- **多供应商管理**: 支持82个商品，8个主要供应商
- **双端支持**: Web版本 + uni-app小程序版本
- **本地存储**: 使用localStorage进行数据持久化
- **响应式设计**: 适配PC和移动端
- **订单追踪**: 完整的购物车到订单流程

### 业务流程
```
浏览商品 → 添加购物车 → 订单确认 → 生成订单 → 订单管理
```

## 🏗 技术架构

### 双版本架构

| 版本 | 技术栈 | 用途 | 运行环境 |
|------|--------|------|----------|
| **Web版本** | HTML5 + CSS3 + JavaScript (ES6+) | PC端管理、开发参考 | 浏览器 + HTTP服务器 |
| **uni-app版本** | Vue 3 + uni-app + Vite | 小程序、APP开发 | HBuilderX + 各平台SDK |

### 技术栈详解

#### **Web版本技术栈**
- **前端**: 原生HTML5 + CSS3 + JavaScript ES6+
- **样式**: CSS Grid + Flexbox + 响应式设计
- **数据**: JSON文件 + localStorage
- **服务器**: Python HTTP Server / http-server

#### **uni-app版本技术栈**
- **框架**: Vue 3 + uni-app 3.x
- **构建工具**: Vite 5.x
- **开发工具**: HBuilderX
- **目标平台**: H5、微信小程序、APP、支付宝小程序等
- **状态管理**: 组件内状态 + uni.storage

## 📁 项目结构

```
purches-mini/
├── 📱 uniapp/                    # uni-app版本（主要开发版本）
│   ├── pages/                    # 页面文件
│   │   ├── index/                # 首页-供应商列表
│   │   ├── shop/                 # 商品列表页
│   │   ├── cart/                 # 购物车页
│   │   └── orders/               # 订单管理页
│   ├── static/                   # 静态资源
│   │   ├── data.json            # 按供应商分组的商品数据
│   │   ├── products.json        # 原始商品数据
│   │   └── *.png                # 图标资源
│   ├── pages.json               # 页面路由配置
│   ├── manifest.json            # 应用配置
│   ├── App.vue                  # 应用根组件
│   ├── main.js                  # 应用入口
│   └── package.json             # 依赖配置
│
├── 🌐 web/                       # Web版本（参考实现）
│   ├── index.html               # 主页
│   ├── shop.html                # 商品页
│   ├── cart.html                # 购物车页
│   ├── orders.html              # 订单页
│   ├── supplier-detail.html     # 供应商详情页
│   └── products.json            # 产品数据
│
├── 📄 conversations/             # 开发记录
├── 📖 README.md                 # 项目说明
└── 📚 DEVELOPMENT_GUIDE.md      # 本开发文档
```

## 🔧 开发环境搭建

### 基础环境要求

#### **系统要求**
- **操作系统**: Windows 10/11, macOS 10.14+, Ubuntu 18.04+
- **Node.js**: 16.0+ (推荐 18.x LTS)
- **Python**: 3.6+ (用于Web版本HTTP服务器)

#### **开发工具**
- **主要**: HBuilderX (uni-app开发)
- **辅助**: VS Code (代码编辑)
- **版本控制**: Git

### 环境安装步骤

#### **1. Node.js环境**
```bash
# 检查Node.js版本
node --version
npm --version

# 如果未安装，访问 https://nodejs.org 下载安装
```

#### **2. HBuilderX安装**
```bash
# 下载地址
https://www.dcloud.io/hbuilderx.html

# 安装插件（在HBuilderX中）
- uni-app编译器
- App真机运行
- 微信小程序支持
```

#### **3. 辅助工具**
```bash
# 全局安装HTTP服务器（用于Web版本）
npm install -g http-server

# 或者使用Python内置服务器（无需安装）
python -m http.server
```

### 项目依赖安装

#### **uni-app版本**
```bash
cd uniapp
npm install --legacy-peer-deps
```

#### **Web版本**
```bash
# 无需安装依赖，直接运行HTTP服务器
cd web
python -m http.server 8080
```

## 🚀 运行指南

### Web版本运行

#### **方法一: Python HTTP服务器（推荐）**
```bash
cd web
python -m http.server 8080
# 访问: http://localhost:8080
```

#### **方法二: Node.js http-server**
```bash
cd web
npx http-server -p 8080
# 访问: http://localhost:8080
```

#### **方法三: VS Code Live Server**
1. 安装"Live Server"扩展
2. 右键 `web/index.html`
3. 选择"Open with Live Server"

### uni-app版本运行

#### **HBuilderX运行（推荐）**
1. 打开HBuilderX
2. 文件 → 导入 → 选择 `uniapp` 目录
3. 运行 → 运行到浏览器 → Chrome
4. 或运行到微信开发者工具

#### **命令行运行**
```bash
cd uniapp
npm run dev:h5          # H5版本
npm run dev:mp-weixin   # 微信小程序
npm run dev:app         # APP版本
```

## 🎨 功能模块详解

### 核心功能架构

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   商品浏览模块    │    │   购物车模块     │    │   订单管理模块   │
│                │    │                │    │                │
│ • 供应商列表     │───▶│ • 商品添加/删除  │───▶│ • 订单生成      │
│ • 商品分类      │    │ • 数量调整      │    │ • 历史查看      │
│ • 详情展示      │    │ • 总价计算      │    │ • 状态跟踪      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 1. 商品浏览模块

#### **功能描述**
- 显示8个主要供应商
- 82个商品按供应商分组
- 支持商品搜索和筛选

#### **核心文件**
- **uni-app**: `pages/index/index.vue`, `pages/shop/shop.vue`
- **Web**: `index.html`, `shop.html`

#### **关键代码示例**
```vue
<!-- uni-app版本 -->
<template>
  <view class="supplier-list">
    <view v-for="(products, supplier) in goodsData" :key="supplier" 
          class="supplier-item" @click="goToShop(supplier)">
      <text class="supplier-name">{{ supplier }}</text>
      <text class="product-count">{{ products.length }}个商品</text>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    goToShop(shopName) {
      uni.navigateTo({
        url: `/pages/shop/shop?shopName=${encodeURIComponent(shopName)}`
      })
    }
  }
}
</script>
```

### 2. 购物车模块

#### **功能描述**
- 商品添加/删除/数量调整
- 实时总价计算
- 购物车状态持久化

#### **数据流程**
```
商品选择 → localStorage存储 → 购物车显示 → 订单提交
```

#### **核心逻辑**
```javascript
// 购物车数据结构
const cartItem = {
  id: 1,
  name: "牛蛙",
  price: 31,
  unit: "斤", 
  description: "牛蛙杀好处理干净...",
  supplier: "F35",
  count: 2,
  totalPrice: 62
}

// 添加到购物车
function addToCart(product) {
  const cart = uni.getStorageSync('cart') || []
  const existingItem = cart.find(item => 
    item.id === product.id && item.supplier === product.supplier
  )
  
  if (existingItem) {
    existingItem.count += 1
    existingItem.totalPrice = existingItem.count * existingItem.price
  } else {
    cart.push({
      ...product,
      count: 1,
      totalPrice: product.price
    })
  }
  
  uni.setStorageSync('cart', cart)
}
```

### 3. 订单管理模块

#### **功能描述**
- 订单生成和确认
- 订单历史查看
- 按供应商分组显示
- 订单状态管理

#### **订单生成流程**
```javascript
// 订单数据结构
const order = {
  id: Date.now(),
  supplier: "F35",
  products: [...cartItems],
  totalPrice: 156.50,
  totalItems: 5,
  status: "待处理",
  createTime: new Date().toISOString()
}

// 提交订单
function checkout() {
  const cartItems = uni.getStorageSync('cart') || []
  const orders = uni.getStorageSync('orders') || []
  
  // 按供应商分组创建订单
  const ordersBySupplier = groupBySupplier(cartItems)
  
  Object.keys(ordersBySupplier).forEach(supplier => {
    const order = {
      id: Date.now() + Math.random(),
      supplier,
      products: ordersBySupplier[supplier],
      totalPrice: calculateTotal(ordersBySupplier[supplier]),
      status: "待处理",
      createTime: new Date().toISOString()
    }
    orders.push(order)
  })
  
  uni.setStorageSync('orders', orders)
  uni.removeStorageSync('cart')
}
```

## 💾 数据结构说明

### 商品数据结构

#### **products.json（原始数据）**
```json
[
  {
    "id": 1,
    "name": "牛蛙",
    "price": 31,
    "unit": "斤",
    "description": "牛蛙杀好处理干净去掉内脏和眼睛，去掉爪子，50斤",
    "supplier": "F35"
  }
]
```

#### **data.json（按供应商分组）**
```json
{
  "F35": [
    {
      "id": 1,
      "name": "牛蛙", 
      "price": 31,
      "unit": "斤",
      "description": "牛蛙杀好处理干净...",
      "supplier": "F35",
      "count": 0
    }
  ]
}
```

### 存储数据结构

#### **购物车数据 (localStorage: 'cart')**
```json
[
  {
    "id": 1,
    "name": "牛蛙",
    "price": 31,
    "unit": "斤", 
    "description": "牛蛙杀好处理干净...",
    "supplier": "F35",
    "count": 2,
    "totalPrice": 62
  }
]
```

#### **订单数据 (localStorage: 'orders')**
```json
[
  {
    "id": 1694678901234,
    "supplier": "F35",
    "products": [...],
    "totalPrice": 156.50,
    "totalItems": 5,
    "status": "待处理",
    "createTime": "2024-09-10T08:30:00.000Z"
  }
]
```

## 🛠 开发指南

### 代码规范

#### **命名规范**
```javascript
// 文件命名: kebab-case
shop-detail.vue
supplier-list.vue

// 变量命名: camelCase  
const cartItems = []
const totalPrice = 0

// 常量命名: UPPER_CASE
const API_BASE_URL = 'https://api.example.com'

// 组件命名: PascalCase
const ShopDetail = {}
```

#### **代码风格**
```javascript
// 推荐的Vue组件结构
<template>
  <!-- 模板内容 -->
</template>

<script>
export default {
  data() {
    return {
      // 数据定义
    }
  },
  
  computed: {
    // 计算属性
  },
  
  onLoad() {
    // uni-app生命周期
  },
  
  methods: {
    // 方法定义
  }
}
</script>

<style scoped>
/* 组件样式 */
</style>
```

### 开发工作流

#### **1. 功能开发流程**
```bash
# 1. 创建功能分支
git checkout -b feature/new-feature

# 2. 开发功能
# - 在uni-app版本中实现
# - 确保与web版本功能一致

# 3. 测试功能
npm run dev:h5          # H5测试
npm run dev:mp-weixin   # 小程序测试

# 4. 提交代码
git add .
git commit -m "feat: 添加新功能"
git push origin feature/new-feature
```

#### **2. 调试指南**

**uni-app调试:**
```javascript
// 使用console.log调试
console.log('调试信息:', data)

// 使用uni.showModal调试
uni.showModal({
  title: '调试',
  content: JSON.stringify(data)
})

// HBuilderX控制台查看
// 运行 → 运行到浏览器 → 打开开发者工具
```

**Web版本调试:**
```javascript
// 浏览器开发者工具
console.log('调试信息:', data)

// 网络面板查看数据加载
// Application面板查看localStorage
```

### 性能优化建议

#### **1. 数据优化**
```javascript
// 避免频繁的存储操作
// 批量更新购物车
function updateCartBatch(updates) {
  const cart = uni.getStorageSync('cart') || []
  updates.forEach(update => {
    // 执行更新操作
  })
  uni.setStorageSync('cart', cart) // 一次性保存
}

// 使用计算属性避免重复计算
computed: {
  cartTotal() {
    return this.cartItems.reduce((sum, item) => sum + item.totalPrice, 0)
  }
}
```

#### **2. 渲染优化**
```vue
<!-- 使用v-show替代v-if（频繁切换） -->
<view v-show="showCart" class="cart-panel">
  <!-- 购物车内容 -->
</view>

<!-- 长列表使用key优化 -->
<view v-for="item in products" :key="item.id" class="product-item">
  {{ item.name }}
</view>
```

## 📦 部署指南

### Web版本部署

#### **静态网站托管**
```bash
# 1. 构建静态文件（已经是静态文件）
# web目录可直接部署

# 2. 上传到服务器
# - Nginx
# - Apache  
# - 云服务商静态托管

# 3. Nginx配置示例
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/web;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### uni-app版本部署

#### **H5版本**
```bash
# 1. 构建H5版本
npm run build:h5

# 2. 部署dist/build/h5目录到web服务器
```

#### **微信小程序**
```bash
# 1. 构建微信小程序版本  
npm run build:mp-weixin

# 2. 在微信开发者工具中打开dist/build/mp-weixin
# 3. 上传代码到微信平台
# 4. 提交审核并发布
```

#### **APP版本**
```bash
# 1. 在HBuilderX中
# 发行 → 原生App-云打包

# 2. 选择打包平台
# - Android APK
# - iOS IPA

# 3. 配置签名和证书
# 4. 提交打包
```

## ❓ 常见问题

### 开发环境问题

#### **Q1: HBuilderX导入项目后编译失败**
```bash
# A1: 检查依赖安装
cd uniapp
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# 检查HBuilderX插件
# 工具 → 插件安装 → uni-app编译器
```

#### **Q2: Web版本fetch失败**
```bash
# A2: 确保使用HTTP服务器运行
# ❌ 错误：直接双击HTML文件 (file://)
# ✅ 正确：http://localhost:8080

cd web
python -m http.server 8080
```

#### **Q3: uni-app真机调试失败**
```bash
# A3: 检查网络和设备连接
# 1. 确保手机和电脑在同一网络
# 2. 开启手机USB调试
# 3. 信任开发者证书
```

### 功能问题

#### **Q4: 购物车数据丢失**
```javascript
// A4: 检查localStorage存储
// 调试代码
const cart = uni.getStorageSync('cart')
console.log('购物车数据:', cart)

// 确保数据格式正确
if (!Array.isArray(cart)) {
  uni.setStorageSync('cart', [])
}
```

#### **Q5: 订单金额计算错误**
```javascript
// A5: 检查价格计算逻辑
function calculateTotal(items) {
  return items.reduce((sum, item) => {
    return sum + (parseFloat(item.price) * parseInt(item.count))
  }, 0)
}
```

### 部署问题

#### **Q6: 小程序审核被拒**
```bash
# A6: 常见问题检查
# 1. 确保没有使用禁用API
# 2. 隐私政策完整
# 3. 功能描述准确
# 4. 测试账号可用
```

## 🔧 维护指南

### 日常维护任务

#### **1. 数据维护**
```javascript
// 商品数据更新
// 1. 更新 static/products.json
// 2. 运行数据转换脚本（如需要）
// 3. 测试两个版本的数据加载

// 供应商信息维护
// 检查供应商名称一致性
// 更新联系方式和商品列表
```

#### **2. 性能监控**
```javascript
// 检查localStorage使用情况
const storageUsed = JSON.stringify(localStorage).length
console.log('存储使用量:', storageUsed, 'bytes')

// 清理过期数据
function cleanupOldOrders() {
  const orders = uni.getStorageSync('orders') || []
  const oneMonthAgo = Date.now() - (30 * 24 * 60 * 60 * 1000)
  
  const validOrders = orders.filter(order => 
    new Date(order.createTime).getTime() > oneMonthAgo
  )
  
  uni.setStorageSync('orders', validOrders)
}
```

#### **3. 版本更新流程**
```bash
# 1. 检查依赖更新
npm outdated

# 2. 更新非破坏性依赖
npm update

# 3. 测试功能完整性
npm run dev:h5
npm run dev:mp-weixin

# 4. 更新版本号
# manifest.json -> versionName
# package.json -> version

# 5. 构建并部署
npm run build:h5
npm run build:mp-weixin
```

### 监控和日志

#### **错误监控**
```javascript
// 在App.vue中添加全局错误处理
export default {
  onError(err) {
    console.error('应用错误:', err)
    // 可以发送到错误监控服务
  },
  
  onUnhandledRejection(err) {
    console.error('未处理的Promise错误:', err)
  }
}
```

#### **用户行为分析**
```javascript
// 关键操作埋点
function trackEvent(event, data) {
  console.log('用户行为:', event, data)
  // 可以发送到分析服务
  
  // 示例埋点
  // trackEvent('add_to_cart', { productId: 1, supplier: 'F35' })
  // trackEvent('checkout', { totalPrice: 156.50, itemCount: 5 })
}
```

### 备份和恢复

#### **代码备份**
```bash
# Git仓库备份
git remote add backup <backup-repository-url>
git push backup main

# 定期标签发布
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin --tags
```

#### **数据备份**
```javascript
// 导出用户数据
function exportUserData() {
  const cart = uni.getStorageSync('cart') || []
  const orders = uni.getStorageSync('orders') || []
  
  const backup = {
    cart,
    orders,
    timestamp: new Date().toISOString()
  }
  
  return JSON.stringify(backup, null, 2)
}

// 导入用户数据
function importUserData(backupData) {
  try {
    const data = JSON.parse(backupData)
    uni.setStorageSync('cart', data.cart || [])
    uni.setStorageSync('orders', data.orders || [])
    return true
  } catch (error) {
    console.error('数据导入失败:', error)
    return false
  }
}
```

## 📞 技术支持

### 联系方式
- **项目文档**: 参考此开发指南
- **技术讨论**: 查看 `conversations/` 目录中的开发记录
- **问题反馈**: 在项目仓库创建Issue

### 相关资源
- **uni-app官方文档**: https://uniapp.dcloud.io/
- **Vue.js官方文档**: https://vuejs.org/
- **HBuilderX使用指南**: https://hx.dcloud.io/

### 版本历史
- **v1.0.0**: 初始版本，包含基础采购功能
- **当前版本**: 双版本架构，完整功能实现

---

## 🎉 结语

这份文档涵盖了采购订单系统的完整开发和维护指南。在实际开发过程中，请：

1. **优先使用uni-app版本**进行功能开发
2. **参考Web版本**进行UI和功能对比
3. **遵循代码规范**确保代码质量
4. **及时更新文档**记录重要变更
5. **做好测试**确保多平台兼容性

希望这份文档能帮助后续的开发者快速上手并高效维护这个项目！🚀 