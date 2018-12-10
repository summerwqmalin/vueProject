import axios from 'axios'; // 引入axios
import Cookies from 'js-cookie'; // 引入js-cookie
import storage from '@/model/storage.js'; // 引入本地存储
import router from '@/router/route.js'; // 引入路由


// 创建axios实例，强制请求为异步加载
const service = axios.create({
  timeout: 1000 * 30,
  // 允许跨域带token
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest' //请求为异步ajax请求
  }
})



// request拦截器判断请求是否带上token
service.interceptors.request.use(
  (config) => {
    //在头部请求带上token，判断如果浏览器的cookie有token就带上token，如果没有，写死token,后端判断，是否根据需要返回cide401.方便返回登录页
    config.headers['token'] = Cookies.get('token') ?
      Cookies.get('token') :
      '74c8ffe4a59da108f03aa7afc77cc24e';
    return config
  },
  (error) => {
    return Promise.reject(error)
  })



// response拦截器判断token是否失效
service.interceptors.response.use(response => {
  // 当浏览器的接口返回数据的data中code字段为401,说明token失效,那么强制返回登录页,删除cookie的token
  if (response.data && response.data.code === 401) { // 401, token失效
    Cookies.remove('token') //删除当前存储的token
    storage.remove('permission') //删除当前存储的存储的权限，做到token失效，无论怎么刷新，都跳转登录页面，删除当前权限记录，直到拿到新的登录权限
    router.push('/login') //强制返回登录页面
  }
  return response
}, error => {
  return Promise.reject(error)
})



// 封装axios
export default {
  fetch(url, params) {
    return new Promise((resolve, reject) => {
      params = JSON.stringify(params)
      service.post(url, params)
        .then(response => {
          // Api--ok请求成功
          resolve(response.data);
        })
        .catch((error) => {
          // 请求失败并打印失败原因
          console.log(error)
          reject(error)
        })
    })
  }
} 