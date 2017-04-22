var React = require("react")
var ReactDOM = require("react-dom")

//CSS
require("./login.css")

var Page = require("../page/page")
var Topbar = require("../../components/topbar/topbar")
//components
var Helper = require("../../components/helper/helper")
var Cookie = require("../../components/helper/cookie")

var Login = React.createClass({
  getInitialState:function(){
    return {
      isLogin:false,
    }
  },
  componentWillMount:function(){
    window.scrollTo(0,0);
  },
  componentDidMount:function(){
    this.checkLogin();
  },
  checkLogin:function(){
      var _self = this;
      Helper.send("loginController/getLoginUserInfo","GET")
        .success(function(res){
          _self.state.isLogin = true;
          _self.forceUpdate();
          console.log(res);
        })
        .error(function(req){
          alert("登录失败：" + req)
          _self.setState({isLogin:false})
          console.log(req)
        })
  }, 
  toLogin:function(){
    var self = this,
        data = [{
                "name":"name",
                "value":self.refs.name.value == ""?false:true
              },
              {
                "name":"password",
                "value":self.refs.password.value == ""?false:true
              }];
      for (var i = 0; i < data.length; i++) {
        if(!data[i].value){
          alert(data[i].name + " empty");
          self.refs[data[i].name].focus();
          return false;
        }
        if(i == 1){
          self.postRequest(data,this.refs.autoLogin.checked);
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
  weixinlogin:function(){
    Helper.jumpTo("https://open.weixin.qq.com/connect/qrconnect?appid=wx4e7bbe90a5bba881&redirect_uri="+encodeURIComponent(location.origin+"/#/")+"&response_type=code&scope=snsapi_login&state=mlpclogin#wechat_redirect");
  },
  render:function(){
    return(
      <Page>
      <Topbar isLogin={this.state.isLogin}/>
      <div id="login">
      	<div className="wrap">
      		<div className="title">
      			用户登陆
      			<a>没有帐号立即去注册</a>
      		</div>
          <div className="input_wrap">
            <span>* 用户名：</span>
            <input type="text" ref="name"/>
          </div>
          <div className="input_wrap">
            <span>* 密码：</span>
            <input type="password" ref="password"/>
          </div>
          <div className="checkbox clearfix">
            <input type="checkbox" ref="autoLogin" />两周内自动登录
            <a href="javascript:void(0);" className="forget_pw">忘记密码</a>
          </div>
      		<a href="javascript:void(0);" className="login_btn" onClick={this.toLogin}>登陆</a>
          <hr />
          <span className="tip">您也可以用合作网站的账号登陆</span>
          <a className="firm_icon" href="javascript:void(0);" onClick={this.weixinlogin}>
            <em className="icon i-wechat-firm"></em>
          </a>
      	</div>
      </div>
      </Page>
    )
  }
})

module.exports = Login
