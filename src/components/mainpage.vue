<template>
  <div id="mainpage">
    mainpage
  </div>
</template>

<script>
import api from '@/api/axiosApi.js'//引入封装方法
import storage from '@/model/storage.js';// 引入自己封装的本地存储方法
export default {
  data () {
    return {
    }
  },
  mounted(){
  	let permission = storage.get("permission");
  	if(permission.allow){
  		// 请求菜单具体信息
  		api.loginPermissData()
  		  .then(res => {
  		    console.log(res)
  		    console.log()

  		  })
  	}else{
  		this.$alert('请求权限接口出错！', '温馨提示', {
  		    confirmButtonText: '确定',
  		    callback: action => {
  		      this.$router.push("/login")
  		    }
  		});
  	}
  }
}
</script>

<style lang="scss">

</style>