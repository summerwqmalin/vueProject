import * as types from './../mutation-types';
// 定义state
const state = {
	menu: []
}
// 为每哥state定义一个触动的方法
const actions = {
	addMenu(context, data) {
		context.commit(types.ADD_MENU, data)
	}
}

// 数据更改后得到getters
const getters = {
	getMenu: state => {
		return state.menu
	}
}

// 定义mutations
const mutations = {
	// 在types哪里得到每哥需要定义的方法
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