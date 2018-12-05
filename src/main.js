import Vue from 'vue'
import main from '@/main.vue'
import '@/assets/css/basic.scss';

// 引入elementUI
import elementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(elementUI);

// 引入mock数据
require('@/../mock/mockData.js')

// 引入路由
import router from '@/router/route.js'

new Vue({
	el: '#app',
	router,
	render: h => h(main)
})