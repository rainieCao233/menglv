var ReactRouter = require('react-router')
var hashHistory = ReactRouter.hashHistory
var net = require('./net')

var timer="";

//实用工具类
var helper = {
	//跳转路由
	roueteHistory : [],
	forwardTo:function(hash){
		window.helper.roueteHistory.push(hash);
		hashHistory.push(hash)
	},
	goBack:function(){
		window.helper.roueteHistory.pop();
		hashHistory.goBack()
	},
	jumpTo:function(url){
		window.location.href=url;
	},
	send:function(route,param,method){
		var simplePromise = {
			successCall:null,
			success:function(cb){
				simplePromise.successCall=cb;
				return simplePromise;
			},
			errorCall:null,
			error:function(cb){
				simplePromise.errorCall=cb;
				return simplePromise;
			},
			request:null
		};
		var host = getHost();

		var json = {};
		json.url = host+route;

		json.data = param;
		json.type = method||"POST";
		var tmpPromise = net.ajax(json).success(function(res){
			if(res){
				var json = JSON.parse(res);
				if(json.errorMsg){
					console.log(json.errorMsg);
				}else{
					if(json.retcode=="0000"){
						if(simplePromise.successCall){//业务逻辑成功
							simplePromise.successCall(json.obj);
						}
					}else{
						// window.helper.observer.trigger("alert",window.helper.errorCode.getError(json.errorCode));
						// if(simplePromise.errorCall){	//业务逻辑错误
						// 	simplePromise.errorCall(json.retcode,json);
						// }
					}
				}
			}

		}).error(function(req){	//net错误
			console.log(req);
			alert(req);
		})
		simplePromise.request = tmpPromise.request;
		return simplePromise;
	},
	setTimer:function(func){
		timer=window.setInterval(func,1000);
	},
	clearTimer:function(){
		if(timer!=""){
			window.clearInterval(timer);
		}
	}
}

function getHost(){
	switch(helper.ENV){
		case "develop":
		case "release":
			// return "http://www.shmlhw.com/huihuan/"
			// var port = window.location.port?(window.location.port>>0)+2:"9092";
			// return "http://192.168.0.105:"+port+"/api/";
			// return "http://112.74.48.183:8080/huihuan/";
			return "http://www.shmlhw.com/menglv/";
		break;
	}
}

//环境设置
var href = window.location.href;
if(href.indexOf("menglv")>=0){
	helper.ENV="release"; //发布服务器
}else{
	helper.ENV="develop";	//本机开发
}

helper.net = net;
helper.observer = require("./observer");
helper.validator = require("./validator");
// helper.recorder = require("./recorder");
// helper.user = require("./user");
helper.cookie = require('./cookie');
// helper.bridge = require("./bridge");
helper.errorCode = require("./errorCode");
helper.md5 = require("./md5");

window.helper = helper

module.exports = helper
