//验证器
var errorCode = {
	code:{
		"1": "支付参数校验失败",
		"10": "通行证用户信息校验失败",
		"11": "系统错误/异常"
	},
	getError:function(code){
		if(this.code[code])
			return this.code[code];
		else
			return "errorCode:"+code;
	}
}

module.exports = errorCode
