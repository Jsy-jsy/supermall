import Vue from "vue";
import Vuex from "vuex";

import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

// 1.安装插件
Vue.use(Vuex);

// 2.创建Store对象
const state  = {
  cartList: []
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})
console.log(store);

// 3.挂载Vue实例
export default store
