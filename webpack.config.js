var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var proxyConfig = require('./proxyConfig');

module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'js/[name].[hash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '门户',
      template: './index.html',
      inject: 'body',
      filename: 'main.html',
      chunks: ["main"]
    }),
    new ExtractTextPlugin({
      filename: (getPath) => {
        return getPath('css/[name].[contenthash].css').replace('css/js', 'css');
      },
      allChunks: true
    })
  ],
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "vue-style-loader",
        use: ['css-loader', 'postcss-loader']
      })
    }, {
      test: /\.scss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        'sass-loader',
        'postcss-loader'
      ],
    }, {
      test: /\.sass$/,
      use: [
        'vue-style-loader',
        'css-loader',
        'sass-loader?indentedSyntax',
        'postcss-loader'
      ],
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
          // the "scss" and "sass" values for the lang attribute to the right configs here.
          // other preprocessors should work out of the box, no loader config like this necessary.
          'scss': [
            'vue-style-loader',
            'css-loader',
            'sass-loader',
            'postcss-loader'
          ],
          'sass': [
            'vue-style-loader',
            'css-loader',
            'sass-loader?indentedSyntax',
            'postcss-loader'
          ]
        }
        // other vue-loader options go here
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'url-loader',
      options: {
        name: '[name].[ext]?[hash]',
        outputPath: 'images',
        limit: 20000
      }
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]?[hash]',
        outputPath: 'images'
      }
    }]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    openPage: 'dist/main.html',
    overlay: true,
    proxy: proxyConfig.proxyList
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}