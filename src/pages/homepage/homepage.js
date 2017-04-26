var React = require("react")
var ReactDOM = require("react-dom")

//CSS
require("./homepage.css")

//components
var Helper = require("../../components/helper/helper")
var Topbar = require("../../components/topbar/topbar")
var Slider = require("../../components/slider/slider")
var Cookie = require("../../components/helper/cookie")
var Page = require("../page/page")

var Homepage = React.createClass({
  getInitialState:function(){
    return {
      list1:[{}],
      list2:[{}],
      isLogin:false,
      name:"",
      overage:"",
      score:""
    }
  },
  componentWillMount:function(){
    if(this.props.params.id=="1" || this.props.params.id=="2"){
      window.scrollTo(0,800);
    }else{
      window.scrollTo(0,0);
    }
    this.toLogin();
    Helper.clearTimer();
  },
  componentDidMount:function(){
    var _self = this;
    if(this.props.params.id=="1" || this.props.params.id=="2"){
      this.refs["case1"].style.display = "none";
      this.refs["case2"].style.display = "none";
      this.refs["case"+_self.props.params.id].style.display = "block";
      this.refs["radio_"+_self.props.params.id].checked = true;
      this.getActivities({is_long_journey:(_self.props.params.id-1)});
    }else{
      this.getActivities({is_long_journey:"0"});
    }
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
    Helper.send("getActivitiesController/getActivities",obj)
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
  toLogin:function(){
      var _self = this;
      if(location.hash.indexOf("code=") == -1){
        Helper.send("loginController/getLoginUserInfo","GET")
          .success(function(res){
            _self.state.isLogin = true;
            _self.state.name = res.wxNickname?res.wxNickname:res.name;
            _self.state.overage = res.overage;
            _self.state.score = res.score;
            _self.forceUpdate();
            console.log(res);
          })
          .error(function(req){
            alert("登录失败：" + req)
            _self.setState({isLogin:false})
            console.log(req)
          })
      }else{
          if(location.hash.indexOf("code=") != -1){
            var search = location.hash.substring(location.hash.indexOf("code="));
            var code = search.substring(5,search.indexOf("&"));
            Helper.send("loginController/pcLogin",{code:code},"GET")
            .success(function(res){
              _self.state.isLogin = true;
              _self.state.name = res.wxNickname?res.wxNickname:res.name;
              _self.state.overage = res.overage;
              _self.state.score = res.score;
              _self.forceUpdate();
              console.log(res);
            })
            .error(function(req){
              alert("登录失败：" + req)
              _self.setState({isLogin:false})
              console.log(req)
            })
          }
      }
  },  
  switchTab:function(e){
      if(e.target.value == "case3"){
        Helper.jumpTo("http://www.mikecrm.com/faNs8M");
        return;
      }
      this.refs["case1"].style.display = "none";
      this.refs["case2"].style.display = "none";
      this.refs[e.target.value].style.display = "block";
      // console.log(e.target.value.substring(4,5)-1);
      this.getActivities({is_long_journey:(e.target.value.substring(4,5)-1)});
  },
  durationJump:function(e){
    Helper.forwardTo("/screening/duration/" + e.target.id);
    location.reload();
  },
  typeJump:function(e){
    Helper.forwardTo("/screening/type/" + e.target.id);
    location.reload();
  },
  monthJump:function(e){
    Helper.forwardTo("/screening/month/" + e.target.id);
    location.reload();
  },
  render:function(){
    return(
      <Page isLogin={this.state.isLogin}>
        <div id="homepage">
        <Topbar isLogin={this.state.isLogin} switchTab={this.switchTab} id={this.props.params.id} />
        <div className="slider_wrap">
          <div className="slider">
            <div className="category">
              <ul className="alist ">
                <div className="title">
                  <em className="icon i-hp-1"></em>
                  <span>时间</span>
                </div>
                <div className="items clearfix" onClick={this.durationJump}>
                  <li id="1">1天 <em className="icon i-hot"></em></li>
                  <li id="2">2天 <em className="icon i-hot"></em></li>
                  <li id="3">3天 </li>
                  <li id="4">4天 </li>
                  <li id="5">5天 </li>
                  <li id="6">6天 </li>
                  <li id="7">7天 </li>
                  <li id="8">8天 </li>
                  <li id="9">9天 </li>
                </div>
              </ul>
              <ul className="blist ">
                <div className="title">
                  <em className="icon i-hp-2"></em>
                  <span>活动类型</span>
                </div>
                <div  className="items clearfix" onClick={this.typeJump}>
                  <li id="1">轻装(农家) </li>
                  <li id="2">重装(露营) </li>
                  <li id="3">水线 </li>
                  <li id="4">长线 </li>
                  <li id="5">技术路线 </li>
                  <li id="6">单日 </li>
                  <li id="7">室内 </li>
                  <li id="8">初体验 </li>
                  <li id="9">海岛 </li>
                  <li id="10">特价 </li>
                </div>
              </ul>
              <ul className="clist ">
                <div className="title">
                  <em className="icon i-hp-3"></em>
                  <span>月份分类</span>
                </div>
                <div  className="items clearfix" onClick={this.monthJump}>
                  <li id="1">一月 <em className="icon i-hot"></em></li>
                  <li id="2">二月 <em className="icon i-hot"></em></li>
                  <li id="3">三月 </li>
                  <li id="4">四月 </li>
                  <li id="5">五月 </li>
                  <li id="6">六月 </li>
                  <li id="7">七月 </li>
                  <li id="8">八月 </li>
                  <li id="9">九月 </li>
                  <li id="10">十月 </li>
                  <li id="11">十一月 </li>
                  <li id="12">十二月 </li>
                </div>
              </ul>
            </div>
            <Slider />
            <div className="selfinfo">
              <div  style={{display:this.state.isLogin?"block":"none"}}>
                <em className="icon i-avator"></em>
                <ul className="info">
                  <li>网名：{this.state.name?decodeURIComponent(this.state.name):""}</li>
                  <li>余额：{this.state.overage?this.state.overage:""}</li>
                  <li>积分：{this.state.score?this.state.score:""}</li>
                </ul>
              </div>
              <div  style={{display:!this.state.isLogin?"block":"none"}}>
                <ul>
                  <li><em className="icon i-dot"></em>【新安江】赏新安油菜花，这个 初春陪你一起过...</li>
                  <li><em className="icon i-dot"></em>【新安江】赏新安油菜花，这个 初春陪你一起过...</li>
                  <li><em className="icon i-dot"></em>【新安江】赏新安油菜花，这个 初春陪你一起过...</li>
                </ul>
              </div>
              <em className="icon i-nav-right"></em>
              <em className="icon i-wechat hp"></em>
            </div>
          </div>
        </div>
        <div className="pic_wrap"><em className="hp-1"></em></div>
        <div className="wrap">
          <div className="tab_wrap">
            <div className="tab">
              <input type="radio" ref="radio_1" name="case" value="case1" onChange={this.switchTab} defaultChecked="checked"/>
              <span>周边短途游</span>
            </div>
            <div className="tab">
              <input type="radio" ref="radio_2" name="case" value="case2" onChange={this.switchTab} />
              <span>长途深度游</span>
            </div>
            <div className="tab">
              <input type="radio" ref="radio_3" name="case" value="case3" onChange={this.switchTab} />
              <span>团队主题定制</span>
            </div>
          </div>
          <div className="case_wrap clearfix" id="case1" ref="case1">
            <div className="left">
              <em className="case"></em>
              <em className="case two"></em>
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
                           <div className="timestamp">{item.startTime}-{item.endTime}</div>
                         </a>
                       </li>
              })
            }
            </ul>
          </div>
          <div className="case_wrap clearfix" id="case2" ref="case2">
            <div className="left">
              <em className="case"></em>
              <em className="case two"></em>
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
        <div className="wrap leader">
          <ul className="leader_wrap clearfix">
            <li>
              <em className="leader leader1"></em>
              <span>精英领队：Lost</span>
            </li>
            <li>
              <em className="leader leader2"></em>
              <span>精英领队：saturn</span>
            </li>
            <li>
              <em className="leader leader3"></em>
              <span>精英领队：猴子</span>
            </li>
            <li>
              <em className="leader leader4"></em>
              <span>精英领队：老怪</span>
            </li>
            <li>
              <em className="leader leader5"></em>
              <span>精英领队：顺子大叔</span>
            </li>
            <li>
              <em className="leader leader6"></em>
              <span>精英领队：太阳</span>
            </li>
            <li>
              <em className="leader leader7"></em>
              <span>精英领队：夏天</span>
            </li>
            <li>
              <em className="leader leader8"></em>
              <span>精英领队：萧萧</span>
            </li>
            <li>
              <em className="leader leader9"></em>
              <span>精英领队：亚亚</span>
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
      </Page>
    )
  }
})

module.exports = Homepage
