var React = require("react")
var ReactDOM = require("react-dom")
var tripList = require('../../../node/server/api/tripList.json');

//CSS
require("./homepage.css")

//components
var Helper = require("../../components/helper/helper")
var Topbar = require("../../components/topbar/topbar")

var Homepage = React.createClass({
  getInitialState:function(){
    return {
    }
  },
  componentDidMount:function(){
  },
  render:function(){
    return(
      <div id="homepage">
        <Topbar />
        <div className="slider_wrap">
          <div className="slider">
            <div className="category">
              <ul className="alist ">
                <div className="title">
                  <em className="icon i-hp-1"></em>
                  <span>热门路线</span>
                </div>
                <div className="items clearfix">
                  <li>路线1 <em className="icon i-hot"></em></li>
                  <li>路线1 <em className="icon i-hot"></em></li>
                  <li>路线1 </li>
                  <li>路线1 </li>
                  <li>路线1 </li>
                  <li>路线1 </li>
                  <li>路线1 </li>
                  <li>路线1 </li>
                  <li>路线1 </li>
                </div>
              </ul>
              <ul className="blist ">
                <div className="title">
                  <em className="icon i-hp-2"></em>
                  <span>活动类型</span>
                </div>
                <div  className="items clearfix">
                  <li>路线1 <em className="icon i-hot"></em></li>
                  <li>路线1 <em className="icon i-hot"></em></li>
                  <li>路线1 </li>
                  <li>路线1 </li>
                  <li>路线1 </li>
                  <li>路线1 </li>
                  <li>路线1 </li>
                  <li>路线1 </li>
                  <li>路线1 </li>
                </div>
              </ul>
              <ul className="clist ">
                <div className="title">
                  <em className="icon i-hp-3"></em>
                  <span>月份分类</span>
                </div>
                <div  className="items clearfix">
                  <li>路线1 <em className="icon i-hot"></em></li>
                  <li>路线1 <em className="icon i-hot"></em></li>
                  <li>路线1 </li>
                  <li>路线1 </li>
                  <li>路线1 </li>
                  <li>路线1 </li>
                  <li>路线1 </li>
                  <li>路线1 </li>
                  <li>路线1 </li>
                </div>
              </ul>
            </div>
            <div className="aaa">slider</div>
            <div className="selfinfo">
              <em className="icon i-avator"></em>
              <ul>
                <li>网名：123</li>
                <li>余额：123</li>
                <li>积分：123</li>
              </ul>
              <em className="icon i-nav-right"></em>
            </div>
          </div>
        </div>
        <div className="pic_wrap"><em className="hp-1"></em></div>
        <div className="wrap">
          123
        </div>
        <div className="pic_wrap"><em className="hp-2"></em></div>
        <div className="wrap">
          234
        </div>
        <div className="pic_wrap"><em className="hp-3"></em></div>
        <ul className="record clearfix">
          <li><span><b>8000+</b>次</span><br />户外活动</li>
          <li><span><b>6178+</b>米</span><br />攀登记录</li>
          <li><span><b>16+</b>座</span><br />雪山攀登</li>
          <li><span><b>28+</b>天</span><br />徒步穿越记录</li>
          <li><span><b>2000+</b>次</span><br />承接团队策划</li>
        </ul>
      </div>
    )
  }
})

module.exports = Homepage
