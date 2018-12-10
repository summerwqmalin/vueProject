import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './../vuex/store.js';
import Cookies from 'js-cookie'; // 引入js-cookie

Vue.use(VueRouter);

import login from '@/components/login.vue';
import mainpage from '@/components/mainpage.vue';


//设置固定路由
const routes = [{
	path: '/login',
	component: login
},{
	path: '/',
	component: mainpage,
	meta: {
		requiresAuth: true //路由拦截是否需要检测
	},
	children: []
}, {
	path: '*',
	redirect: '/login'
}];

const router = new VueRouter({
	mode: 'hash',
	routes
});

/* 准备动态添加的路由 */
export const DynamicRoutes = [{
	path: '/',
	component: mainpage,
	meta: {
		requiresAuth: true //路由拦截是否需要检测
	},
	children: []
}, {
	path: '*',
	redirect: '/login'
}];

// 每次路由跳转需要验证
router.beforeEach((to, from, next) => {
	if (!Cookies.get('token')) { //当没有token的时候
		if (
			to.matched.length > 0 &&
			!to.matched.some(record => record.meta.requiresAuth) //验证是否需要检测，如果不需要则往下走，如果需要则拦截到登录页
		) {
			next()
		} else {
			next({
				path: '/login'
			})
		}
	} else { //当有token的时候，判断，是否存在菜单栏，如果存在，往下走，如果不存在，则重新触发请求，请求菜单栏
		if (!store.state.mainMenu.menu) {
			store.dispatch('addMenu').then(() => {
				next({
					path: to.path
				})
			})
		} else {
			if (to.path !== '/login') {
				next()
			} else {
				next(from.fullPath)
			}
		}
	}
})
export default router;