import {
  ADD_COUNTER,
  ADD_TO_CART
}from "./mutations-types"

export default  {
  addCart(context, payload) {
    // 1.方法一：payload新添加的用品
    /* let oldPrice = null;
    for(let item of state.cartList){
      if(item.iid = payload.iid){
        oldPrice = item;
      }
    } */
    return new Promise((resolve,reject) =>{
      // 1.方法二：
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    // 2.判断oldpayload
    if (oldProduct) { //数量+1
      context.commit(ADD_COUNTER,oldProduct)
      resolve('当前的商品数量+1')
    } else { //添加新的商品
      payload.count = 1;
      context.commit(ADD_TO_CART,payload)
      resolve('添加了新的商品')
    }
    })
  }
}