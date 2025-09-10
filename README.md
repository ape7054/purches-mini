# 🛒 采购订单系统 (Procurement Order System)

> 基于 uni-app 框架开发的采购订单管理系统，支持多平台部署（H5、小程序、APP）

## 📋 目录

- [项目概述](#-项目概述)
- [功能特性](#-功能特性) 
- [技术栈](#-技术栈)
- [项目结构](#-项目结构)
- [开发环境搭建](#-开发环境搭建)
- [快速开始](#-快速开始)
- [功能模块详解](#-功能模块详解)
- [开发指南](#-开发指南)
- [部署指南](#-部署指南)
- [常见问题](#-常见问题)

## 🎯 项目概述

采购订单系统是一个现代化的B2B采购管理平台，允许用户浏览供应商商品、管理购物车、下单和跟踪订单状态。系统采用uni-app技术栈，实现一套代码多平台运行。

### 核心业务流程
```
商家浏览 → 商品选择 → 加入购物车 → 订单确认 → 订单管理
```

## ✨ 功能特性

### 🏪 商家管理
- **供应商分类展示** - 按商家分组显示商品
- **商家信息查看** - 查看商家详细信息
- **商品筛选** - 按商家快速筛选商品

### 🛍️ 商品管理
- **商品浏览** - 分类展示商品列表
- **商品详情** - 查看商品价格、单位、描述信息
- **库存管理** - 实时显示商品状态
- **商品搜索** - 按名称、分类搜索商品

### 🛒 购物车功能
- **商品添加** - 一键加入购物车
- **数量调整** - 灵活调整商品数量
- **商品删除** - 移除不需要的商品
- **价格计算** - 实时计算总价
- **购物车持久化** - 本地存储购物车数据

### 📋 订单管理
- **订单提交** - 快速下单流程
- **订单查看** - 查看订单详情和状态
- **订单取消** - 支持订单取消操作
- **重复下单** - 基于历史订单快速下单
- **订单历史** - 完整的订单历史记录

## 🛠️ 技术栈

### 前端框架
- **uni-app** - 跨平台应用开发框架
- **Vue 3** - 响应式前端框架
- **Vite** - 现代化构建工具

### 开发工具
- **HBuilderX** - uni-app 官方IDE
- **Vue DevTools** - Vue调试工具
- **微信开发者工具** - 小程序调试工具

### 存储方案
- **uni.storage** - 本地数据存储
- **JSON文件** - 商品数据存储

### 样式方案
- **uni.scss** - 样式预处理器
- **rpx单位** - 响应式像素单位

## 📁 项目结构

```
purches-mini/
├── 📱 uniapp/                    # 🎯 主项目目录
│   ├── 📄 pages/                 # 页面文件
│   │   ├── index/               # 首页 - 供应商列表
│   │   │   └── index.vue
│   │   ├── shop/                # 商品页面
│   │   │   └── shop.vue
│   │   ├── cart/                # 购物车页面
│   │   │   └── cart.vue
│   │   └── orders/              # 订单管理页面
│   │       └── orders.vue
│   ├── 🖼️ static/                # 静态资源
│   │   ├── data.json            # 商品数据文件
│   │   ├── products.json        # 产品列表数据
│   │   └── *.png                # 图标文件
│   ├── ⚙️ App.vue                # 应用入口组件
│   ├── 🚀 main.js               # 应用入口文件
│   ├── 📋 pages.json            # 页面路由配置
│   ├── 📦 manifest.json         # 应用配置文件
│   ├── 🎨 uni.scss              # 全局样式文件
│   └── 🔧 uni.promisify.adaptor.js # Promise适配器
├── 🌐 web/                       # HTML版本参考
├── 📊 static/                    # 全局静态资源
├── 📝 conversations/             # 开发记录
├── 🔄 convert-data.js            # 数据转换工具
└── 📖 README.md                  # 项目文档
```

## 💻 开发环境搭建

### 环境要求
- **Node.js** >= 16.0.0
- **HBuilderX** 最新版本
- **Chrome浏览器** (用于H5调试)
- **微信开发者工具** (用于小程序调试)

### 安装 HBuilderX
1. 访问 [HBuilderX官网](https://www.dcloud.io/hbuilderx.html)
2. 下载并安装标准版或Alpha版
3. 安装uni-app相关插件

### 项目导入
1. 打开 HBuilderX
2. 选择 `文件` → `导入` → `从本地目录导入`
3. 选择项目根目录下的 `uniapp` 文件夹
4. 点击 `选择` 完成导入

## 🚀 快速开始

### 1. 开发环境运行

#### 运行到H5
```bash
# 在HBuilderX中
右键项目 → 运行 → 运行到浏览器 → Chrome
```

#### 运行到微信小程序
```bash
# 在HBuilderX中
右键项目 → 运行 → 运行到小程序模拟器 → 微信开发者工具
```

### 2. 生产环境打包

#### 打包H5版本
```bash
右键项目 → 发行 → 网站-PC Web或手机H5
```

#### 打包小程序版本
```bash
右键项目 → 发行 → 小程序-微信
```

## 📱 功能模块详解

### 首页模块 (`pages/index/index.vue`)
- **功能**：展示所有供应商列表，提供购物车入口
- **数据源**：`static/data.json`
- **主要方法**：
  ```javascript
  goToShop(shopName)    // 跳转到商品页面
  goToCart()            // 跳转到购物车
  loadCartTotal()       // 加载购物车商品数量
  ```

### 商品页面 (`pages/shop/shop.vue`)
- **功能**：展示特定供应商的商品列表，支持添加到购物车
- **URL参数**：`shopName` - 供应商名称
- **主要方法**：
  ```javascript
  addToCart(product)    // 添加商品到购物车
  removeFromCart(id)    // 从购物车移除商品
  updateCart()          // 更新购物车存储
  ```

### 购物车页面 (`pages/cart/cart.vue`)
- **功能**：管理购物车商品，支持数量调整、删除、结算
- **存储键**：`cart` - 购物车数据
- **主要方法**：
  ```javascript
  updateQuantity(index, change)  // 更新商品数量
  removeItem(index)             // 删除商品
  checkout()                    // 结算订单
  ```

### 订单页面 (`pages/orders/orders.vue`)
- **功能**：查看订单历史，支持重新下单、取消订单
- **存储键**：`orders` - 订单历史数据
- **主要方法**：
  ```javascript
  cancelOrder(order)    // 取消订单
  reorder(order)        // 重新下单
  toggleDetails(index)  // 切换订单详情显示
  ```

## 🔧 开发指南

### 数据模型

#### 商品数据结构
```javascript
{
  "id": "string",           // 商品ID
  "name": "string",         // 商品名称
  "price": "number",        // 商品价格
  "unit": "string",         // 计量单位
  "description": "string",  // 商品描述
  "supplier": "string",     // 供应商名称
  "count": 0               // 购物车数量
}
```

#### 订单数据结构
```javascript
{
  "id": "string",           // 订单ID
  "createTime": "string",   // 创建时间
  "status": "string",       // 订单状态
  "items": [],             // 订单商品列表
  "totalAmount": "number",  // 订单总额
  "itemCount": "number"    // 商品总数
}
```

### 存储管理

#### 本地存储键值
```javascript
// 购物车数据
uni.getStorageSync('cart')
uni.setStorageSync('cart', cartData)

// 订单历史
uni.getStorageSync('orders') 
uni.setStorageSync('orders', ordersData)
```

### 样式规范

#### 颜色主题
```scss
// 主色调
$primary-color: #667eea;
$secondary-color: #764ba2;

// 功能色
$success-color: #3cc51f;
$warning-color: #ff6b6b;
$info-color: #909399;

// 文字色
$text-primary: #333;
$text-secondary: #666;
$text-placeholder: #999;
```

#### 间距规范
```scss
// 页面边距
$page-padding: 20rpx;

// 组件间距
$component-margin: 30rpx;

// 内容内边距
$content-padding: 20rpx;
```

### 页面生命周期

```javascript
export default {
  // 页面首次加载
  onLoad(options) {
    // 获取页面参数
    // 初始化数据
  },
  
  // 页面显示时
  onShow() {
    // 更新购物车数量
    // 刷新订单状态
  },
  
  // 页面隐藏时
  onHide() {
    // 保存数据状态
  }
}
```

## 🚀 部署指南

### H5部署

#### 方法一：静态网站部署
```bash
# 1. 打包项目
右键项目 → 发行 → 网站-PC Web或手机H5

# 2. 上传至服务器
# 将 unpackage/dist/build/h5 目录上传至Web服务器
```

#### 方法二：使用Netlify
1. 将 `h5` 目录推送到GitHub
2. 在Netlify中连接GitHub仓库
3. 设置构建命令和发布目录

### 小程序部署

#### 微信小程序
```bash
# 1. 打包小程序
右键项目 → 发行 → 小程序-微信

# 2. 微信开发者工具
# 用微信开发者工具打开 unpackage/dist/build/mp-weixin
# 上传代码到微信公众平台

# 3. 提交审核
# 在微信公众平台提交审核并发布
```

### 配置说明

#### manifest.json 配置
```json
{
  "mp-weixin": {
    "appid": "你的小程序AppID",
    "setting": {
      "urlCheck": false
    }
  }
}
```

## ❓ 常见问题

### 开发问题

**Q: 项目运行时出现 "uni is not defined" 错误？**
A: 确保使用HBuilderX运行项目，不要使用其他编译工具。

**Q: 购物车数据丢失？**
A: 检查 `uni.setStorageSync()` 调用是否正确，确保数据格式正确。

**Q: 页面跳转失败？**
A: 检查 `pages.json` 中的页面路径配置是否正确。

**Q: 图片不显示？**
A: 确保图片路径以 `/static/` 开头，检查图片文件是否存在。

### 部署问题

**Q: H5版本白屏？**
A: 检查资源路径配置，确保 `manifest.json` 中的 `h5.router.base` 配置正确。

**Q: 小程序无法获取数据？**
A: 检查数据接口域名是否在小程序后台配置白名单。

### 性能优化

**Q: 如何优化首页加载速度？**
A: 
1. 使用图片懒加载
2. 分页加载商品数据
3. 优化图片大小和格式

**Q: 如何减少包大小？**
A:
1. 移除未使用的图片资源
2. 压缩JSON数据文件
3. 使用条件编译排除不需要的平台代码

## 📞 技术支持

### 相关资源
- [uni-app官方文档](https://uniapp.dcloud.io/)
- [Vue 3 官方文档](https://cn.vuejs.org/)
- [HBuilderX 使用指南](https://hx.dcloud.net.cn/)

### 开发团队
如有技术问题或建议，请联系开发团队。

---

**🎉 祝您开发愉快！** 

> 最后更新：2025-09-10  
> 版本：v1.0.0  
> 文档维护：开发团队 