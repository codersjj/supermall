import axios from 'axios'

export function request(config) {
  // 1. 创建 axios 的实例
  const axiosInstance = new axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  // 2. axios 的拦截器
  // 2.1 请求拦截（包括请求成功和请求失败，分别对应 use() 的第 1、2 个函数参数）
  axiosInstance.interceptors.request.use(config => {
    return config
  }, err => {

  })
  // 2.2 响应拦截（包括响应成功和响应失败，分别对应 use() 的第 1、2 个函数参数）
  axiosInstance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  // 3. 发送真正的网络请求
  return axiosInstance(config)
}