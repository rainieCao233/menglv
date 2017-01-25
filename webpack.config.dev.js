var path = require('path')
var webpack = require("webpack")
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var config = {
  // devtool: "cheap-module-eval-source-map",
  // devServer: {
  //   contentBase: "./debug",//本地服务器所加载的页面所在的目录
  //   colors: true,//终端中输出结果为彩色
  //   historyApiFallback: true,//不跳转
  //   inline: true//实时刷新
  // },
  entry:{
    app: ['./src/index.js']
  },

  output:{
    path: path.resolve(__dirname, '/debug'),
    filename: "bundle.js"
  },

  resolve:{
    alias: {},
    extensions: ['', '.js', '.jsx' ,'.css', '.scss', '.ejs', '.png', '.jpg']
  },

  module:{
    perLoaders: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, '/debug'),
        loader: 'jshint-loader'
      }
    ],

    loaders: [
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'jsx-loader?harmony'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query:{
          presets:['es2015','react']
        }
      },
      {
        test:/\.css$/,
        loader:"style-loader!css-loader"
      },
      {
        test:/.(png)|(jpg)$/,
        loader: 'url-loader?limit=10000&name=img/[name].[ext]'   //10k以下图片变成base64
      }
    ]
  },

  jshint: {
    "esnext": true
  },

  plugins: [
    new webpack.optimize.DedupePlugin()
  ]
}

console.log("----------have fun----------")
module.exports = config;
