var React = require("react")
var ReactDOM = require("react-dom")

//CSS
require("./about.css")

var Topbar = require("../../components/topbar/topbar")
var Helper = require("../../components/helper/helper")
var Page = require("../page/page")

var About = React.createClass({
  getInitialState:function(){
    return {
      isLogin:false
    }
  },
  componentWillMount:function(){
    window.scrollTo(0,0);
    this.toLogin();
    Helper.clearTimer();
  },
  componentDidMount:function(){
  },
  toLogin:function(){
      var _self = this;
      Helper.send("loginController/getLoginUserInfo","GET")
        .success(function(res){
          _self.state.isLogin = true;
          _self.forceUpdate();
          console.log(res);
        })
        .error(function(req){
          // alert("登录失败：" + req)
          _self.setState({isLogin:false})
          console.log(req)
        })
  },
  render:function(){
    return(
      <Page isLogin={this.state.isLogin}>
      <div id="about">
        <Topbar isLogin={this.state.isLogin}/>
        <div className="about_wrap">
        	<div className="wrap">
        		<h4>联系我们</h4>
            <p>地址：上海莘建东路539弄1号楼1403室</p>
            <p>邮编：201108</p>
            <p>电话：021-64201076</p>
            <p>传真：021-64201077</p>
            <p>工作时间：周一至周五 上午8:30--17:30</p>
        	</div>
        </div>
      </div>
      </Page>
    )
  }
})

module.exports = About
