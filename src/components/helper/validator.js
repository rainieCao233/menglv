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
	}
}

module.exports = validator
