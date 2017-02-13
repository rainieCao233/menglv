var React = require("react")
var ReactDOM = require("react-dom")

//CSS
require("./footer.css")

var Footer = React.createClass({
  render:function() {
    return(
      <div id="footer">
        <em className="icon i-footer"></em>
        <div className="detail_wrap">
          <div className="about_wrap">
            <ul>
              <li><a href="#">萌馿簡介</a></li>
              <li><a href="#">企業文化</a></li>
              <li><a href="#">聯繫我們</a></li>
            </ul>
          </div>
          <div className="apply_wrap">
            <ul>
              <li><a href="#">报名参加</a></li>
              <li><a href="#">活动出票</a></li>
              <li><a href="#">活动退出</a></li>
            </ul>
          </div>
          <div className="pay_wrap">
            <ul>
              <li><a href="#">支付宝/网银</a></li>
              <li><a href="#">活动出票</a></li>
              <li><a href="#">活动退出</a></li>
            </ul>
          </div>
          <div className="kefu_wrap">
            <ul>
              <li>客服QQ : 165223546</li>
              <li>客服微信 : shml007</li>
              <li>客服电话 : 021-37697991</li>
              <li>客服邮箱 : csr@shmlhw.com</li>
            </ul>
          </div>
          <div className="QRCode_wrap">
            <div className="wechat">
              <span>微信服务号</span>
              <em className="icon i-wechat"></em>
            </div>
            <div className="QQ">
              <span>QQ交流群</span>
              <em className="icon i-qqgroup"></em>
            </div>
          </div>
          <span>友情链接:</span>
          <div className="url_wrap">
            <a href="#"></a>
            <a href="#"></a>
            <a href="#"></a>
          </div>
          <em className="icon i-certification"></em>
        </div>
        <div className="license_wrap">
        </div>
      </div>
    )
  }
});

module.exports = Footer
