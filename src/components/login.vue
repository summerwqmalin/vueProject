<template>
  <div id="login">
    <div class="header">
      <img src="./../assets/image/logo.png" height="70" width="278">
    </div>
    <div class="content">
      <div class="loginForm">
        <div class="loginFormContent">
          <div class="loginText">登录</div>
          <hr>
          <br>
          <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" label-width="40px" class="loginFormRules">
            <el-form-item label="账号" prop="user">
              <el-input type="text" v-model="loginForm.user" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="loginForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
              <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="footer">
      版权©归作者本人所有
    </div>
  </div>
</template>

<script>
import api from '@/api/axiosApi.js'//引入封装方法
import storage from '@/model/storage.js';// 引入自己封装的本地存储方法
export default {
  data () {
    /*定义验证表单的规则*/ 
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (/^[a-zA-Z0-9]{6,20}$/.test(value) == false ) {
        // 只可以输入英文字母数字1到10位数
        callback(new Error('6至20位的英文字母或数字组合的密码'));
      } else {
        callback();
      }
    };
    var validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else if (/^[a-zA-Z0-9_]{6,20}$/.test(value) == false ) {
        // 只可以输入英文字母数字和下划线1到10位数
        callback(new Error('请输入6至20位的英文字母、数字或下划线组合的用户名'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        pass: '',
        user: ''
      },
      loginRules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        user: [
          { validator: validateUser, trigger: 'blur' }
        ]
      }
    }
  },
  mounted(){
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 请求菜单并获取相关菜单的权限
          api.loginPermissData(this.loginForm)//this.loginForm为输入的用户名和密码
            .then(res => {
              if(res.allow){
                storage.set("permission",res);//将登录的批转情况传到本地存储
                this.$router.push("/mainpage");//登录成功后进入mainpage页面
              }else{
                storage.remove("permission");//删除登录信息
                this.$notify.error({
                  title: '错误提示',
                  message: '账号或密码错误哦！'
                });
              }
            })
        } else {
          console.log('提交错误');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="scss">
  .header {
    text-align: left;
    height:120px;
    img{
      margin-top:25px;
      margin-left:40px;
    }
  }
  .content {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height:600px;
  }
  .footer {
      /*background-color: #B3C0D1;*/
      color: #666;
      padding:20px;
      text-align: center;
  }
  .loginForm {
    height:600px;
    background: #B3C0D1;
    background-size:cover;
    display: flex;
    flex-direction: row-reverse;
    align-items:center;
  }
  .loginFormContent {
    width:300px;
    height:250px;
    background-color:rgba(255,255,255,0.5);
    padding:20px;
    border-radius:10px;
    margin:0 auto;
    margin-bottom:100px;
  }
  .loginText{
    color:#409EFF;
    font-size:20px;
  }
</style>
