var React = require("react")
var ReactDOM = require("react-dom")

//CSS
require("./detail.css")

//components
var Helper = require("../../components/helper/helper")
var Recommendation = require("../../components/recommendation/recommendation")
var Ad = require("../../components/ad/ad")
var Topbar = require("../../components/topbar/topbar")
var EnrollmentSituation = require("../../components/enrollmentSituation/enrollmentSituation")

var Detail = React.createClass({
  getInitialState:function(){
    return {
      activity:{},
      leaders:[{}],
      types:[{}],
      meetingPlaces:[{}],
      participtors:[[],[]]
    }
  },
  componentDidMount:function(){
    this.postRequest({});
  },
  postRequest:function(obj){
    var _self = this;
    // Helper.send("activityDetailAction_getActivityDetail",{id:this.props.params.id})
    Helper.send("detail",{id:this.props.params.id})
      .success(function(res){
        _self.setState({activity:res.activity});
        _self.setState({leaders:res.leaders});
        _self.setState({types:res.types});
        _self.setState({meetingPlaces:res.meetingPlaces});
        _self.setState({participtors:res.participtors});
        
      })
      .error(function(req){
        console.log("error : " + req)
      });
      console.log(this.state.participtors)
  },
  changeTab:function(e){
    console.log(e.target.value)
    this.refs.main_1.style.display = "none";
    this.refs.main_2.style.display = "none";
    this.refs.main_3.style.display = "none";
    this.refs.main_4.style.display = "none";

    switch(e.target.value){
      case "1":
        this.refs.main_1.style.display = "block";
        break;
      case "2":
        this.refs.main_2.style.display = "block";
        break;
      case "3":
        this.refs.main_3.style.display = "block";
        break;
      case "4":
        this.refs.main_4.style.display = "block";
        break;
      default:

    } 
  }, 
  render:function(){
    return(
      <div id="detail">
        <Topbar />
      	<div className="wrap clearfix">
      		<div className="breadcrumb">您当前的位置：首页 / 短途旅行</div>
          <div className="intro_wrap clearfix">
            <div className="pic_wrap">
              <a href="javascript:void(0);" className="pic"></a>
              <div className="share_wrap">
                <em className="icon i-add"></em>
                分享到 :
                <em className="icon i-wechat-sm"></em>
              </div>
              <div className="collect_wrap">
                <em className="icon i-collect"></em>
                收藏此活动
              </div>
            </div>
            <div className="intro">
              <div className="name">{this.state.activity.title}</div>
              <ul>
                <li>活动费用 : ¥ {this.state.activity.originalPrice}.00</li>
                <li>活动日期 : {this.state.activity.startTime} - {this.state.activity.endTime}</li>
                <li>活动类型 : {this.state.types[0].type}</li>
                <li>活动地点 : {this.state.activity.destination}</li>
                <li>出发地 : {this.state.meetingPlaces[0].placeName}</li>
                <li>住宿方式 : 农家或露营???</li>
                <li>报名截止时间 : {this.state.activity.signUpEndTime}</li>
                <li>活动人数(限额) : ???/{this.state.activity.maxPeople} (报名数 / 人数限制)</li>
                <li>带队领队 : {this.state.leaders[0].name} <a href="#">查看领队情况</a></li>
                <li>领队手机号码 : {this.state.leaders[0].phoneNum}</li>
                <li>俱乐部号码 : 021-50585977/53068776??? <a href="#">点击查看报名须知</a></li>
              </ul>
              <a href="" className="intro_btn">活动进行中</a>
              <span className="vip">成为<b>VIP</b>，有更多的福利和优惠哦！</span>
            </div>
          </div>
          <div className="detail_wrap">
            <div className="tab_wrap">
              <div className="tab">
                <input type="radio" name="detail_radio" value="1"  onChange={this.changeTab} defaultChecked="checked"/>
                <span>目的地</span>
              </div>
              <div className="tab">
                <input type="radio" name="detail_radio" value="2" onChange={this.changeTab} />
                <span>详细行程</span>
              </div>
              <div className="tab">
                <input type="radio" name="detail_radio" value="3" onChange={this.changeTab} />
                <span>费用说明</span>
              </div>
              <div className="tab">
                <input type="radio" name="detail_radio" value="4" onChange={this.changeTab} />
                <span>预订须知</span>
              </div>
            </div>
            <div className="main_wrap" ref="main">
              <div className="main" ref="main_1" dangerouslySetInnerHTML={{__html:this.state.activity.content1}}></div>
              <div className="main" ref="main_2" dangerouslySetInnerHTML={{__html:this.state.activity.content2}}></div>
              <div className="main" ref="main_3" dangerouslySetInnerHTML={{__html:this.state.activity.content3}}></div>
              <div className="main" ref="main_4" dangerouslySetInnerHTML={{__html:this.state.activity.content4}}></div>
            </div>
            <Recommendation />
          </div>
          <div className="sidebar_wrap">
            <div className="applicant_wrap">
              <h4>报名名单</h4>
              <ul className="clearfix">
                <li><img src="" alt="" /><span>{}</span></li>
                <li><img src="" alt="" /><span>{}</span></li>
                <li><img src="" alt="" /><span>{}</span></li>
                <li><img src="" alt="" /><span>{}</span></li>
                <li><img src="" alt="" /><span>{}</span></li>
                <li><img src="" alt="" /><span>{}</span></li>
              </ul>
            </div>
            <EnrollmentSituation />
            <div className="ad-wrap"></div>
            <Ad href="http://www.baidu.com" imgName="detail_footer.png"/>
            <Ad href="http://www.baidu.com" imgName="detail_footer.png"/>
            <Ad href="http://www.baidu.com" imgName="detail_footer.png"/>
          </div>
      	</div>
        <div className="footer_wrap">
          <div className="detail-footer-pic"></div>
          <ul className="record clearfix">
            <li>
              <span><b>8000+</b>次</span><br />户外活动
            </li>
            <li>
              <span><b>6178+</b>米</span><br />攀登记录
            </li>
            <li>
              <span><b>16+</b>座</span><br />雪山攀登
            </li>
            <li>
              <span><b>28+</b>天</span><br />徒步穿越记录
            </li>
            <li>
              <span><b>2000+</b>次</span><br />承接团队策划
            </li>
          </ul>
        </div>
      </div>
    )
  }
})

module.exports = Detail
