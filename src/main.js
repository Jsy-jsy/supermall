import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"
import toast from "../src/components/common/toast/index"
import FastClick from 'fastclick'
import VueLazyLoad from "vue-lazyload"

Vue.config.productionTip = false

//添加事件总线 给$bus创建原型 Vue实例
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)
// 解决移动端300ms的延迟
FastClick.attach(document.body)
// 使用懒加载的插件
Vue.use(VueLazyLoad)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')

