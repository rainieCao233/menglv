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
        data = [{
                "name":"name",
                "value":self.refs.name.value == ""?false:true
              },
              {
                "name":"email",
                "value":validator.isEmail(self.refs.email.value)
              },
              {
                "name":"password",
                "value":self.refs.password.value == ""?false:true
              },
              {
                "name":"phone",
                "value":validator.isPhone(self.refs.phone.value)
              }];
      for (var i = 0; i < data.length; i++) {
        if(!data[i].value){
          alert(data[i].name + " error");
          self.refs[data[i].name].value = "";
          self.refs[data[i].name].focus();
          return false;
        }
        if(i == 3){
          self.postRequest(data,this.refs.vip.checked);
        }
      }
  },
  postRequest:function(data,checked){
    var _self = this;
		Helper.send("",{})
			.success(function(res){
				console.log(res);
			})
			.error(function(req){
				console.log(req)
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
