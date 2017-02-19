var React = require("react")
var ReactDOM = require("react-dom")

//CSS
require("./signup.css")

//components
var Helper = require("../../components/helper/helper")

var Signup = React.createClass({
  getInitialState:function(){
    return {
    }
  },
  componentDidMount:function(){
  },
  render:function(){
    return(
      <div id="signup">
        <div className="wrap">
          <div className="title">报名信息</div>
          <div className="main clearfix">
            <div className="input_wrap">*姓 &nbsp; &nbsp; &nbsp; 名: <input type="text" /></div>
            <div className="input_wrap">*昵 &nbsp; &nbsp; &nbsp; 称: <input type="text" /></div>
            <div className="input_wrap">*身份证号: <input type="text" /></div>
            <div className="input_wrap">*手机号码: <input type="text" /></div>
            <div className="input_wrap">*集合地点: linkageMenu</div>
            <a href="" className="signup_btn">增加报名人员</a>
            <div className="discount">
              <h4>可享受优惠促销套装</h4>
              <p className="name">牧高迪T2铝杆双人帐篷</p>
              <p className="ruler">【特价包邮】牧高迪T2铝杆帐篷一顶</p>
              <a href="" className="detail_btn">查看详情</a>
              <div className="price">
                <span>市场价：<b className="before">¥298</b></span>
                <span><b className="now">¥298</b>/份</span>
              </div>
              <div className="counter">计数器counter插件</div>
            </div>
            <div className="discount">
              <h4>可享受优惠促销套装</h4>
              <p className="name">牧高迪T2铝杆双人帐篷</p>
              <p className="ruler">【特价包邮】牧高迪T2铝杆帐篷一顶</p>
              <a href="" className="detail_btn">查看详情</a>
              <div className="price">
                <span>市场价：<b className="before">¥298</b></span>
                <span><b className="now">¥298</b>/份</span>
              </div>
              <div className="counter">计数器counter插件</div>
            </div>
            <div className="discount">
              <h4>可享受优惠促销套装</h4>
              <p className="name">牧高迪T2铝杆双人帐篷</p>
              <p className="ruler">【特价包邮】牧高迪T2铝杆帐篷一顶</p>
              <a href="" className="detail_btn">查看详情</a>
              <div className="price">
                <span>市场价：<b className="before">¥298</b></span>
                <span><b className="now">¥298</b>/份</span>
              </div>
              <div className="counter">计数器counter插件</div>
            </div>
            <div className="discount">
              <h4>已享受优惠 <span>优惠说明</span></h4>
              <div className="detail">
                <em className="icon i-gift"></em>
                <b>【新人红包】</b>首次参加活动立减10
              </div>
              <div className="detail">
                <em className="icon i-free"></em>
                <b>【免单抽奖】</b>分享照片，赢取活动免单
              </div>
              <div className="detail">
                <em className="icon i-give"></em>
                <b>【携朋带友】</b>带朋友参加活动送豪华户外装备
              </div>
              <div className="tip">备注：身份信息仅用来购买户外专业保险，萌旅户外旅行承诺不会泄露玩家身份信息或用户其他用途</div>
              <div className="must_wrap">继续预定代表您已经阅读并同意<a href="" className="must_know">预订须知</a></div>
            </div>
            <div className="total">
              总价 : <b>¥569</b>可获积分 : 569
              <a href="" className="submit_btn">提交订单</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Signup
