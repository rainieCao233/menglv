var express = require('express')
var app = express()
var fs = require("fs")
var url = require("url")

// app.get("/api/*",function(req,res){
// 	handleReq(req,res)
// })

// app.post("/api/*",function(req,res){
// 	handleReq(req,res)
// })

// app.get("/resource/*",function(req,res){
// 	handleReq(req,res)
// })

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://192.168.0.104:9090");
    res.header("Access-Control-Allow-Credentials","true");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    console.log(req.method)
    if(req.method=="OPTIONS")
    {
    	res.sendStatus(200);/*让options请求快速返回*/
    }
    else{
    	console.log(2)
    	handleReq(req,res);
    	console.log(3)
    	next();
    }
});

function handleReq(req,res){
	// console.log(req);
	var pathname = url.parse(req.url).pathname;
	// console.log(pathname)
	var routeIndex = pathname.lastIndexOf("\/");
	var route = pathname.substr(routeIndex,10000);

	if(req.method=="OPTIONS"){
		res.send(200);	//快速解决第一个跨域的options包
		return;
	}

	if(route){
		try{
			var data = "";
			if(pathname.indexOf("/resource/")>=0){
				data = fs.readFileSync(__dirname+"/resource/"+route);
			}else{
				data = fs.readFileSync(__dirname+"/api/"+route+".json","utf-8");
			}
			
			res.send(data);			
		}catch(e){
			res.send("not found "+route+"<br/>path:"+e.path)
		}

	}else{
		res.send("not found "+route);	
	}	
}

module.exports = app