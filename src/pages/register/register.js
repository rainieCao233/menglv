var React = require("react")
var ReactDOM = require("react-dom")

//CSS
require("./register.css")

var Page = require("../page/page")
//components
var Topbar = require("../../components/topbar/topbar")
var Helper = require("../../components/helper/helper")
var validator = require("../../components/helper/validator")

var Register = React.createClass({
  getInitialState:function(){
    return {
    }
  },
  componentWillMount:function(){
    window.scrollTo(0,0);
  },
  componentDidMount:function(){
  },
  toRegister:function(){
    var self = this,
        data = {
          "username":self.refs.name.value,
          "password":Helper.md5.useMd5(self.refs.password.value),
          "mailAddress":self.refs.email.value,
          "phoneNumber":self.refs.phone.value,
          "isWantToBeVip":this.refs.vip.checked
        };
    if(data.username==""){
      self.refs.name.value = "";
      self.refs.name.focus();
      return;
    }
    if(data.password==""){
      self.refs.password.value = "";
      self.refs.password.focus();
      return;
    }
    if(!validator.isEmail(data.mailAddress)){
      self.refs.email.value = "";
      self.refs.email.focus();
      return;
    }
    if(!validator.isPhone(data.phoneNumber)){
      self.refs.phone.value = "";
      self.refs.phone.focus();
      return;
    }
    self.postRequest(data);
  },
  postRequest:function(data){
    var _self = this;
		Helper.send("/registerController/register",data)
			.success(function(res){
				Helper.forwardTo("/homepage");
			})
			.error(function(req){
				alert(req)
			});
  },
  render:function(){
    return(
      <Page>
      <Topbar isLogin="false" />
      <div id="register">
      	<div className="wrap">
      		<div className="title">
      			用户注册
      			<span>已有帐号去登陆</span>
      		</div>
          <div className="input_wrap">
            *用户姓名：<input type="text" ref="name"/>
          </div>
          <div className="input_wrap">
            *常用邮箱：<input type="text" ref="email"/>
          </div>
          <div className="input_wrap">
            *用户密码：<input type="password" ref="password"/>
          </div>
          <div className="input_wrap">
            *手机号码：<input type="text" ref="phone"/>
          </div>
          <div className="checkbox">
            <input type="checkbox" ref="vip" />我要成为萌旅会员
          </div>
      		<a href="javascript:void(0);" className="register_btn" onClick={this.toRegister}>注册</a>
      	</div>
      </div>
      </Page>
    )
  }
})

module.exports = Register
