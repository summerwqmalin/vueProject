import Mock from 'mockjs' // 引入mockjs
import apiUrl from '@/api/apiUrl.js' //引入apiUrl

const Random = Mock.Random // Mock.Random 是一个工具类，用于生成各种随机数据


// 定义左边菜单栏返回数据
let data = [{
	"subItem": [{
		"icon": "el-icon-edit-outline",
		"title": "分享点滴1-1",
		"menuId": "1-1",
		"subItem": [{
			"icon": "el-icon-edit-outline",
			"title": "分享点滴1-1-1",
			"menuId": "1-1-1",
			"subItem": []
		}, {
			"icon": "el-icon-edit-outline",
			"title": "分享点滴1-1-2",
			"menuId": "1-1-2",
			"subItem": []
		}]
	}, {
		"icon": "el-icon-edit-outline",
		"title": "分享点滴1-2",
		"menuId": "1-2",
		"subItem": []
	}],
	"icon": "el-icon-edit-outline",
	"title": "分享点滴",
	"menuId": "1"
}, {
	"subItem": [{
		"icon": "el-icon-search",
		"title": "发现好友2-1",
		"menuId": "2-1",
		"subItem": []
	}, {
		"icon": "el-icon-search",
		"title": "发现好友2-2",
		"menuId": "2-2",
		"subItem": []
	}],
	"icon": "el-icon-search",
	"title": "发现好友",
	"menuId": "2"
}, {
	"subItem": [{
		"icon": "el-icon-menu",
		"title": "分享汇总3-1",
		"menuId": "3-1",
		"subItem": [{
			"icon": "el-icon-menu",
			"title": "分享汇总3-1-1",
			"menuId": "3-1-1",
			"subItem": []
		}, {
			"icon": "el-icon-menu",
			"title": "分享汇总3-1-2",
			"menuId": "3-1-2",
			"subItem": []
		}]
	}, {
		"icon": "el-icon-menu",
		"title": "分享汇总3-2",
		"menuId": "3-2",
		"subItem": []
	}],
	"icon": "el-icon-menu",
	"title": "分享汇总",
	"menuId": "3"
}]
// 三级菜单
// let isSuccess = Random.boolean;
// if (isSuccess) {
// 	for (let i = 0; i < 10; i++) { // 可自定义生成的个数
// 		let template = {
// 			'name': Random.ctitle(5, 10) //生成左侧菜单栏
// 		}
// 		data.push(template)
// 	}
// }


// 定义登录窗口返回数据
let loginPermissionData = {}; //定义登录窗口返回的数据，正确返回对象
let permit = true; //定义是否允许通过
if (permit) {
	loginPermissionData.allow = true; //定义通过
	loginPermissionData.user = Random.string("abcdefghijklmnopqrstuvwxyz", 6, 20); //返回用户名
} else {
	loginPermissionData.allow = false; //定义不通过
	loginPermissionData.user = ""; //用户名为空
}


Mock.mock("webapi/" + apiUrl.getMenuData, 'post', data) // 根据状态返回的左边菜单来
Mock.mock("webapi/" + apiUrl.loginPermission, 'post', loginPermissionData) // 根据状态返回的左边菜单来