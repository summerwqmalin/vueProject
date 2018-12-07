<template>
  <div id="mainpage">
    <el-container>
      <el-header>
      	<el-row>
      	  <el-col :span="21"><img src="./../assets/image/logo.png" height="28" width="111"></el-col>
      	  <el-col :span="3" class="loginOut"><span @click="loginOut()"><span class="el-icon-back"></span> 登出</span></el-col>
      	</el-row>
      </el-header>
      <el-container>
        <el-aside>
        	<el-menu default-active="1-2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" v-for="(item,key) in menu" :key="key">
        	  <el-submenu  v-if="item.subItem.length >0" :index="item.menuId">
        	    <template slot="title">
        	      <i :class="item.icon"></i>
        	      <span slot="title">{{item.title}}</span>
        	    </template>
        	    <div v-for="(item,key) in item.subItem">
        	    	<el-submenu :index="item.menuId" v-if="item.subItem.length >0" >
        	    	  <span slot="title">{{item.title}}</span>
        	    	  <el-menu-item :index="item.menuId" v-for="(item,key) in item.subItem" :key="key">{{item.title}}</el-menu-item>
        	    	</el-submenu>
        	    	<el-menu-item-group v-else :index="item.menuId">
        	    	  <el-menu-item :index="item.menuId">{{item.title}}</el-menu-item>
        	    	</el-menu-item-group>
        	    </div>
        	  </el-submenu>
        	  <el-menu-item v-else :index="item.menuId">
        	    <i :class="item.icon"></i>
        	    <span slot="title">{{item.title}}</span>
        	  </el-menu-item>
        	</el-menu>
        	<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        	  <el-radio-button :label="false">展开</el-radio-button>
        	  <el-radio-button :label="true">收起</el-radio-button>
        	</el-radio-group>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import api from '@/api/axiosApi.js'//引入封装方法
import storage from '@/model/storage.js';// 引入自己封装的本地存储方法
import {mapState,mapActions} from "vuex";//引入vuex中action、mapState所有事件
export default {
  data () {
    return {
    	isCollapse: true,
    }
  },
  computed: {//用来实时追踪vuex数据的变化，可以直接绑定到视图中去
    ...mapState({
      menu:state => state.mainMenu.menu
    })
  },

  mounted(){
  	let permission = storage.get("permission");
  	if(permission){//本地存储存在权限，那么正常判断是否有权限，如果没有，提示请先登录
  		if(permission.allow){
  			// 请求菜单具体信息
  			api.getMenuData(permission.user)
  			  .then(res => {
            // 将数据存入store
            this.addMenu(res)
  			  })
  		}else{
  			this.$alert('无访问权限！', '温馨提示', {
  			    confirmButtonText: '确定',
  			    callback: action => {
  			      this.$router.push("/login");
  			      storage.remove('permission');
  			    }
  			});
  		}
  	}else{
  		this.$alert('请先登录！', '温馨提示', {
  		    confirmButtonText: '确定',
  		    callback: action => {
  		      this.$router.push("/login");
  		      storage.remove('permission');
  		    }
  		});
  	}
  },
  methods: {
    ...mapActions([
      'addMenu'
    ]),
    loginOut() {
    	this.$router.push("/login");
    	storage.remove('permission');
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="scss">
#mainpage{
	background-color: #E9EEF3;
	color: #333;
	min-height:100vh;
}
.el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: left;
    line-height: 60px;
    img{
    	margin-top:16px;
    	margin-left:20px;
    }
    .loginOut {
    	text-align:right;
    	line-height:60px;
    	text-align: right;
    	color:#E9EEF3;
 		:hover {
			cursor:pointer;
			color:#666;
 		}
    }
}
  
.el-aside {

}
  
.el-main {
}

</style>