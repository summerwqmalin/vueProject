/*
 *组件索引，并注册组件
 */

var asynComponent = {};
asynComponent = {
    info: resolve => require(['@/components/info.vue'], resolve),
    share: resolve => require(['@/components/share.vue'], resolve),
    edit: resolve => require(['@/components/edit.vue'], resolve),
    search: resolve => require(['@/components/search.vue'], resolve),
    other: resolve => require(['@/components/other.vue'], resolve),
};


export default asynComponent;