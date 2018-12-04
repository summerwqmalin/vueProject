// 引入axios
import axios from 'axios'
// 引入api
import apiUrl from '@/api/apiUrl.js' //引入apiUrl

// 封装axios
export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    params = JSON.stringify(params)
    axios.post(url, params)
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
var urlmock = "../"; //mock数据
var url = ''; //定义当前url可以作为那个进行开发

// 当mock数据存在时候，则mock数据，当mock数据不存在时候判断当前环境是生产环境，进行对应的请求
if (urlmock) {
  url = urlmock
} else {
  process.env.NODE_ENV === 'production' ? url = urlQa : url = urlDev; //判断当前环境是正式环境还是开发环境，进行url更改
}

var apiURL = {
  getFunData: url + "" + apiUrl.getfunData,
}
// 定义不同接口的方法
export default {
  // 获取我的页面的后台数据
  getFunDataFun() {
    // 进入定义方法,并发送请求
    return fetch(apiURL.getFunData);
  }
}