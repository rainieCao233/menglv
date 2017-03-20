//验证器
var validator = {
	isMoney:function(money){
		if (money!=null && money!="") {
			return !isNaN(money);
		}
	},
	isUserMoney:function(money){
		// return (validator.isMoney(money) && money >= 1 && money <= 200);
		return (validator.isMoney(money) && money >= 0.01 && money <= 200);
	},
	isUserTxt:function(textarea){
		var len = textarea.length;
		return (len >= 10 && len <= 200);
	},
	isNumber: function (number) {
		var regNumber = /^[0-9]+$/;
		return regNumber.test(number);
	},
	isEmail: function (email) {
		var regEmail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
		return regEmail.test(email);
	},
	isIp: function (ip) {
		var regIp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])((\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}|(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){5})$/;
		return regIp.test(ip);
	},
	isFax: function (fax) {
		var regFax = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
		return regFax.test(fax);
	},
	isTel: function (tel) {
		var regTel = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
		return regTel.test(tel);
	},
	isPhone: function (phone) {
		var regPhone = /^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[57]|15[012356789]|17[0678]|18[0-9])\d{8}$/;
		return regPhone.test(phone);
	},
	isUrl: function (url) {
		var regUrl = /[a-zA-z]+:\/\/[^\s]/;
		return regUrl.test(url);
	},
	isCardID: function (sId){
		var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"} ;
		var iSum=0 ;
		var info="" ;
		if(!/^\d{17}(\d|x)$/i.test(sId)) return false;
		sId=sId.replace(/x$/i,"a");
		if(aCity[parseInt(sId.substr(0,2))]==null) return false;
		var sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2));
		var d=new Date(sBirthday.replace(/-/g,"/")) ;
		if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))return false;
		for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;
		if(iSum%11!=1) return "你输入的身份证号非法";
		//aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
		return true;
	}
}

module.exports = validator
