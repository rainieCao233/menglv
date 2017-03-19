var gulp = require('gulp');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var WebpackDevServer = require( 'webpack-dev-server' );
var spritesmith = require('gulp.spritesmith');
var md5 = require("gulp-md5");
var del = require('del');
var dateFormat = require('dateformat');

var serverApp = require("./node/server/server")

gulp.task('sprite', function () {
  var day = dateFormat(new Date(),"yyyymmdd_hh_MM_ss");
  del([
    './src/imgs/sprite*.png',
    //'!dist/mobile/deploy.json'// 我们不希望删掉这个文件，所以我们取反这个匹配模式
  ]);
  return gulp.src('./src/imgs/sprite/*.png')//需要合并的图片地址
      .pipe(spritesmith({
          imgName: 'imgs/sprite'+day+'.png',//保存合并后图片的地址
          cssName: 'sprite.css',//保存合并后对于css样式的地址
          padding:5,//合并时两个图片的间距
          algorithm: 'binary-tree',//Algorithm 有四个可选值分别为top-down、left-right、diagonal、alt-diagonal、binary-tree, 对应不同的拼接形式
          cssTemplate:"./src/cssTemplate.css"//icon的css模板
      }))
      .pipe(gulp.dest('./src/'))
});

gulp.task('apiserver',function(){
  var serverPort = 9092;
    var server = serverApp.listen(serverPort,function(){
      var host = server.address().address;
      var port = server.address().port;

      setTimeout(function(){
        console.log('api server start at:'+host+":"+port);
      },6000)
    })
})

gulp.task('debug', [], function() {
  var port = 9090;
  var config = require('./webpack.config.dev.js');

  config.entry.app.unshift('webpack-dev-server/client?http://0.0.0.0:'+port+"")
  var compiler = webpack(config);

  var webpackServer = new WebpackDevServer(compiler, {
      contentBase: './debug',
      historyApiFallback: true,
      publicPath: '/',
      lazy: false,
      hot: true
    });

    gulp.src(['src/index.html'])
        .pipe(gulp.dest('debug/'))
    gulp.src(['src/bundle.css'])
        .pipe(gulp.dest('debug/'))

    webpackServer.listen(port, null, function(){
      require('dns').lookup(require('os').hostname(), function(err, add, fam){
        setTimeout(function(){
          console.log('develop server start at:' + add + ":" + port);
        }, 5000)
      })
    })
});

gulp.task('build', function(){
  var tap = require('gulp-tap')
  var needHashFiles=[];
  var finishTag = false;

  gulp.src("src/index.js")
     .pipe(webpackStream(require("./webpack.config.prod.js")))
     .pipe(gulp.dest("build/"))
     .pipe(tap(function(file,t){
       if(file.extname==".js" || file.extname==".css"){
         needHashFiles.push(file);
       }
       if(finishTag==false && needHashFiles.length==2){
         finishTag=true;
         gulp.src('src/index.html')
             .pipe(tap(function(file2,t2){
               var rf = require("fs");
               var data = rf.readFileSync(file2.path,"utf8");
               for(var k in needHashFiles){
                 var hashFile = needHashFiles[k];
                 if(hashFile.extname==".js"){
                   data = data.replace(/bundle.js/g,hashFile.basename);
                 }else{
                   data = data.replace(/bundle.css/g,hashFile.basename);
                 }
               }
               file2.contents = new Buffer(data)
               console.log(file2.contents);
             }))
             .pipe(gulp.dest('build/'))
           }
         }));

  return "build"
})
