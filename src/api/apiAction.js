import apiUrl from '@/api/apiUrl.js'; //引入apiUrl
import axiosApi from '@/api/axiosApi.js'; //引入apiUrl

//管理apiURL接口文件,如果想mock数据，请把开发环境的apis注释，打开mock环境，如果想直接访问测试地址，返回真是测试数据，请把mock环境注注释，打开apis
var urlDev = "/apis/"; //开发环境
var urlQa = 'webapi/'; //生产环境
var urlmock = 'webapi/'; //mock数据
var url = ''; //定义当前url可以作为那个进行开发

// 当mock数据存在时候，则mock数据，当mock数据不存在时候判断当前环境是生产环境，进行对应的请求
if (urlmock) {
  url = urlmock
} else {
  process.env.NODE_ENV === 'production' ? url = urlQa : url = urlDev; //判断当前环境是正式环境还是开发环境，进行url更改
}

//获取不同环境下组成的接口字符窜 
var apiURL = {
  getMenuData: url + "" + apiUrl.getMenuData,
  loginPermissData: url + "" + apiUrl.loginPermission
}



// 定义不同接口的方法名
export default {
  getMenuData(params) { // 定义左边菜单栏请求接口
    return axiosApi.fetch(apiURL.getMenuData, params); // 进入定义方法,并发送请求
  },
  loginPermissData(params) { // 定义登录请求接口
    return axiosApi.fetch(apiURL.loginPermissData, params); // 进入定义方法,并发送请求
  }
}