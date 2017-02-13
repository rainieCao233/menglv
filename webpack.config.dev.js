var path = require('path')
var webpack = require("webpack")
// var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  // devtool: "cheap-module-eval-source-map",
  // devServer: {
  //   contentBase: "./debug",//本地服务器所加载的页面所在的目录
  //   colors: true,//终端中输出结果为彩色
  //   historyApiFallback: true,//不跳转
  //   inline: true//实时刷新
  // },
  entry:{
    app: ['webpack/hot/only-dev-server', './src/index.js']
  },

  output:{
    path: path.resolve(__dirname, ''),
    filename: "bundle.js"
  },

  resolve:{
    alias: {},
    extensions: ['', '.js', '.jsx' ,'.css', '.scss', '.ejs', '.png', '.jpg']
  },

  module:{
    loaders: [
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.jsx?$/,
				exclude: /node_modules/,
				loaders: ['react-hot','babel']
      },
      {
        test:/\.css$/,
        loader:"style-loader!css-loader"
      },
      {
        test:/.(png)|(jpg)$/,
        loader: 'url-loader?limit=10000&name=imgs/[name].[ext]'   //10k以下图片变成base64
      }
    ]
  },

  plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        title: 'index',
        filename: 'index.html',
        template:'./src/template.html',
        isdev: true
      }),
      new HtmlWebpackPlugin({
        title: '22',
        filename: '22.html',
        template:'./src/template.html',
        isdev: true
      })
    ]
}

console.log("----------development environment----------")
module.exports = config;
