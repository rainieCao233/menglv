var React = require('react')
var ReactDOM = require('react-dom')

//CSS
require("./header.css")

//components
var ALink = require("../alink/alink")
var Helper = require("../helper/helper")

var Header = React.createClass({
  getInitialState:function(){
    return{
      selectTab:"时   间",
      selectId:0
    }
  },
  componentDidMount:function(){
    if(localStorage.getItem("text") && location.hash.indexOf("screening")>-1){
      this.refs.s_input.value = localStorage.getItem("text");
    }
  },
  search:function(){
    console.log(this.refs.s_input.value);
    localStorage.setItem("text",this.refs.s_input.value);
    Helper.forwardTo("/screening");
  },
  logout:function(){
    var _self = this;
    Helper.send("loginController/logout",{},"GET")
      .success(function(res){
        console.log(res);
        location.reload();
      })
      .error(function(req){
        console.log("error : " + req);
      });
  },
  toHome:function(){
    Helper.forwardTo("/homepage");
  },
  render:function(){
    return(
      <div id="header">
        <div className="top_wrap">
          <div className="login_wrap clearfix">
            <div className="left">
              <span className="welcome_txt">您好，欢迎来到萌驴户外旅行，来一场说走就走的旅行吧!</span>
              <span className="sign" style={{display:!this.props.isLogin?"inline-block":"none"}}>[<ALink href="/login">登录</ALink>]</span>
              <span className="line" style={{display:!this.props.isLogin?"inline-block":"none"}}>|</span>
              <span className="sign" style={{display:!this.props.isLogin?"inline-block":"none"}}>[<ALink href="/register">注册</ALink>]</span>
              <span className="sign" style={{display:this.props.isLogin?"inline-block":"none"}}><span>{this.props.name}</span> [<a onClick={this.logout}>退出登录</a>]</span>
            </div>
            <div className="right">
              <span className="qrcode">
                <em className="icon i-qq"></em>
                官方微信公众号
                <em className="icon i-wechat"></em>
              </span>
              <span className="qrcode">
                <em className="icon i-kefu"></em>
                客服QQ
                <span className="i-qqgroup-wrap"><em className="icon i-qqgroup"></em></span>
              </span>
            </div>
          </div>
        </div>
        <div className="bottom_wrap">
          <div className="search_wrap clearfix">
            <em className="icon i-logo" onClick={this.toHome}></em>
            <div className="search_input">
              <div className="s_tab">
                <span className="t_title">所有产品</span>
              </div>
              <input type="text" className="s_input" ref="s_input" placeholder="" />
              <a href="javascript:void(0);" className="s_btn" onClick={this.search}>搜&nbsp;索</a>
            </div>
            <em className="icon i-tel"></em>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Header
