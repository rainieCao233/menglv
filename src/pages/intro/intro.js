var React = require("react")
var ReactDOM = require("react-dom")

//CSS
require("./intro.css")

var Page = require("../page/page")
var Topbar = require("../../components/topbar/topbar")
var Helper = require("../../components/helper/helper")

var Intro = React.createClass({
  getInitialState:function(){
    return {
      isLogin:false,
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
      <div id="intro">
        <Topbar isLogin={this.state.isLogin}/>
        <div className="intro_wrap">
        	<div className="wrap">
        		<h4>萌驴简介</h4>
            <p>萌驴户外是一家专业的以自助户外旅行和团队拓展、团建为主的户外活动组织，上海登协会员单位、A级户外俱乐部，集徒步、登山穿越、越野、骑行、旅行等为一体的综合性户外团体，致力于为喜欢自然、喜欢旅行、追求自由的朋友打造一个更宽更广的平台。</p>
            <p>萌旅户外提供企业及社会各团体各团队的团队拓展、旅行、会议等策划创意定制活动，提供有助于调动员工的积极性、团队凝聚力的创意策划活动。</p>
            <p>户外装备的销售与租借，为您提供最适合您的户外装备；</p>
            <p>组织户外徒步露营等活动，各类户外体验运动；</p>
        	</div>
        </div>
      </div>
      </Page>
    )
  }
})

module.exports = Intro
