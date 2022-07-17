import axios from 'axios'

export function request(config){
  //1. 创建config实例
  const instance = axios.create({
    baseURL:'http://123.207.32.32:8000',
    timeout:5000
  })

  // 2.axios的拦截器
  instance.interceptors.request.use(config=>{
    return config
  },err=>{
    // console.log(err)
  })

  // 发送真正的网络请求 返回的是一个promise
  return instance(config)
}