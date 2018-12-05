import Mock from 'mockjs' // 引入mockjs
import apiUrl from '@/api/apiUrl.js' //引入apiUrl

const Random = Mock.Random // Mock.Random 是一个工具类，用于生成各种随机数据

let data = [] // 用于接受生成数据的数组

var isSuccess = Random.boolean;
if (isSuccess) {
	for (let i = 0; i < 10; i++) { // 可自定义生成的个数
		let template = {
			'menu': Random.ctitle(5, 10) //生成左侧菜单栏
		}
		data.push(template)
	}
}
Mock.mock("../" + apiUrl.getMenuData, 'post', data) // 根据数据模板生成模拟数据