var React = require("react")
var ReactDOM = require("react-dom")

//CSS
require("./order.css")

//components
var Page = require("../page/page")
var Helper = require("../../components/helper/helper")
var Topbar = require("../../components/topbar/topbar")
var Slider = require("../../components/slider/slider")

var Order = React.createClass({
  getInitialState:function(){
    return {
      aqtoggle:true,
      bxtoggle:false,
      order:{},
      activity:{},
      user:{},
      is_sale:0,
      isLogin:false,
      wxNickname:"",
      overage:"",
      score:""
    }
  },
  componentWillMount:function(){
    window.scrollTo(0,0);
    this.toLogin();
    Helper.clearTimer();
  },
  componentDidMount:function(){
    this.postRequest();
  },
  toLogin:function(){
      var _self = this;
      Helper.send("loginController/getLoginUserInfo","GET")
        .success(function(res){
          _self.state.isLogin = true;
          _self.state.wxNickname = res.wxNickname;
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
  },
  postRequest:function(){
    var _self = this;
    Helper.send("paymentController/getOrderForSuccess", {order_id:this.props.params.id})
      .success(function(res){
        console.log(res);
        _self.state.order = res.order;
        _self.state.activity = res.activity;
        _self.state.user = res.user;
        _self.state.is_sale = res.is_sale;
        _self.forceUpdate();
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
  toPay:function(){
    Helper.forwardTo("/pay/"+ this.state.order.id + "/" + encodeURIComponent(this.state.activity.title));
  },
  render:function(){
    return(
      <Page isLogin={this.state.isLogin}>
      <div id="order">
      	<Topbar isLogin={this.state.isLogin}/>
        <div className="content">
          <div className="wrap">
            <div className="title">报名信息</div>
            <div className="main clearfix">
              <ul>
                <li className="title"><h4 className="strong">订单信息: </h4> 订单号:{this.state.order.id}</li>
                <li><h4>产品名称 : </h4> {this.state.activity.title}</li>
                <li><h4>联系人 : </h4> {this.state.user.name} </li>
                <li><h4>联系方式 : </h4> {this.state.user.phoneNum} </li>
                <li><h4>出发时间 : </h4> {this.state.activity.startTime}</li>
              </ul>
              
              <div className="tip_wrap">
                <h4 className="strong">
                  保险条款
                  <span style={{display:this.state.aqtoggle?"block":"none"}} onClick={this.switch.bind(null,"aqtoggle")}>收起明细 <em className="triangle down"></em></span>
                  <span style={{display:!this.state.aqtoggle?"block":"none"}} onClick={this.switch.bind(null,"aqtoggle")}>展开明细 <em className="triangle top"></em></span>
                </h4>
                <p style={{display:this.state.aqtoggle?"block":"none"}}>1.为普及旅游安全知识以及旅游文明公约，使您的旅程顺利圆满完成，特拟定安全须知与文明公约:
                <a href="javascript:void(0);" onClick={this.aqxz}>《安全须知》</a>、<a href="javascript:void(0);" onClick={this.wmgy}>《文明公约》</a></p>
              </div>
            </div>
            <div className="order_wrap_2">
              <span>总价: &nbsp; <b>¥{this.state.order.price}</b></span>
              <a href="javascript:history.go(-1);" className="back_a_btn">返回修改</a>
              <a href="javascript:void(0)" className="topay_btn" onClick={this.toPay}>提交订单</a>
            </div>
          </div>
        </div>
      </div>
      </Page>
    )
  }
})

module.exports = Order;
// <p className="tip">付款完成后，您的邮箱将会收到加盖公章的合同，您也可以在个人中心查看和下载您的合同</p>

// <div className="tip_wrap">
//                 <h4 className="strong">
//                   保险条款
//                   <span style={{display:this.state.bxtoggle?"block":"none"}} onClick={this.switch.bind(null,"bxtoggle")}>收起明细 <em className="triangle down"></em></span>
//                   <span style={{display:!this.state.bxtoggle?"block":"none"}} onClick={this.switch.bind(null,"bxtoggle")}>展开明细 <em className="triangle top"></em></span>
//                 </h4>
//                 <p style={{display:this.state.bxtoggle?"block":"none"}}>123123</p>
//               </div>

// <div className="order_wrap">
//               <span>订单金额：<b>{this.state.order.price}</b></span>
//               <a href="javascript:void(0);" className="toPay" onClick={this.toPay}>去付款</a>
//             </div>