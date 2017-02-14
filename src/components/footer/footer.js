var React = require("react")
var ReactDOM = require("react-dom")

//CSS
require("./footer.css")

var Footer = React.createClass({
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
                <li><a href="#">萌馿簡介</a></li>
                <li><a href="#">企業文化</a></li>
                <li><a href="#">聯繫我們</a></li>
              </ul>
            </div>
            <div className="apply_wrap">
              <em className="icon i-f_2"></em>
              <span className="title">报名流程</span>
              <ul className="list">
                <li><a href="#">报名参加</a></li>
                <li><a href="#">活动出票</a></li>
                <li><a href="#">活动退出</a></li>
              </ul>
            </div>
            <div className="pay_wrap">
              <em className="icon i-f_3"></em>
              <span className="title">付款指南</span>
              <ul className="list">
                <li><a href="#">支付宝/网银</a></li>
                <li><a href="#">活动出票</a></li>
                <li><a href="#">活动退出</a></li>
              </ul>
            </div>
            <div className="kefu_wrap">
              <em className="icon i-f_4"></em>
              <span className="title">客服服务</span>
              <ul className="list">
                <li>客服QQ : 165223546</li>
                <li>客服微信 : shml007</li>
                <li>客服电话 : 021-37697991</li>
                <li>客服邮箱 : csr@shmlhw.com</li>
              </ul>
            </div>
            <div className="QRCode_wrap">
              <div className="wechat">
                <p>微信服务号</p>
                <em className="icon i-wechat"></em>
              </div>
              <div className="QQ">
                <p>QQ交流群</p>
                <em className="icon i-qqgroup"></em>
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
            </div>
          </div>
          <em className="icon i-certification"></em>
        </div>
        <div className="license_wrap">
          <div>萌驴旅行有限公司，旅行社业务经营许可证编号：BJ-CJ00144</div>
          <div>Copyright © 2006-2016 南京途牛科技有限公司 Mengl.com | 营业执照 | ICP证:浙-20130006 | 浙ICP备12009060号 | 上海旅行网</div>
          <div>上海市互联网违法和不良信息举报中心电话（021-55056666）旅行违法行为举报电话（12318）服务质量投诉电话（962020）</div>
        </div>
      </div>
    )
  }
});

module.exports = Footer
