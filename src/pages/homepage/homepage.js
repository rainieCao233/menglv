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
  switchTab:function(e){
    this.refs["case1"].style.display = "none";
    this.refs["case2"].style.display = "none";
    this.refs["case3"].style.display = "none";
    this.refs[e.target.value].style.display = "block";
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
          <div className="tab_wrap">
            <div className="tab">
              <input type="radio" name="case" value="case1" onChange={this.switchTab} defaultChecked="checked"/>
              <span>周边短途游</span>
            </div>
            <div className="tab">
              <input type="radio" name="case" value="case2" onChange={this.switchTab} />
              <span>长途深度游</span>
            </div>
            <div className="tab">
              <input type="radio" name="case" value="case3" onChange={this.switchTab} />
              <span>团队主题定制</span>
            </div>
          </div>
          <div className="case_wrap clearfix" id="case1" ref="case1">
            <div className="left">
              <em className="case"></em>
              <em className="case"></em>
            </div>
            <ul className="right">
              <li>
                <em className="item"></em>
                <h4>
                  宁海森林温泉+轻徒步,宁海森林温泉轻 徒步宁海森......
                  <span className="price"><b>$12345</b> 元</span>
                </h4>
                <div className="timestamp">2016-12-26</div>
              </li>
              <li>
                <em className="item"></em>
                <h4>
                  宁海森林温泉+轻徒步,宁海森林温泉轻 徒步宁海森......
                  <span className="price"><b>$12345</b> 元</span>
                </h4>
                <div className="timestamp">2016-12-26</div>
              </li>
              <li>
                <em className="item"></em>
                <h4>
                  宁海森林温泉+轻徒步,宁海森林温泉轻 徒步宁海森......
                  <span className="price"><b>$12345</b> 元</span>
                </h4>
                <div className="timestamp">2016-12-26</div>
              </li>
              <li>
                <em className="item"></em>
                <h4>
                  宁海森林温泉+轻徒步,宁海森林温泉轻 徒步宁海森......
                  <span className="price"><b>$12345</b> 元</span>
                </h4>
                <div className="timestamp">2016-12-26</div>
              </li>
              <li>
                <em className="item"></em>
                <h4>
                  宁海森林温泉+轻徒步,宁海森林温泉轻 徒步宁海森......
                  <span className="price"><b>$12345</b> 元</span>
                </h4>
                <div className="timestamp">2016-12-26</div>
              </li>
              <li>
                <em className="item"></em>
                <h4>
                  宁海森林温泉+轻徒步,宁海森林温泉轻 徒步宁海森......
                  <span className="price"><b>$12345</b> 元</span>
                </h4>
                <div className="timestamp">2016-12-26</div>
              </li>
            </ul>
          </div>
          <div className="case_wrap clearfix" id="case2" ref="case2">
            <div className="left">
              <em className="case"></em>
              <em className="case"></em>
            </div>
            <ul className="right">
              <li>
                <em className="item"></em>
                <h4>
                  case2case2case2s+轻徒步,宁海森林温泉轻 徒步宁海森......
                  <span className="price"><b>$12345</b> 元</span>
                </h4>
                <div className="timestamp">2016-12-26</div>
              </li>
              <li>
                <em className="item"></em>
                <h4>
                  宁海森林温泉+轻徒步,宁海森林温泉轻 徒步宁海森......
                  <span className="price"><b>$12345</b> 元</span>
                </h4>
                <div className="timestamp">2016-12-26</div>
              </li>
              <li>
                <em className="item"></em>
                <h4>
                  宁海森林温泉+轻徒步,宁海森林温泉轻 徒步宁海森......
                  <span className="price"><b>$12345</b> 元</span>
                </h4>
                <div className="timestamp">2016-12-26</div>
              </li>
              <li>
                <em className="item"></em>
                <h4>
                  宁海森林温泉+轻徒步,宁海森林温泉轻 徒步宁海森......
                  <span className="price"><b>$12345</b> 元</span>
                </h4>
                <div className="timestamp">2016-12-26</div>
              </li>
              <li>
                <em className="item"></em>
                <h4>
                  宁海森林温泉+轻徒步,宁海森林温泉轻 徒步宁海森......
                  <span className="price"><b>$12345</b> 元</span>
                </h4>
                <div className="timestamp">2016-12-26</div>
              </li>
              <li>
                <em className="item"></em>
                <h4>
                  宁海森林温泉+轻徒步,宁海森林温泉轻 徒步宁海森......
                  <span className="price"><b>$12345</b> 元</span>
                </h4>
                <div className="timestamp">2016-12-26</div>
              </li>
            </ul>
          </div>
          <div className="case_wrap clearfix" id="case3" ref="case3">
            <div className="left">
              <em className="case"></em>
              <em className="case"></em>
            </div>
            <ul className="right">
              <li>
                <em className="item"></em>
                <h4>
                  宁海森林温泉+轻徒步,宁海森林温泉轻 徒步宁海森......
                  <span className="price"><b>$12345</b> 元</span>
                </h4>
                <div className="timestamp">2016-12-26</div>
              </li>
              <li>
                <em className="item"></em>
                <h4>
                  宁海森林温泉+轻徒步,宁海森林温泉轻 徒步宁海森......
                  <span className="price"><b>$12345</b> 元</span>
                </h4>
                <div className="timestamp">2016-12-26</div>
              </li>
              <li>
                <em className="item"></em>
                <h4>
                  宁海森林温泉+轻徒步,宁海森林温泉轻 徒步宁海森......
                  <span className="price"><b>$12345</b> 元</span>
                </h4>
                <div className="timestamp">2016-12-26</div>
              </li>
              <li>
                <em className="item"></em>
                <h4>
                  宁海森林温泉+轻徒步,宁海森林温泉轻 徒步宁海森......
                  <span className="price"><b>$12345</b> 元</span>
                </h4>
                <div className="timestamp">2016-12-26</div>
              </li>
              <li>
                <em className="item"></em>
                <h4>
                  宁海森林温泉+轻徒步,宁海森林温泉轻 徒步宁海森......
                  <span className="price"><b>$12345</b> 元</span>
                </h4>
                <div className="timestamp">2016-12-26</div>
              </li>
              <li>
                <em className="item"></em>
                <h4>
                  宁海森林温泉+轻徒步,宁海森林温泉轻 徒步宁海森......
                  <span className="price"><b>$12345</b> 元</span>
                </h4>
                <div className="timestamp">2016-12-26</div>
              </li>
            </ul>
          </div>
        </div>
        <div className="pic_wrap"><em className="hp-2"></em></div>
        <div className="wrap">
          <ul className="leader_wrap clearfix">
            <li>
              <em className="leader"></em>
              <span>精英领队：路客</span>
            </li>
            <li>
              <em className="leader"></em>
              <span>精英领队：路客</span>
            </li>
            <li>
              <em className="leader"></em>
              <span>精英领队：路客</span>
            </li>
            <li>
              <em className="leader"></em>
              <span>精英领队：路客</span>
            </li>
            <li>
              <em className="leader"></em>
              <span>精英领队：路客</span>
            </li>
            <li>
              <em className="leader"></em>
              <span>精英领队：路客</span>
            </li>
          </ul>
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
