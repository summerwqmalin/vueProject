一、简单安装脚手架

1.使用之前需要安装node，官网直接下载一路安装即可；

2.全局安装vue脚手架，在npm，运行npm install --global vue-cli；

3.在当前目录下运行vue init webpack-simple 你的项目名字，即可简单开始一个vue脚手架项目；



二、简单了解webpack-simple的安装依赖包

1.package.json

1.1 webpack和webpack-dev-sever模块,引入webpack模块对项目进行处理打包，webpack-dev-server本地起服务器，进行本地开发，webpack-dev-server是基于webpack进行开发；

1.2 webpack对js处理引用的babel-loader，babel-loader的核心代码是babel-core，可以将es6语法转换成es5语法，可使用babel-preset-env将基于你的实际浏览器及运行环境，自动的确定babel插件及polyfills，转译ES2015及此版本以上的语言，env就是最新的版本，babel-preset-stage-3是标准形成的阶段版本(只需要记住bable是用来处理你的js语言的，可以将es6转化成es5，适应你当前浏览器环境，bable-loader是供webpack处理bable依赖的)；

1.3 cross-env是用来兼容不同开发环境运行npm的script标签的；

1.4 css-loader是用来处理css文件的；

1.5 file-loader是用来处理文件的；

1.6 node-sass、sass-loader是用来处理sass文件，也就是css预处理；

1.7 vue-loader是基于style-loader，主要用来处理在样式文件进行渲染前处理，vue-template-compiler是vue在渲染前，把字符窜template成得到render函数；

1.8 browserslist是设置浏览器兼容性的

1.9 npm script标签中npm run dev 代替执行cross-env NODE_ENV=development webpack-dev-server --open --hot命令语句，当当前环境是development的时候，启动webpack-dev-server 并开启热更新，方便开发

1.10npm script标签中npm run build 代替执行cross-env NODE_ENV=production webpack --progress --hide-modules命令语句，当当前环境是上线环境是，开启使用webpack处理文件，并打包成，隐藏打包的文件。

2 webpack.config.js

2.1 配置wepack文件，引入路径和webpack。var path = require('path');var webpack = require('webpack');

2.2 module.exports 输出文件webpack模块；

2.3 输出模块里面设置入口文件，entry: './src/main.js'；

2.4 输出模块设置输出文件入口；

2.5 输出模块中的modul设置各类loader处理各类文件；

2.6 resolve 中的alias 可以方面管理各个模块的参数；

2.7 devServer 设置webpack-dev-server的参数；

2.8 devtool 主要设置打包文件使用何种模式连接彼此，调试环境的时候使用#eval-source-map模式，直接在打包文件后面连接，生产环境的时候，使用#source-map方便服务器调试；



三、为了满足项目开发，添加响应插件

1.添加url-loader插件；url-loader插件相对于file-loader文件，可以针对特定内存的图片进行图片转base64处理，减少请求个数，但是内存会适量增大，本项目中针对20k一下的图片均采用base64方式嵌入，超过20k的使用图片请求的折中方法。使用file-laoder处理eot|svg|ttf|woff|woff2等文件；

2.添加html-webpack-plugin插件，他可以针对webpack入口文件，根据模板，生成一个新的html，还可以指定引入指定的入口文件，尤其当入口文件以hash值变化的时候，可以自动引入不同hash值的文件，以方便了每次上线更新，客户端无需手动去缓存；

3.添加rimraf，每次打包之前，删除原来打包的文件，添加"clear": "rimraf dist"的npm script标签；


