const fs = require('fs');

// 读取products.json
const products = JSON.parse(fs.readFileSync('./static/products.json', 'utf8'));

// 按供应商分组
const groupedBySupplier = {};

products.forEach(product => {
  const supplier = product.supplier;
  
  if (!groupedBySupplier[supplier]) {
    groupedBySupplier[supplier] = [];
  }
  
  // 为uni-app添加count字段，保持所有原有字段
  groupedBySupplier[supplier].push({
    ...product,
    count: 0
  });
});

// 写入新的data.json
fs.writeFileSync('./static/data.json', JSON.stringify(groupedBySupplier, null, 2));

console.log('✅ 数据同步完成!');
console.log('📊 供应商统计:');
Object.keys(groupedBySupplier).forEach(supplier => {
  console.log(`   ${supplier}: ${groupedBySupplier[supplier].length}个产品`);
});
console.log(`📦 总产品数: ${products.length}`);

