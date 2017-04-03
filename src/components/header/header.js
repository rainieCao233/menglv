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
  switchTab:function(e){
    for (var i = 0; i < this.refs.selectList.childNodes.length; i++) {
      this.refs.selectList.childNodes[i].className = "";
    };
    e.target.className = "on";
    switch(e.target.id){
      case "1": 
        this.state.selectTab = "时   间";
        this.state.selectId = 0;
        break;
      case "2": 
        this.state.selectTab = "等   级";
        this.state.selectId = 1;
        break;
      case "3":  
        this.state.selectTab = "类   型";  
        this.state.selectId = 2;  
        break;
      case "4":  
        this.state.selectTab = "月   份";  
        this.state.selectId = 3;  
        break;
      default: 
        this.state.selectTab = "时   间"; 
        this.state.selectId = 0; 
    }
    this.forceUpdate();
  },
  search:function(){
    var url = "", param = "";
    switch(this.state.selectId){
      case 0: 
        url="time"; 
        // switch(this.refs.s_input.value){
        //   case "全部": break;
        //   case "1天": break;
        //   case "2天": break;
        //   case "3天": break;
        //   case "4天": break;
        //   case "5天": break;
        //   case "6天": break;
        //   case "7天": break;
        //   case "8天": break;
        //   case "9天": break;
        //   default:
        // }
        break;
      case 1: 
        url="level"; 
        break;
      case 2: 
        url="type"; 
        break;
      case 3: 
        url="month"; 
        break;
      default: 
        url="time";
    }
    Helper.forwardTo("/screening/" + url + "/" + this.refs.s_input.value)
  },
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
                <span className="t_title">{this.state.selectTab} &nbsp;<em className="icon i-down"></em></span>
                <ul className="list" onClick={this.switchTab} ref="selectList">
                  <li id="1" className="on">&nbsp; 时 &nbsp; 间 &nbsp;</li>
                  <li id="2">&nbsp; 等 &nbsp; 级 &nbsp;</li>
                  <li id="3">&nbsp; 类 &nbsp; 型 &nbsp;</li>
                  <li id="4">&nbsp; 月 &nbsp; 份 &nbsp;</li>
                </ul>
              </div>
              <input type="text" className="s_input" ref="s_input" placeholder="" />
              <a href="javascript:void(0);" className="s_btn" onClick={this.search}>搜&nbsp;索</a>
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
