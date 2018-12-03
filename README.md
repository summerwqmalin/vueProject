一、简单安装脚手架

1.使用之前需要安装node，官网直接下载一路安装即可；

2.全局安装vue脚手架，在npm，运行npm install --global vue-cli；

3.在当前目录下运行vue init webpack-simple 你的项目名字，即可简单开始一个vue脚手架项目；

二、简单了解webpack-simple的安装依赖包

1.package.json

1.1 webpack和webpack-dev-sever模块

引入webpack模块对项目进行处理打包，webpack-dev-server本地起服务器，进行本地开发，webpack-dev-server是基于webpack进行开发。

1.2 webpack对js处理引用的babel-loader，babel-loader的核心代码是babel-core，可以将es6语法转换成es5语法，可使用babel-preset-env将基于你的实际浏览器及运行环境，自动的确定babel插件及polyfills，转译ES2015及此版本以上的语言，babel-preset-stage-3来规范当前代码书写。

