var React = require('react')
var ReactDOM = require('react-dom')

//CSS
require("./header.css")

//components
var ALink = require("../alink/alink")

var Header = React.createClass({
  render:function(){
    return(
      <div id="header">
        <div className="top_wrap">
          <div className="login_wrap clearfix">
            <div className="left">
              <span className="welcome_txt">您好，欢迎来到萌驴户外旅行，来一场说走就做的旅行吧!</span>
              <span className="sign">[<ALink href="/login">登录</ALink>]</span>
              <span className="line">|</span>
              <span className="sign">[<ALink href="/register">注册</ALink>]</span>
            </div>
            <div className="right">
              <em className="icon i-qq"></em>官方QQ群
              <em className="icon i-kefu"></em>客服QQ
            </div>
          </div>
        </div>
        <div className="bottom_wrap">
          <div className="search_wrap clearfix">
            <em className="icon i-logo"></em>
            <div className="search_input">
              <div className="s_tab">
                <span className="t_title">时 &nbsp; 长 &nbsp;<em className="icon i-down"></em></span>
                <ul className="list">
                  <li>等 &nbsp; 级</li>
                  <li>类 &nbsp; 型</li>
                  <li>月 &nbsp; 份</li>
                </ul>
              </div>
              <input type="text" className="s_input" placeholder="" />
              <a href="#" className="s_btn">搜&nbsp;索</a>
              <ul className="hot">
                <li>喀纳斯</li>
                <li>武功山</li>
                <li>西藏</li>
                <li>普吉岛</li>
              </ul>
            </div>
            <em className="icon i-tel"></em>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Header
