var gulp = require('gulp')
var webpack = require('webpack')
var webpackStream = require('webpack-stream')
var WebpackDevServer = require( 'webpack-dev-server' )

var serverApp = require("./node/server/server")

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

gulp.task('debug', ['apiserver'], function() {
  var port = 9090;
  var config = require('./webpack.config.dev.js');

  config.entry.app.unshift('webpack-dev-server/client?http://0.0.0.0:'+port+"")
  var compiler = webpack(config);

  var webpackServer = new WebpackDevServer(compiler, {
	    contentBase: './debug',
	    // Set this as true if you want to access dev server from arbitrary url.
	    // This is handy if you are using a html5 router.
	    historyApiFallback: false,
	    // Don't forget this for dev-server
	    publicPath: '/',
	    lazy: false,
	    hot: false
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
     .pipe(gulp.dest("dist/"))
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
             .pipe(gulp.dest('dist/'))
           }
         }));

  return "build"
})
