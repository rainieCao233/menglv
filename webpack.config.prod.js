var path = require('path')
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var config = {
  devtool: 'cheap-source-map',
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
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'jsx-loader?harmony'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query:{
          presets:['react']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader","css-loader")
      },
      {
          test:/.(png)|(jpg)$/,
          loader: 'url-loader?limit=10000&name=img/[name].[ext]'   //10k以下图片变成base64
      }
    ]
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV':JSON.stringify('production')
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
    new ExtractTextPlugin("css_[contenthash:16].css")
  ]
}

console.log("----------good luck----------")
module.exports = config;
