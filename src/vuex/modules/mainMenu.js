import * as types from './../mutation-types';
import api from '@/api/apiAction.js';
import componentObj from '@/router/component.js';//引入当前所有模块
import Vue from 'vue';//引入vue方便对router进行实例化
import Cookies from 'js-cookie'; // 引入js-cookie
import router, {
	DynamicRoutes
} from '@/router/route.js';//引入路由，并按需引入当前的路由

// 定义所有路由
let asynComponent = componentObj;
let allRouter = [];
for (let key in asynComponent) {
	if (asynComponent.hasOwnProperty(key)) {
		let allRouterObj = {}
		Vue.component(key, asynComponent[key]);
		allRouterObj.path = "/" + key;
		allRouterObj.component = asynComponent[key];
		allRouter.push(allRouterObj)
	}
}


// 定义state
const state = {
	menu: []
}
// 为每个state定义一个触动的方法
const actions = {
	addMenu:(context) => {
		api.getMenuData()
			.then(res => {
                // 比较两个权限数组，确定需要渲染那个权限
				context.commit(types.ADD_MENU, res);
				/*  动态添加路由 */
				DynamicRoutes[0].children = compareMenu(res, allRouter);
				router.addRoutes(DynamicRoutes);
				router.push("/share");
			});
	},
	userToken(context, params){
		api.loginPermissData(params)
			.then(res => {
				if(res.state != "401" ){//返回状态不是401时候，即正常登录
				  if(res.token !=""){//当token不是空时候，正常跳转
				    Cookies.set("token",res.token);//将登录的批转情况传到本地存储
					router.push("/");
				  }else{//token是空的时候，说明账号错误
				    Cookies.remove("token");//删除登录信息
				    this.$notify.error({
				      title: '错误提示',
				      message: '账号或密码错误哦！'
				    });
				  }  
				}else{//返回401时候，说明登录过期，需要重新登录
				  Cookies.remove("token");//删除登录信息
				  this.$notify.error({
				    title: '过期提示',
				    message: '登录过期，请重新输入！'
				  });
				}
			});
	}
}

//对比后端权限，以及前端模块，渲染最真实的左边菜单栏
function compareMenu(userRouter = [], allRouter = []) {
	var realRoutes = [];
  	allRouter.forEach((v, i) => {
		userRouter.forEach((item, index) => {
			if (item.menuId === v.path) {
				realRoutes.push(v)
			}
		})
  	})
  	return realRoutes
}
// 数据更改后得到getters
const getters = {
	getMenu: state => {
		return state.menu
	}
}

// 定义mutations
const mutations = {
	// 在types哪里得到每个需要定义的方法
	[types.ADD_MENU](state, data) {
		state.menu = data;
	}
}

export default {
	state,
	actions,
	getters,
	mutations
}
