var React = require("react")
var ReactDOM = require("react-dom")

//CSS
require("./pay.css")

//components
var Helper = require("../../components/helper/helper")
var Topbar = require("../../components/topbar/topbar")
var Slider = require("../../components/slider/slider")

var Pay = React.createClass({
  getInitialState:function(){
    return {
      aqtoggle:true,
      bxtoggle:false
    }
  },
  componentDidMount:function(){
    this.postRequest();
  },
  postRequest:function(){
    Helper.send("activityDetailAction_getActivityDetail", {id:this.props.params.id})
      .success(function(res){
        console.log(res);
      })
      .error(function(req){
        console.log("error : " + req);
      });
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
  switch:function(type){
    switch(type){
      case "aqtoggle":
        this.state.aqtoggle = !this.state.aqtoggle;
        break;
      case "bxtoggle":
        this.state.bxtoggle = !this.state.bxtoggle;
        break;
      default:
    }
    this.forceUpdate();
  },
  aqxz:function(){
    this.refs.modal1.style.display = "block";
  },
  wmgy:function(){
    this.refs.modal2.style.display = "block";
  },
  closeModal:function(){
    this.refs.modal2.style.display = "none";
    this.refs.modal1.style.display = "none";
  },
  render:function(){
    return(
      <div id="pay">
      	<Topbar />
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
        <div className="content">
          <div className="wrap">
            <div className="title">报名信息</div>
            <div className="main clearfix">
              <ul>
                <li className="title"><h4 className="strong">订单信息: </h4>订单号:10124273920</li>
                <li><h4>产品名称 : </h4> 123123</li>
                <li><h4>联系人 : </h4> 123123</li>
                <li><h4>出发时间 : </h4> 123123</li>
                <li><h4>预定城市 : </h4> 12313</li>
                <li><h4>签约邮箱 : </h4> 123123</li>
              </ul>
              <p className="tip">付款完成后，您的邮箱将会收到加盖公章的合同，您也可以在个人中心查看和下载您的合同</p>
              <div className="tip_wrap">
                <h4 className="strong">
                  安全提示
                  <span style={{display:this.state.aqtoggle?"block":"none"}} onClick={this.switch.bind(null,"aqtoggle")}>收起明细 <em className="triangle down"></em></span>
                  <span style={{display:!this.state.aqtoggle?"block":"none"}} onClick={this.switch.bind(null,"aqtoggle")}>展开明细 <em className="triangle top"></em></span>
                </h4>
                <p style={{display:this.state.aqtoggle?"block":"none"}}>1.为普及旅游安全知识以及旅游文明公约，使您的旅程顺利圆满完成，特拟定安全须知与文明公约:
                <a href="javascript:void(0);" onClick={this.aqxz}>《安全须知》</a>、<a href="javascript:void(0);" onClick={this.wmgy}>《文明公约》</a></p>
              </div>
              <div className="tip_wrap">
                <h4 className="strong">
                  保险条款
                  <span style={{display:this.state.bxtoggle?"block":"none"}} onClick={this.switch.bind(null,"bxtoggle")}>收起明细 <em className="triangle down"></em></span>
                  <span style={{display:!this.state.bxtoggle?"block":"none"}} onClick={this.switch.bind(null,"bxtoggle")}>展开明细 <em className="triangle top"></em></span>
                </h4>
                <p style={{display:this.state.bxtoggle?"block":"none"}}>123123</p>
              </div>
            </div>
            <div className="pay_wrap">
              <span>订单金额：<b>583</b></span>
              <a href="javascript:void(0);" className="toPay">去付款</a>
            </div>
          </div>
        </div>
        <div className="modal_wrap" ref="modal1">
          <div className="modal">
            <em className="icon i-close" onClick={this.closeModal}></em>
            <h4 className="title">安全须知</h4>
            
          </div>
        </div>
        <div className="modal_wrap" ref="modal2">
          <div className="modal">
            <em className="icon i-close" onClick={this.closeModal}></em>
            <h4 className="title">wmgy</h4>
            
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Pay
