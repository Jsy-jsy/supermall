import Vue from "vue"
import Toast from "./Toast"

const obj = {}

// install函数在执行的过程中 会自动将vue传过来
obj.install = function (Vue){
  /* // Vue.extend()

  document.body.appendChild(Toast.$el) */
  //1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  // 2.new的方式 根据组件构造器 可以创建出来一个组件对象
  const toast = new toastContrustor()

  // 3.将组件对象手动的挂载到某个元素上进行使用
  toast.$mount(document.createElement('div'))

  // 4.toast.$el对应的div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj