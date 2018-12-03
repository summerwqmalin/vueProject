一、简单安装脚手架

1.使用之前需要安装node，官网直接下载一路安装即可；

2.全局安装vue脚手架，在npm，运行npm install --global vue-cli；

3.在当前目录下运行vue init webpack-simple 你的项目名字，即可简单开始一个vue脚手架项目；

二、简单了解webpack-simple的安装依赖包

1.package.json；

1.1 webpack和webpack-dev-sever模块；

引入webpack模块对项目进行处理打包，webpack-dev-server本地起服务器，进行本地开发，webpack-dev-server是基于webpack进行开发；

1.2 webpack对js处理引用的babel-loader，babel-loader的核心代码是babel-core，可以将es6语法转换成es5语法，可使用babel-preset-env将基于你的实际浏览器及运行环境，自动的确定babel插件及polyfills，转译ES2015及此版本以上的语言，env就是最新的版本，babel-preset-stage-3是标准形成的阶段版本(只需要记住bable是用来处理你的js语言的，可以将es6转化成es5，适应你当前浏览器环境，bable-loader是供webpack处理bable依赖的)；

1.3 cross-env是用来兼容不同开发环境运行npm的script标签的；

1.4 css-loader是用来处理css文件的；

1.5 file-loader是用来处理文件的；

1.6 node-sass、sass-loader是用来处理sass文件，也就是css预处理；

1.7 vue-loader是基于style-loader，主要用来处理在样式文件进行渲染前处理，vue-template-compiler是vue在渲染前，把字符窜template成得到render函数；

1.8browserslist是设置浏览器兼容性的

1.9npm script标签中npm run dev 代替执行cross-env NODE_ENV=development webpack-dev-server --open --hot命令语句，当当前环境是development的时候，启动webpack-dev-server 并开启热更新，方便开发

2.2npm script标签中npm run build 代替执行cross-env NODE_ENV=production webpack --progress --hide-modules命令语句，当当前环境是上线环境是，开启使用webpack处理文件，并打包成，隐藏打包的文件。

