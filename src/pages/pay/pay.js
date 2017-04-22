var React = require("react")
var ReactDOM = require("react-dom")
var qr = require("qr-image")
var svgpath = require("svgpath")

//CSS
require("./pay.css")

var Page = require("../page/page")
//components
var Helper = require("../../components/helper/helper")
var Topbar = require("../../components/topbar/topbar")
var Slider = require("../../components/slider/slider")

var Pay = React.createClass({
  getInitialState:function(){
    return {
      isLogin:false,
      path:"",
    }
  },
  componentWillMount:function(){
    window.scrollTo(0,0);
    this.toLogin();
    this.timer && window.clearInterval(this.timer);
  },
  componentDidMount:function(){
    var _self = this;
    this.timer=window.setInterval(_self.postRequest,1000);
  },
  toLogin:function(){
      var _self = this;
      Helper.send("loginController/getLoginUserInfo","GET")
        .success(function(res){
          _self.state.isLogin = true;
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
    Helper.send("paymentController/searchOrderStatus", {order_id:_self.props.params.id})
    .success(function(res){
      if(res == 1){
        window.clearInterval(_self.timer);
        _self.refs.modal2.style.display = "block";
      }
    })
    .error(function(req){
      console.log("error : " + req);
    });
  },
  changeTab:function(e){
    switch(e.target.value){
      case "1":
        this.refs.modal1.style.display = "none";
        this.forceUpdate();
        alert("支付宝还没开通");
        break;
      case "2":
        this.refs.modal1.style.display = "block";
        var _self = this;
        var title = decodeURIComponent(this.props.params.title);
        Helper.send("paymentController/getCodeUrl", {order_id:this.props.params.id,body:title})
        .success(function(res){
          _self.state.path = res;
          _self.refs.modal2.style.display = "block";
          _self.forceUpdate();
        })
        .error(function(req){
          console.log("error : " + req);
        });
        break;
      default:
        this.refs.modal1.style.display = "none";
    }
    e.stopPropagation();
  },
  backToOrder:function(){
    Helper.goBack();
  },
  closeModal:function(){
    this.refs.modal2.style.display = "none";
    Helper.forwardTo("/");
  },
  render:function(){
    return(
      <Page isLogin={this.state.isLogin}>
      <div id="pay">
      	<Topbar isLogin={this.state.isLogin}/>
        <div className="content">
          <div className="wrap">
            <div className="title">
              <a href="javascript:void(0);" onClick={this.backToOrder}>返回订单信息</a>
              <span><b><i>1</i></b>信息核对付款 <i>2</i>付款成功</span>
            </div>
            <div className="main_wrap clearfix">
              <div className="main">
                <h4>请点击选择付款方式:</h4>
                <ul className="pay_list clearfix">
                  <li>
                    <input type="radio" value="1" name="pay" onChange={this.changeTab}/>
                    <span><b></b></span>
                    <em className="icon i-zfb"></em>
                  </li>
                  <li>
                    <input type="radio" value="2" name="pay" onChange={this.changeTab}/>
                    <span><b></b></span>
                    <em className="icon i-weixin"></em>
                  </li>
                </ul>
                <p className="line"></p>
                <h4>其他付款方式:</h4>
                <p>请联系客服，我们将竭诚为您服务。</p>
                <p>客服热线：<b>021-52277179</b></p>
              </div>
              <div className="modal" ref="modal1">
                <em className="i-loading"></em>
                <p>扫码支付:</p>
                <div className="qrcode">
                  <svg width="150px" height="150px">
                    <path d={this.state.path?svgpath(qr.svgObject(this.state.path).path).scale(5, 5).toString():null} />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="alertModal" ref="modal2">
          <div>
            <p className="title"><em className="icon i-succ"></em>您已成功付款</p>
            <p className="content">我们已经受到您的订单，祝您旅途愉快</p>
            <a href="javascript:void(0);" onClick={this.closeModal}>确     认</a>
          </div>
        </div>
      </div>
      </Page>
    )
  }
})

module.exports = Pay;
