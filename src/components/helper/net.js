//XMLHttpRequest简单封装
function ajax(json){
	var json = json||{};
	var type = json.type||"GET";
	type = type.toUpperCase();
	var url = json.url;
	var async = json.async||true;
	var contentType = json.contentType||"application/x-www-form-urlencoded;charset=UTF-8";
	var data = json.data||"";
	var dataArr = [];
	for(var key in data){
		dataArr.push(key+"="+data[key]);
	}
	var dataStr = "";
	if(dataArr.length>0){
		dataStr = dataArr.join("&");
	}
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

	var request;
	try{
		request = new XMLHttpRequest();
	}catch(e){//兼容todo

	}

	if(request){
		if(type=="GET"){
			request.open(type,url+"?"+dataStr+"&mt="+Math.random(),async);
			request.withCredentials = true;
			request.send(null);
		}else{
			request.open(type,url+"?mt="+Math.random(),async);
			request.withCredentials = true;
			request.setRequestHeader("Content-Type",contentType);
			
			request.send(dataStr);
		}

		request.onreadystatechange=function(){
			if(request.readyState==4){
				if(request.status==200){
					var res = request.responseText;
					if(simplePromise.successCall){
						simplePromise.successCall(res);
					}
				}else{
					if(simplePromise.errorCall){
						simplePromise.errorCall(request)
					}
				}

			}
		}
	}
	simplePromise.request=request;
	return simplePromise;
}

function uploadFile(){
	var formData = new FormData();

}

var net = {
	ajax:ajax,
	uploadFile:uploadFile
}

module.exports = net;
