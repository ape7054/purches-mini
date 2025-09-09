# 📱 采购订单管理系统

> 一个专为餐饮业设计的智能采购订单管理平台，支持多供应商分类采购、自动订单生成和一键发送功能。

[![uni-app](https://img.shields.io/badge/uni--app-3.0.0-brightgreen.svg)](https://uniapp.dcloud.io/)
[![Vue](https://img.shields.io/badge/Vue-3.3.4-blue.svg)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4.5-purple.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## ✨ 项目特色

- 🎯 **专业定制** - 专为餐饮采购场景设计，支持1-82号产品管理
- 🏪 **多供应商** - 支持10+供应商分类管理，自动按供应商分组订单
- 📋 **智能订单** - 自动生成标准化订单格式，一键复制发送给供应商
- 📱 **跨平台** - 基于uni-app，支持H5、小程序、App多端部署
- 💾 **本地存储** - 支持离线使用，数据本地持久化存储
- 🎨 **现代UI** - 简洁美观的界面设计，优秀的用户体验

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖

```bash
# 克隆项目
git clone [your-repo-url]
cd purches-mini

# 安装依赖
npm install
```

### 开发调试

```bash
# 启动开发服务器
npm run dev

# 浏览器访问
# http://localhost:3000
```

### 生产构建

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📦 项目结构

```
purches-mini/
├── 📁 src/                    # 源代码目录
│   ├── 📁 pages/             # uni-app页面组件
│   │   ├── cart/             # 购物车页面
│   │   ├── detail/           # 订单详情页面  
│   │   ├── index/            # 首页
│   │   ├── order/            # 下单页面
│   │   ├── orders/           # 订单管理页面
│   │   └── shop/             # 商店页面
│   ├── 📁 components/        # 公共组件
│   ├── 📁 utils/             # 工具函数
│   │   └── api.js            # API接口封装
│   ├── 📁 stores/            # 状态管理 (Pinia)
│   ├── 📁 constants/         # 常量定义
│   │   ├── api.js            # API相关常量
│   │   └── suppliers.js      # 供应商常量
│   └── 📁 types/             # TypeScript类型定义
├── 📁 web/                   # HTML静态页面 (演示版本)
├── 📁 static/                # 静态资源
│   ├── data.json             # 供应商商品数据
│   ├── products.json         # 完整产品数据
│   └── 图片资源...
├── 📄 App.vue               # 应用主组件
├── 📄 main.js               # 应用入口
├── 📄 pages.json            # 页面配置
├── 📄 package.json          # 项目依赖
├── 📄 vite.config.js        # 构建配置
└── 📄 .gitignore            # Git忽略文件
```

## 🎯 核心功能

### 🛒 商品管理
- **分类浏览** - 按供应商分类展示商品
- **产品目录** - 支持1-82号产品完整目录
- **搜索功能** - 按商品名称、编号、供应商搜索
- **规格管理** - 详细的商品规格和单位管理

### 🛍️ 购物车系统
- **实时同步** - 跨页面购物车数据同步
- **数量调整** - 灵活的商品数量增减控制
- **批量操作** - 支持批量删除和清空功能
- **持久化** - 本地存储，关闭应用数据不丢失

### 📋 订单管理
- **自动分组** - 按供应商自动分组订单
- **格式化** - 生成标准化订单格式
- **价格调整** - 支持最终结算价格修改
- **一键复制** - 复制订单内容直接发送给供应商

### 💬 供应商沟通
- **订单格式** - 标准化的订单内容格式
- **备注功能** - 支持添加自定义备注信息
- **发送提示** - 引导用户发送订单给供应商

## 🏪 支持的供应商

系统预设支持以下供应商分类：

| 供应商 | 类型 | 商品数量 |
|--------|------|----------|
| 快驴 | 调料食材 | 42种 |
| 华兴街14号 | 粮油蛋类 | 3种 |
| 肖红梅 | 蔬菜类 | 21种 |
| 文武双全大母指 | 猪肉类 | 8种 |
| A12号豆腐档 | 豆制品 | 2种 |
| F35 | 水产类 | 3种 |
| D30 | 禽肉类 | 1种 |
| D129 | 牛肉类 | 1种 |
| 淡水锦龙冻品 | 冻品类 | 2种 |
| 易订货 | 腊制品 | 1种 |

## 🔧 技术栈

### 前端框架
- **uni-app 3.0** - 跨平台应用开发框架
- **Vue 3.3** - 渐进式JavaScript框架
- **Vite 4.4** - 新一代前端构建工具

### 开发工具
- **JavaScript ES6+** - 现代JavaScript语法
- **CSS3** - 样式和动画
- **uni-app API** - 跨平台接口调用

### 状态管理
- **LocalStorage** - 本地数据持久化
- **Vuex/Pinia** - 全局状态管理 (规划中)

## 🌐 双架构设计

项目采用独特的双架构设计，满足不同场景需求：

### Vue组件版本 (`src/pages/`)
- ✅ **主要开发版本** - 现代化组件开发
- ✅ **跨平台支持** - 支持H5、小程序、App
- ✅ **完整功能** - 所有业务功能完整实现
- ✅ **易于维护** - 组件化架构，便于扩展

### HTML静态版本 (`web/`)
- ✅ **演示原型** - 快速功能演示和验证
- ✅ **独立部署** - 无需构建环境，直接部署
- ✅ **学习参考** - 清晰的代码结构，便于学习
- ✅ **备用方案** - 特殊场景下的备选方案

## 📱 使用说明

### 基本流程
1. **选择供应商** - 从首页选择需要采购的供应商
2. **添加商品** - 浏览商品列表，添加需要的商品到购物车
3. **管理购物车** - 调整商品数量，确认采购清单
4. **提交订单** - 确认无误后提交订单
5. **查看订单** - 在订单页面查看按供应商分组的订单
6. **复制发送** - 一键复制订单内容，发送给对应供应商

### 订单格式示例
```
供应商：F35

牛蛙杀好处理干净去掉内脏和眼睛，去掉爪子，50 斤

草鱼切块，尽量小块一点，一指宽， 10 斤

鲫鱼杀好处理干净 去掉内脏，5-7 两每条的（8两的太重了），10 条

明天早上 8 点前送到，谢谢！

最终结算：¥xxx.xx
```

## 🚀 部署指南

### H5部署
```bash
# 构建H5版本
npm run build

# 将dist目录部署到Web服务器
cp -r dist/* /var/www/html/
```

### 静态HTML部署
```bash
# 直接部署web目录
cp -r web/* /var/www/html/

# 或使用简单HTTP服务器
cd web && python -m http.server 8000
```

## 🔌 API接口

系统提供完整的RESTful API接口：

### 商品相关
- `GET /api/products` - 获取所有商品
- `GET /api/products/search?q=keyword` - 搜索商品
- `GET /api/products?supplier=name` - 按供应商获取商品

### 购物车相关
- `GET /api/cart` - 获取购物车
- `POST /api/cart/items` - 添加商品到购物车
- `PUT /api/cart/items/:id` - 更新商品数量
- `DELETE /api/cart/items` - 删除商品

### 订单相关
- `POST /api/orders` - 创建订单
- `GET /api/orders` - 获取订单列表
- `GET /api/orders/:id` - 获取订单详情

详细API文档请参考 `src/utils/api.js`

## 🛠️ 开发指南

### 添加新供应商
1. 在 `src/constants/suppliers.js` 中添加供应商信息
2. 在 `static/data.json` 中添加商品数据
3. 更新相关页面的供应商显示逻辑

### 添加新商品
1. 在 `static/products.json` 中添加商品信息
2. 确保商品包含完整的字段信息
3. 更新供应商分类数据

### 自定义样式
- 全局样式：`uni.scss`
- 组件样式：各组件的 `<style>` 部分
- 主题配置：`src/constants/` 目录下的配置文件

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

### 代码规范
- 使用 ES6+ 语法
- 组件命名采用 PascalCase
- 函数命名采用 camelCase
- 添加必要的注释

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 支持与反馈

- 🐛 **Bug报告** - 请在 [Issues](../../issues) 中提交
- 💡 **功能建议** - 欢迎在 [Issues](../../issues) 中讨论
- 📧 **联系我们** - [your-email@example.com](mailto:your-email@example.com)

## 🙏 致谢

感谢以下开源项目：

- [uni-app](https://uniapp.dcloud.io/) - 跨平台应用开发框架
- [Vue.js](https://vuejs.org/) - 渐进式JavaScript框架
- [Vite](https://vitejs.dev/) - 新一代前端构建工具

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给一个星标支持！⭐**

Made with ❤️ by [Your Name]

</div> 