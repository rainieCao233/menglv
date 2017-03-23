var React = require("react")
var ReactDOM = require("react-dom")
var tripList = require('../../../node/server/api/tripList.json');

//CSS
require("./homepage.css")

//components
var Helper = require("../../components/helper/helper")
var Topbar = require("../../components/topbar/topbar")
var Slider = require("../../components/slider/slider")

var Homepage = React.createClass({
  getInitialState:function(){
    return {
      list1:[{}],
      list2:[{}]
    }
  },
  componentDidMount:function(){
    this.getActivities({is_long_journey:"0"});
  },
  getActivities:function(json){
    var obj = {
      "start_index":-1,
      "page_size":-1,
      "month":-1,
      "type":-1,
      "level":-1,
      "duration":-1,
      "holiday":-1,
      "low_price":-1,
      "high_price":-1,
      "is_long_journey":json.is_long_journey
    }
    var _self = this;
    Helper.send("getActivitiesAction_getActivities",obj)
      .success(function(res){
        res = res.activities;
        for(var i=0;i<res.length;i++){
          res[i].startTime = res[i].startTime.substring(0,10);
          if(res[i].title.length >25){
            res[i].title = res[i].title.substring(0,25) + "...";
          }
        }
        if(obj.is_long_journey == "0"){
          _self.setState({list1:res});
        }else if(obj.is_long_journey == "1"){
          _self.setState({list2:res});
        }
      })
      .error(function(req){
        console.log("error : " + req)
      });
  },
  switchTab:function(e){
    if(e.target.value == "case3"){
      Helper.forwardTo('/customize')
      return;
    }
    this.refs["case1"].style.display = "none";
    this.refs["case2"].style.display = "none";
    this.refs["case3"].style.display = "none";
    this.refs[e.target.value].style.display = "block";
    // console.log(e.target.value.substring(4,5)-1);
    this.getActivities({is_long_journey:(e.target.value.substring(4,5)-1)});
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
                  <span>时间</span>
                </div>
                <div className="items clearfix">
                  <li><a href="/#/screening/duration/1">1天 <em className="icon i-hot"></em></a></li>
                  <li><a href="/#/screening/duration/2">2天 <em className="icon i-hot"></em></a></li>
                  <li><a href="/#/screening/duration/3">3天 </a></li>
                  <li><a href="/#/screening/duration/4">4天 </a></li>
                  <li><a href="/#/screening/duration/5">5天 </a></li>
                  <li><a href="/#/screening/duration/6">6天 </a></li>
                  <li><a href="/#/screening/duration/7">7天 </a></li>
                  <li><a href="/#/screening/duration/8">8天 </a></li>
                  <li><a href="/#/screening/duration/9">9天 </a></li>
                </div>
              </ul>
              <ul className="blist ">
                <div className="title">
                  <em className="icon i-hp-2"></em>
                  <span>活动类型</span>
                </div>
                <div  className="items clearfix">
                  <li><a href="/#/screening/type/1">轻装(农家) </a></li>
                  <li><a href="/#/screening/type/2">重装(露营) </a></li>
                  <li><a href="/#/screening/type/3">水线 </a></li>
                  <li><a href="/#/screening/type/4">长线 </a></li>
                  <li><a href="/#/screening/type/5">技术路线 </a></li>
                  <li><a href="/#/screening/type/6">单日 </a></li>
                  <li><a href="/#/screening/type/7">室内 </a></li>
                  <li><a href="/#/screening/type/8">初体验 </a></li>
                  <li><a href="/#/screening/type/9">海岛 </a></li>
                  <li><a href="/#/screening/type/10">特价 </a></li>
                </div>
              </ul>
              <ul className="clist ">
                <div className="title">
                  <em className="icon i-hp-3"></em>
                  <span>月份分类</span>
                </div>
                <div  className="items clearfix">
                  <li><a href="/#/screening/month/1">一月 <em className="icon i-hot"></em></a></li>
                  <li><a href="/#/screening/month/2">二月 <em className="icon i-hot"></em></a></li>
                  <li><a href="/#/screening/month/3">三月 </a></li>
                  <li><a href="/#/screening/month/4">四月 </a></li>
                  <li><a href="/#/screening/month/5">五月 </a></li>
                  <li><a href="/#/screening/month/6">六月 </a></li>
                  <li><a href="/#/screening/month/7">七月 </a></li>
                  <li><a href="/#/screening/month/8">八月 </a></li>
                  <li><a href="/#/screening/month/9">九月 </a></li>
                  <li><a href="/#/screening/month/10">十月 </a></li>
                  <li><a href="/#/screening/month/11">十一月 </a></li>
                  <li><a href="/#/screening/month/12">十二月 </a></li>
                </div>
              </ul>
            </div>
            <Slider />
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
            {
              this.state.list1.map(function(item,index){
                return <li key={"case1"+index}>
                         <a href={"/#/detail/"+item.id}>
                           <img src={item.mainPicRoute} alt="" className="item" />
                           <h4>
                             {item.title}
                             <span className="price"><b>¥ {item.offPrice}</b> 元</span>
                           </h4>
                           <div className="timestamp">{item.startTime}</div>
                         </a>
                       </li>
              })
            }
            </ul>
          </div>
          <div className="case_wrap clearfix" id="case2" ref="case2">
            <div className="left">
              <em className="case"></em>
              <em className="case"></em>
            </div>
            <ul className="right">
              {
              this.state.list2.map(function(item,index){
                return <li key={"case2"+index}>
                         <a href={"/#/detail/"+item.id}>
                           <img src={item.mainPicRoute} alt="" className="item" />
                           <h4>
                             {item.title}
                             <span className="price"><b>¥ {item.offPrice}</b> 元</span>
                           </h4>
                           <div className="timestamp">{item.startTime}</div>
                         </a>
                       </li>
              })
            }
            </ul>
          </div>
          <div className="case_wrap clearfix" id="case3" ref="case3">
            <div className="left">
              <em className="case"></em>
              <em className="case"></em>
            </div>
            <ul className="right">
              
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
