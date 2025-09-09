//API配置
const API_BASE = 'https://www.ency.asia/api';  // 生产环境
// const API_BASE = 'http://localhost:8080/api';     // 本地开发环境（如需使用请取消注释）

//通用请求函数
function apiRequest(url,options) {
  const defaultOptions = {
        headers:{
          'Content-Type':'application/json',
        },
  };
  const finalOptions = { ...defaultOptions, ...options };

  return fetch(API_BASE +url,finalOptions)
      .then(response =>response.json())
      .then(data=>{
        if(data.code === 200){
          return data.data;
        }else{
           throw new Error(data.message || '请求失败');

        }
      })
      .catch(error=>{
         console.error('API请求失败:',error);
         alert('网络请求失败'+error.message);
         throw error;
      });
    

}
 //API 方法
 const API ={
  //健康检查
  health:()=>apiRequest('/health'),
  //商店相关
  getShops: () => apiRequest('/shops'),
  getShopProducts: (shopId) => apiRequest(`/shops/${shopId}/products`),

  //购物相关
  getCart:() =>apiRequest('/cart'),
  addToCart: (productId, quantity) => apiRequest('/cart/items', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity })
}),
updateCartItem: (productId, quantity) => apiRequest(`/cart/items/${productId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity })
}),
removeCartItems: (productIds) => apiRequest('/cart/items', {
    method: 'DELETE',
    body: JSON.stringify({ productIds })
}),

// 订单相关
submitOrder: (remark = '') => apiRequest('/orders', {
    method: 'POST',
    body: JSON.stringify({ remark })
})
};