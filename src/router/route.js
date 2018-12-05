import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import login from '@/components/login.vue';
import mainpage from '@/components/mainpage.vue';

const routes = [{
	path: '/login',
	component: login
}, {
	path: '/mainpage',
	component: mainpage
}, {
	path: '*',
	redirect: '/login'
}]

const router = new VueRouter({
	mode: 'hash',
	routes
})

export default router;