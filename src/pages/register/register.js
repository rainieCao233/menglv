var React = require("react")
var ReactDOM = require("react-dom")

//CSS
require("./register.css")

//components
var Helper = require("../../components/helper/helper")

var Register = React.createClass({
  getInitialState:function(){
    return {
    }
  },
  componentDidMount:function(){
  },
  render:function(){
    return(
      <div id="register">
      	<div className="wrap">
      		<div className="title">
      			用户注册
      			<span>已有帐号去登陆</span>
      		</div>
      		*用户姓名：<input type="text" />
      		*常用邮箱：<input type="text" />
      		*用户密码：<input type="text" />
      		*手机号码：<input type="text" />
      		<input type="checkbox" />我要成为萌旅会员
      		<a href="#" className="register_btn">注册</a>
      	</div>
      </div>
    )
  }
})

module.exports = Register
