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
            <img src="" alt=""  className="pic"/>
            <div className="intro">
              <div className="name">[徒步穿越] 穿越江南香格里拉 赏公盂世外美景</div>
              <ul>
                <li>活动费用 : ¥ 350.00</li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
      	</div>
      </div>
    )
  }
})

module.exports = Detail
