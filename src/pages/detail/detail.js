var React = require("react")
var ReactDOM = require("react-dom")

//CSS
require("./detail.css")

//components
var Helper = require("../../components/helper/helper")

var Detail = React.createClass({
  getInitialState:function(){
    return {
    }
  },
  componentDidMount:function(){
  },
  render:function(){
    return(
      <div id="detail">
        <div className="topbar">插件topbar</div>
      	<div className="wrap">
      		<div className="breadcrumb">您当前的位置：首页 / 短途旅行</div>
          <div className="intro_wrap clearfix">
            <div className="">
              <img src="" alt=""  className="pic"/>
              <div class="share_wrap">
                <em className="icon i-add"></em>
                分享到 :
                <em className="icon i-wechat-sm"></em>
              </div>
              <div class="collect_wrap">
                <em className="icon i-collect"></em>
                收藏此活动
              </div>
            </div>
            <div className="intro">
              <div className="name">[徒步穿越] 穿越江南香格里拉 赏公盂世外美景</div>
              <ul>
                <li>活动费用 : ¥ 350.00</li>
                <li>活动日期 : 2016年11月11日 - 2016年11月13日</li>
                <li>活动类型 : 初级</li>
                <li>活动地点 : 浙江仙居</li>
                <li>出发地 : 上海</li>
                <li>住宿方式 : 农家或露营</li>
                <li>报名截止时间 : 2016/11/30 13:00:00</li>
                <li>活动人数(限额) : 9/25 (报名数 / 人数限制)</li>
                <li>带队领队 : 风扇 <a href="#">查看领队情况</a></li>
                <li>领队手机号码 : 13818658932</li>
                <li>俱乐部号码 : 021-50585977/53068776 <a href="#">点击查看报名须知</a></li>
              </ul>
            </div>
          </div>
      	</div>
      </div>
    )
  }
})

module.exports = Detail
