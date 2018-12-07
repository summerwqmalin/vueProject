/*
 *组件索引，并注册组件
 */

var asynComponent = {};
asynComponent = {
    login: resolve => require(['@/components/login.vue'], resolve),
    mainpage: resolve => require(['@/components/mainpage.vue'], resolve),
    info: resolve => require(['@/components/info.vue'], resolve),
    share: resolve => require(['@/components/share.vue'], resolve)
};


export default asynComponent;