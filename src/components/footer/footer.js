var React = require("react")
var ReactDOM = require("react-dom")

//CSS
require("./footer.css")

var Helper = require("../helper/helper")

var Footer = React.createClass({
  toIntro:function(){
    Helper.forwardTo("/intro");
  },
  toCulture:function(){
    Helper.forwardTo("/culture");
  },
  toAbout:function(){
    Helper.forwardTo("/about");
  },
  render:function() {
    return(
      <div id="footer">
        <div className="i-footer-wrap">
          <em className="icon i-footer"></em> 
        </div>
        <div className="detail_wrap">
          <div className="detail">
            <div className="about_wrap">
              <em className="icon i-f_1"></em>
              <span className="title">关于我们</span>
              <ul className="list">
                <li><a href="javascript:void(0);" onClick={this.toIntro}>萌旅简介</a></li>
                <li><a href="javascript:void(0);" onClick={this.toCulture}>企业文化</a></li>
                <li><a href="javascript:void(0);" onClick={this.toAbout}>联系我们</a></li>
              </ul>
            </div>
            <div className="apply_wrap">
              <em className="icon i-f_2"></em>
              <span className="title">报名流程</span>
              <ul className="list">
                <li><a href="#">报名参加</a></li>
                <li><a href="#">活动退出</a></li>
              </ul>
            </div>
            <div className="pay_wrap">
              <em className="icon i-f_3"></em>
              <span className="title">付款指南</span>
              <ul className="list">
                <li><a href="#">支付宝/网银</a></li>
                <li><a href="#">活动发票</a></li>
              </ul>
            </div>
            <div className="kefu_wrap">
              <em className="icon i-f_4"></em>
              <span className="title">客服服务</span>
              <ul className="list">
                <li>客服QQ : 165223546</li>
                <li>客服微信 : shml007</li>
                <li>客服电话 : 021-52277179</li>
                <li>客服邮箱 : csr@shmlhw.com</li>
              </ul>
            </div>
            <div className="QRCode_wrap">
              <div className="QQ">
                <p>QQ交流群</p>
                <em className="icon i-qqgroup"></em>
              </div>
              <div className="wechat">
                <p>微信服务号</p>
                <em className="icon i-wechat"></em>
              </div>
            </div>
          </div>
          <div className="link">
            <span>友情链接:</span>
            <div className="url_wrap">
              <a href="#">坝上摄影</a>
              <a href="#">额济纳摄影</a>
              <a href="#">新疆摄影</a>
              <a href="#">东北摄影</a>
              <a href="#">稻城亚丁摄影</a>
              <a href="#">游侠客旅游网</a>
              <a href="#">关于游侠客</a> 
              <a href="#">游侠客的故事</a> 
              <a href="#">联系游侠客</a> 
              <a href="#">游侠客招聘</a>
              <a href="#">意见反馈</a>
              <a href="#">使用协议</a>
              <a href="#">隐私政策</a>
              <a href="#">交换链接</a>
              <a href="#">帮助中心</a>
            </div>
          </div>
          <em className="icon i-certification"></em>
        </div>
        <div className="license_wrap">
          <div>© 2005-2017 上海萌驴户外用品有限公司 版权所有，并保留所有权利 </div>
        </div>
      </div>
    )
  }
});

module.exports = Footer
