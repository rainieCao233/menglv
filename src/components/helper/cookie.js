//cookie操作简单封装
var cookie = {
	get:function(name)
	{
		var arr=null;
		var reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	},
	/**
	 * 写cookie
	 * @param {[type]} name  [description]
	 * @param {[type]} value [description]
	 *  //s20是代表20秒
		//h是指小时，如12小时则是：h12
		//d是天数，30天则：d30
		//不传，表示关闭浏览器就失效
	 */
	set:function(name,value,time)
	{
	    var domain = ".shmlhw.com";
	    //var domain=window.location.hostname;
	    var exp = new Date();

	    if(time){
		    var strsec = this.getsec(time);
		    exp.setTime(exp.getTime() + strsec*1);
		    document.cookie = name + "="+ decodeURIComponent(value) + ";domain="+domain+";path=/;expires=" + exp.toGMTString();
	    }else{
	    	document.cookie = name + "="+ decodeURIComponent(value) + ";domain="+domain+";path=/";
	    }

	},
	getsec:function(str)
	{
	   var str1=str.substring(1,str.length)*1;
	   var str2=str.substring(0,1);
	   if (str2=="s")
	   {
	        return str1*1000;
	   }
	   else if (str2=="h")
	   {
	       return str1*60*60*1000;
	   }
	   else if (str2=="d")
	   {
	       return str1*24*60*60*1000;
	   }
	}
}

module.exports = cookie;
