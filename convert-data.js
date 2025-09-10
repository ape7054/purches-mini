const fs = require('fs');
const path = require('path');

/**
 * 数据转换脚本 - 将products.json转换为uni-app格式的data.json
 * 支持多种数据源和错误处理
 */

// 配置文件路径
const CONFIG = {
  INPUT_FILE: './static/products.json',
  OUTPUT_FILE: './static/data.json',
  UNIAPP_OUTPUT: './uniapp/static/data.json',
  BACKUP_DIR: './backups'
};

// 创建备份目录
function ensureBackupDir() {
  if (!fs.existsSync(CONFIG.BACKUP_DIR)) {
    fs.mkdirSync(CONFIG.BACKUP_DIR, { recursive: true });
  }
}

// 备份现有文件
function backupExistingFile(filePath) {
  if (fs.existsSync(filePath)) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(CONFIG.BACKUP_DIR, `data-${timestamp}.json`);
    fs.copyFileSync(filePath, backupPath);
    console.log(`📦 已备份现有文件到: ${backupPath}`);
  }
}

// 验证产品数据结构
function validateProduct(product, index) {
  const required = ['id', 'name', 'price', 'unit', 'supplier'];
  const missing = required.filter(field => !product[field]);
  
  if (missing.length > 0) {
    console.warn(`⚠️  产品 ${index + 1} 缺少字段: ${missing.join(', ')}`);
    return false;
  }
  return true;
}

// 主要转换逻辑
function convertData() {
  try {
    console.log('🚀 开始数据转换...\n');

    // 检查输入文件
    if (!fs.existsSync(CONFIG.INPUT_FILE)) {
      throw new Error(`输入文件不存在: ${CONFIG.INPUT_FILE}`);
    }

    // 读取和解析数据
    console.log(`📖 读取文件: ${CONFIG.INPUT_FILE}`);
    const rawData = fs.readFileSync(CONFIG.INPUT_FILE, 'utf8');
    const products = JSON.parse(rawData);

    // 验证数据格式
    if (!Array.isArray(products)) {
      throw new Error('products.json 应该包含一个产品数组');
    }

    if (products.length === 0) {
      throw new Error('products.json 中没有产品数据');
    }

    // 数据验证和清理
    const validProducts = products.filter((product, index) => 
      validateProduct(product, index)
    );

    if (validProducts.length !== products.length) {
      console.warn(`⚠️  跳过了 ${products.length - validProducts.length} 个无效产品\n`);
    }

    // 按供应商分组
    console.log('🔄 按供应商分组...');
    const groupedBySupplier = {};
    const supplierStats = {};

    validProducts.forEach(product => {
      const supplier = product.supplier;
      
      if (!groupedBySupplier[supplier]) {
        groupedBySupplier[supplier] = [];
        supplierStats[supplier] = 0;
      }
      
      // 为uni-app添加count字段，保持所有原有字段
      groupedBySupplier[supplier].push({
        ...product,
        count: 0
      });
      
      supplierStats[supplier]++;
    });

    // 备份现有文件
    ensureBackupDir();
    backupExistingFile(CONFIG.OUTPUT_FILE);
    if (fs.existsSync(CONFIG.UNIAPP_OUTPUT)) {
      backupExistingFile(CONFIG.UNIAPP_OUTPUT);
    }

    // 写入输出文件
    const outputData = JSON.stringify(groupedBySupplier, null, 2);
    
    // 写入根目录static
    fs.writeFileSync(CONFIG.OUTPUT_FILE, outputData);
    console.log(`✅ 已写入: ${CONFIG.OUTPUT_FILE}`);
    
    // 写入uniapp项目目录
    if (fs.existsSync('./uniapp/static')) {
      fs.writeFileSync(CONFIG.UNIAPP_OUTPUT, outputData);
      console.log(`✅ 已写入: ${CONFIG.UNIAPP_OUTPUT}`);
    }

    // 输出统计信息
    console.log('\n📊 转换统计:');
    console.log(`   📦 总产品数: ${validProducts.length}`);
    console.log(`   🏪 供应商数: ${Object.keys(groupedBySupplier).length}`);
    console.log('\n🏪 供应商详情:');
    
    Object.entries(supplierStats)
      .sort(([,a], [,b]) => b - a) // 按产品数量降序排序
      .forEach(([supplier, count]) => {
        console.log(`   • ${supplier}: ${count} 个产品`);
      });

    console.log('\n🎉 数据转换完成!');
    
  } catch (error) {
    console.error('\n❌ 转换失败:', error.message);
    process.exit(1);
  }
}

// 命令行参数处理
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
📋 数据转换工具

用法: node convert-data.js [选项]

选项:
  --help, -h     显示帮助信息
  --backup       仅创建备份，不转换
  --check        检查数据完整性，不转换

示例:
  node convert-data.js           # 正常转换
  node convert-data.js --check   # 仅检查数据
    `);
    process.exit(0);
  }
  
  if (args.includes('--backup')) {
    ensureBackupDir();
    backupExistingFile(CONFIG.OUTPUT_FILE);
    console.log('✅ 备份完成');
    process.exit(0);
  }
  
  if (args.includes('--check')) {
    // 仅检查数据，不转换
    try {
      const products = JSON.parse(fs.readFileSync(CONFIG.INPUT_FILE, 'utf8'));
      const validCount = products.filter((p, i) => validateProduct(p, i)).length;
      console.log(`✅ 数据检查完成: ${validCount}/${products.length} 个有效产品`);
    } catch (error) {
      console.error('❌ 数据检查失败:', error.message);
      process.exit(1);
    }
    process.exit(0);
  }
  
  convertData();
}

