import Vue from 'vue'
import Vuex from 'vuex'
import mainMenu from './modules/mainMenu.js'

Vue.use(Vuex)
// 引入不同的store模块
export default new Vuex.Store({
	modules: {
		mainMenu: mainMenu
	}
})