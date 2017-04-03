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
      participtors:[],
      pnum:0
    }
  },
  componentDidMount:function(){
    this.postRequest({});
  },
  postRequest:function(obj){
    var _self = this;
    Helper.send("activityDetailAction_getActivityDetail",{id:_self.props.params.id})
      .success(function(res){
        _self.setState({activity:res.activity});
        _self.setState({leaders:res.leaders});
        _self.setState({types:res.types});
        _self.setState({meetingPlaces:res.meetingPlaces});
        _self.setState({participtors:res.participtors});
        // _self.setState({pnum:participtors})
        for (var i = 0; i < res.participtors.length; i++) {
          _self.state.pnum += res.participtors[i][1];
        };
        _self.forceUpdate();
      })
      .error(function(req){
        console.log("error : " + req)
      });
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
  showLeader:function(){
    this.refs.modal1.style.display = "block";
  },
  closeLeader:function(){
    this.refs.modal1.style.display = "none";
  },
  showModal:function(){
    this.refs.modal2.style.display = "block";
  },
  closeModal:function(){
    this.refs.modal2.style.display = "none";
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
                <li>报名截止时间 : {this.state.activity.signUpEndTime}</li>
                <li>活动人数(限额) : {this.state.pnum}/{this.state.activity.maxPeople} (报名数 / 人数限制)</li>
                <li>带队领队 : {this.state.leaders[0].name} <a href="javascript:void(0);" onClick={this.showLeader}>查看领队情况</a></li>
                <li>领队手机号码 : {this.state.leaders[0].phoneNum}<a href="javascript:void(0);" onClick={this.showModal}>点击查看报名须知</a></li>
              </ul>
              <a href={"/#/signup/"+this.props.params.id} className="intro_btn">活动进行中</a>
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
            <Recommendation activityId={this.props.params.id} />
          </div>
          <div className="sidebar_wrap">
            <div className="applicant_wrap">
              <h4>报名名单</h4>
              <ul className="clearfix">
              {
                this.state.participtors.map(function(item, index){
                  var src = item[0].headPicRoute?item[0].headPicRoute:"../../imgs/avator.png";
                  var name = item[0].name?item[0].name:"非微信报名";
                  return <li key={"user"+index}><img src={src} alt="" key={"user"+index} /><span>{name}</span></li>;
                })
              }
              </ul>
            </div>
            <EnrollmentSituation title={this.state.activity.title} id={this.props.params.id}/>
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
        <div className="modal_wrap" ref="modal1">
          <div className="modal">
            <em className="icon i-close" onClick={this.closeLeader}></em>
            <div dangerouslySetInnerHTML={{__html: this.state.leaders[0].detailInfo}}></div>
          </div>
        </div>
        <div className="modal_wrap" ref="modal2">
          <div className="modal">
            <em className="icon i-close" onClick={this.closeModal}></em>
            <h4 className="title">萌驴户外旅行平台使用协议</h4>
            <p>萌驴户外旅行平台是指域名为”shmlhw”的网站（包括但不限于萌驴户外旅行网站所附属的APP、微信公众号等）是由上海萌驴户外用品有限公司（以下简称：萌驴户外旅行）独立开发并运营的互联网信息服务平台。
            </p>
            <p>萌驴户外旅行在此提醒用户认真阅读并充分理解本协议各条款，理解双方的权利和义务、争议解决和法律适用等。请用户认真阅读并选择接受和不接受本协议。除非用户接受本协议所有条款，否则用户无权使用萌驴户外旅行网站的服务。此条款同样适用于萌驴户外旅行网站所属于的APP、微信公众号等。</p>
            <p>1.  当用户选择访问或使用于本网站有关服务，将视为同意接受本协议全部条款的约束。</p>
            <p>2.  除非另外明确规定，本网站所推出的所有产品，均无条件的适用本协议。本网站保留在任何时候修改本协议条款的权利，且无需另行通和右，用户在使用服务时应及时关注并遵守。 </p>
            <p>3.  萌驴户外旅行网站是户外出行产品的服务交易平台，包括但不限于户外活动出行信息服务和户外装备服务。用户预订该产品的服务性质归属于萌驴户外旅行与领队签订户外出行服务协议。用户在萌驴户外旅行网站上预订户外产品时请一定仔细阅读此产品的各项信息，提交订单即为用户接受此产品预订及退订的各项政策。萌驴户外旅行网站上发布的户外出行产品信息内容均由对应领队提供服务并自行负责，萌驴户外旅行仅对商户所提供的产品进行规范化陈列与梳理，对所提供的户外出行产品不承担任何形式的法律责任。 </p>
            <p>4. 符合下列条件之一的个人、组织才能成为本网站的用户：（1）用户应当具 备使用本网站和/或在本网站购物网购买产品、享受服务的完全民事行为能力，并承诺对相关行为承担相应的法律责任。（2）不具备上述资格的人不得成为本网站用户。由于网络平台，本网站无法严格审核每位用户的真实情况，如果不具备上述资格的人使用本网站，则导致的任何不良后果与本网站无关。 </p>
            <p>5.  使用条款：（1）使用本网站时，用户须遵守国家的法律法规和规章制度，遵守网站有关协议、规定、规则、程序和惯例，不得利用本网站从事任何非法或不正当活动。用户不得利用网站从事任何非法或不正当活动。用户不得在本网站发布各类违法或违规信息，包括但不限于商品信息、交易信息、社区贴子、商品留言，评价内容等 ；用户不得以服务不满意为由肆意放大本网站负面信息，恶意诽谤、造谣、诋毁和侵割包括不限于萌驴户外旅行和其它方的名誉。（2）用户预定产品时提供的信息等资料系真实、准确、完整、合法，该资料但不限于真实姓名和名称、身份证号、护照号、护照有效期、联系电话、地址等；用户保证本网站及其它必要第三方可以通过上述联系方式与自己进行联系；用户也应在相关资料实际变更时，预以及时更新，萌驴户外旅行对用户提供信息予以保密。</p>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Detail
