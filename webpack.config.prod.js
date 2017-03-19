var path = require('path')
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  devtool: 'cheap-module-source-map',//生产环境生成sourcemap
  entry: {
    app: ["./src/index.js"]   //入口js
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",  //相对path中build的相对目录
    filename: "js_[chunkhash:16].js"   //总出口js
  },

  resolve: {
    alias: {},
    extensions: ['', '.js', '.jsx' ,'.css', '.scss', '.ejs', '.png', '.jpg']
  },

  externals: {
   'react': 'React',
   'react-dom':'ReactDOM',
   'react-router':'ReactRouter'
  },

  module:{
    loaders:[
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['react', 'es2015']
				}
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader","css-loader")
      },
      {
          test:/.(png)|(jpg)$/,
          loader: 'url-loader?limit=1&name=imgs/[name].[ext]'   //不变图片
      }
    ]
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV':JSON.stringify('prod')
      }
    }),
    new uglifyJsPlugin({
      output:{
        comments: false
      },
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin("css_[contenthash:16].css"),
    new HtmlWebpackPlugin({
      title: 'index',
      filename: 'index.html',
      template:'./src/template.html',
      isdev: false
    }),
    // new HtmlWebpackPlugin({
    //   title: '22',
    //   filename: '22.html',
    //   template:'./src/template.html',
    //   isdev: false
    // })
  ]
}

console.log("----------production environment----------")
module.exports = config;
