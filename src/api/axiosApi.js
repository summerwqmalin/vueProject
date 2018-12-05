// 引入axios
import axios from 'axios'
// 引入api
import apiUrl from '@/api/apiUrl.js' //引入apiUrl
// 引入js-cookie
import Cookies from 'js-cookie';
// 引入路由
import router from '@/router/route.js'


// 创建axios实例
const service = axios.create({
  timeout: 1000 * 30,
  // 允许跨域带token
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest' //请求为异步ajax请求
  }
})

// request拦截器
service.interceptors.request.use(
  (config) => {
    //在头部请求带上token，判断如果浏览器的cookie有token就带上token，如果没有，写死token
    config.headers['token'] = Cookies.get('token') ?
      Cookies.get('token') :
      '74c8ffe4a59da108f03aa7afc77cc24e';
    return config
  },
  (error) => {
    return Promise.reject(error)
  })

// response拦截器
service.interceptors.response.use(response => {
  // 当浏览器的接口返回数据的data中code字段为401,说明token失效,那么强制返回登录页,删除cookie的token
  if (response.data && response.data.code === 401) { // 401, token失效
    Cookies.remove('token')
    router.push('/login')
  }
  return response
}, error => {
  return Promise.reject(error)
})

// 封装axios
export function fetch(url, params) {
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

//管理apiURL接口文件,如果想mock数据，请把开发环境的apis注释，打开mock环境，如果想直接访问测试地址，返回真是测试数据，请把mock环境注注释，打开apis
var urlDev = "/apis/"; //开发环境
var urlQa = '../'; //生产环境
var urlmock = '../'; //mock数据
var url = ''; //定义当前url可以作为那个进行开发

// 当mock数据存在时候，则mock数据，当mock数据不存在时候判断当前环境是生产环境，进行对应的请求
if (urlmock) {
  url = urlmock
} else {
  process.env.NODE_ENV === 'production' ? url = urlQa : url = urlDev; //判断当前环境是正式环境还是开发环境，进行url更改
}

var apiURL = {
  getMenuData: url + "" + apiUrl.getMenuData,
}


// 定义不同接口的方法
export default {
  // 获取我的页面的后台数据
  getMenuData() {
    // 进入定义方法,并发送请求
    return fetch(apiURL.getMenuData);
  }
}