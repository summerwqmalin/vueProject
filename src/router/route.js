import Vue from 'vue';
import VueRouter from 'vue-router';
import componentObj from './component';

Vue.use(VueRouter);

import login from '@/components/login.vue';
import mainpage from '@/components/mainpage.vue';
import info from '@/components/info.vue';
import share from '@/components/share.vue';
// for (let key in asynComponent) {
// 	if (asynComponent.hasOwnProperty(key)) {
// 		Vue.component(key, asynComponent[key]);
// 	}
// }

//设置固定路由
const routes = [{
	path: '/login',
	component: login
}, {
	path: '/',
	component: mainpage,
	children: [{
		path: '/info',
		component: info
	}, {
		path: '/share',
		component: share
	}, ]
}, {
	path: '*',
	redirect: '/login'
}]

const router = new VueRouter({
	mode: 'hash',
	routes
})

export default router;