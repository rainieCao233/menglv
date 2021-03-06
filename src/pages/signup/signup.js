var React = require("react")
var ReactDOM = require("react-dom")

//CSS
require("./signup.css")

var Page = require("../page/page")
//components
var Helper = require("../../components/helper/helper")
var LinkageMenu = require("../../components/linkageMenu/linkageMenu")
var Counter = require("../../components/counter/counter")
var validator = require("../../components/helper/validator")
var Topbar = require("../../components/topbar/topbar")
var Slider = require("../../components/slider/slider")

var Signup = React.createClass({
  hasExpress:"none",
  getInitialState:function(){
    return {
      res:[{}],
      meetingPlaces:[{}],
      info:[1],
      detail:"",
      rewards:[],
      price:0,
      sum:0,
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
    this.postRequest({});
    this.getDiscount({})
  },
  postRequest:function(obj){
    var _self = this;
    Helper.send("orderSubmitController/initEquipments",{id:this.props.params.id})
      .success(function(res){
        _self.setState({res:res});
      })
      .error(function(req){
        console.log("error : " + req)
      });
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
          // alert("登录失败：" + req)
          _self.setState({isLogin:false})
          console.log(req)
        })
  },
  getDiscount:function(){
    var _self = this;
    Helper.send("activityDetailController/getActivityDetail",{id:this.props.params.id})
      .success(function(res){
        _self.setState({meetingPlaces:res.meetingPlaces});
        _self.setState({rewards:res.rewards});
        _self.setState({sum:res.activity.offPrice});
        _self.setState({price:res.activity.offPrice});
      })
      .error(function(req){
        console.log("error : " + req)
      });
  },
  closeModal:function(){
    this.refs.modal1.style.display = "none";
  },
  showModal:function(){
    this.refs.modal1.style.display = "block";
  },
  closeDetail:function(){
    this.refs.modal2.style.display = "none";
  },
  showDetail:function(e){
    var _self = this;
    Helper.send("equipmentOperationController/getEquipmentDetailInfo",{itemId:e.target.id})
      .success(function(res){
        _self.setState({detail:res});
        _self.refs.modal2.style.display = "block";
      })
      .error(function(req){
        console.log("error : " + req)
      });
  },
  addPerson:function(){
    this.state.info.push(1);
    this.forceUpdate();
  },
  removePerson:function(index,e){
    this.state.info.pop();
    if(navigator.userAgent.indexOf("MSIE")>0){
        e.currentTarget.parentNode.removeNode(true);
    }else{
        e.currentTarget.parentNode.remove();
    }
  },
  calculatePrice:function(p,num,index){
    console.log("calculatePrice",p,num,index);
    var elsep = 0;
    this.hasExpress = "none";
    if(num!=0){
      this.hasExpress = "block";
    }
    for (var i = 0; i < this.refs.discount1.childNodes.length; i++) {
      if(index != i){
        if(this.refs.discount1.childNodes[i].childNodes[5].childNodes[1].innerText != 0){
          elsep = (+this.refs.discount1.childNodes[i].childNodes[5].childNodes[1].innerText)*(+this.refs.discount1.childNodes[i].childNodes[4].childNodes[1].childNodes[0].childNodes[3].innerText);
          this.hasExpress = "block";
        }
      }
    };
    this.setState({sum:(this.state.price+p*num+elsep)})
  },
  submit:function(){
    var object = {
      user:{},
      equipments:[],
      deliver_type:0,
      activity_id:this.props.params.id
    }
    // 获取user—info
    var nodes = ReactDOM.findDOMNode(this.refs["info_wrap"]).childNodes;
    for (var i = 0; i < nodes.length; i++) {
      if(this.validator(nodes[i].getElementsByTagName("input"))){
        if(i == 1){
          object["participators"] = [];
        }
        if(i == 0){
          object.user.name = nodes[i].getElementsByTagName("input")[0].value;
          object.user.nickname = nodes[i].getElementsByTagName("input")[1].value;
          object.user.idcard = nodes[i].getElementsByTagName("input")[2].value;
          object.user.tel = nodes[i].getElementsByTagName("input")[3].value;
          object.user.address = nodes[i].getElementsByTagName("input")[4].id;
          object.user = JSON.stringify(object.user);
        }else{
          var temp = {};
          temp.name = nodes[i].getElementsByTagName("input")[0].value;
          temp.nickname = nodes[i].getElementsByTagName("input")[1].value;
          temp.idcard = nodes[i].getElementsByTagName("input")[2].value;
          temp.tel = nodes[i].getElementsByTagName("input")[3].value;
          temp.address = nodes[i].getElementsByTagName("input")[4].id;
          object["participators"].push(temp);
        }
      }else{
        alert("信息填写有误，请重新检查")
        return false;
      }
    };
    if(object["participators"] != undefined){
      object["participators"] = JSON.stringify(object["participators"]);
    }

    var nodes2 = ReactDOM.findDOMNode(this.refs["discount1"]).childNodes;
    for (var i = 0; i < this.state.res.length; i++) {
      var temp = {};
      temp.equipmentid = this.state.res[i].id;
      temp.number = nodes2[i].lastChild.getElementsByTagName('span')[0].innerText;
      object.equipments.push(temp);
    };
    if(object.equipments != undefined){
      object.equipments = JSON.stringify(object.equipments);
    }

    if(this.hasExpress == "block"){
      if(this.refs.expressRadio.checked){
        object.deliver_type = 1;
        if(this.refs.infoname.value != "" && validator.isPhone(this.refs.infotel.value) && this.refs.infoaddress.value != ""){
          object.deliver_name = this.refs.infoname.value;
          object.deliver_phone = this.refs.infotel.value;
          object.deliver_address = this.refs.infoaddress.value;
        }else{
          alert("快递信息填写有误");
          return false;
        }
      }else{
        object.deliver_type = 0;
      }
    }

    console.log(object)

    var _self = this;
    Helper.send("orderSubmitController/submitOrder", object)
      .success(function(res){
        console.log(res);
        Helper.forwardTo("/order/" + res);
      })
      .error(function(msg,req){
        console.log("error : " + msg);
        if(req.retcode=="0005"){
          Helper.forwardTo("/login");
        }
      });
  },
  validator:function(arr){
    if(!(arr[0].value=="") && validator.isCardID(arr[2].value) && validator.isPhone(arr[3].value) && !(arr[4].value=="")){
      return true;
    }else{
      return false;
    }
  },
  test:function(e){
    if(e.target.value == ""){
      alert("empty")
    }
  },
  testInfo:function(e){
    if(e.target.value == ""){
      alert("empty")
    }
  },
  showInfo:function(e){
    if(e.target.value == "2"){
      this.refs.expressInfo.style.display = "block";
    }else{
      this.refs.expressInfo.style.display = "none";
    }
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
    var _self = this;
    return(
      <Page isLogin={this.state.isLogin}>
      <div id="signup">
      <Topbar isLogin={this.state.isLogin}/>
      <div className="content">
        <div className="wrap">
          <div className="title">报名信息</div>
          <div className="main clearfix">
            <div className="info_wrap" ref="info_wrap">
            {
              this.state.info.map(function(item, index){
                if(index == 0){
                  return  <div className="info" ref="info" key={"info"+index}>
                            <div className="input_wrap">*姓 &nbsp; &nbsp; &nbsp; 名: <input type="text" onBlur={_self.test}/><span>(必填项)</span></div>
                            <div className="input_wrap">&nbsp;昵 &nbsp; &nbsp; &nbsp; 称: <input type="text" onBlur={_self.test}/></div>
                            <div className="input_wrap">*身份证号: <input type="text" onBlur={_self.test}/><span>(必填项)</span></div>
                            <div className="input_wrap">*手机号码: <input type="text" onBlur={_self.test} /><span>(必填项)</span></div>
                            <div className="input_wrap">*集合地点: <LinkageMenu v={_self.state.meetingPlaces}/><span>(必填项)</span></div>
                          </div>
                }else{
                  return  <div className="info" ref="info" key={"info"+index}>
                            <em className="icon i-close" onClick={_self.removePerson.bind(null,index)}></em>
                            <div className="input_wrap">*姓 &nbsp; &nbsp; &nbsp; 名: <input type="text" onBlur={_self.test}/><span>(必填项)</span></div>
                            <div className="input_wrap">&nbsp;昵 &nbsp; &nbsp; &nbsp; 称: <input type="text" onBlur={_self.test}/></div>
                            <div className="input_wrap">*身份证号: <input type="text" onBlur={_self.test}/><span>(必填项)</span></div>
                            <div className="input_wrap">*手机号码: <input type="text" onBlur={_self.test} /><span>(必填项)</span></div>
                            <div className="input_wrap">*集合地点: <LinkageMenu v={_self.state.meetingPlaces}/><span>(必填项)</span></div>
                          </div>
                }
              })
            }
            </div>
            <div className="tip">备注：身份信息仅用来购买户外专业保险，萌旅户外旅行承诺不会泄露玩家身份信息或用户其他用途</div>
              <div className="must_wrap">继续预定代表您已经阅读并同意<a href="javascript:void(0);" className="must_know" onClick={this.showModal}>《预订须知》</a></div>
            <a href="javascript:void(0);" className="signup_btn" onClick={this.addPerson}>增加报名人员</a>
            <div ref="discount1">
            {
              _self.state.res.map(function(item, index){
                return <div className="discount" key={"zb"+index}>
                          <h4>可享受优惠促销套装</h4>
                          <p className="name">{item.name}</p>
                          <p className="ruler">{item.content}</p>
                          <a href="javascript:void(0);" className="detail_btn" id={item.id} onClick={_self.showDetail}>查看详情</a>
                          <div className="price">
                            <span>市场价：<b className="before">¥{item.originalPrice}</b></span>
                            <span><b className="now">¥<span>{item.offPrice}</span></b>/份</span>
                          </div>
                        <Counter calculatePrice={_self.calculatePrice} p={item.offPrice} index={index}/>
                      </div>
              })
            }
            </div>
            <div className="discount express" style={{display:this.hasExpress}}>
              <h4>购买装备领取方式</h4>
              <input type="radio" name="expressRadio" value="1" className="express_input" onChange={this.showInfo} defaultChecked="checked"/>
              <label htmlFor="">随活动上车领取</label><br />
              <input ref="expressRadio" type="radio" name="expressRadio" value="2" className="express_input two" onChange={this.showInfo}/>
              <label htmlFor="">快递到家</label><br />
              <div className="info" ref="expressInfo">
                <h4>请填写快递信息</h4>
                <div className="input_wrap">*姓 &nbsp; &nbsp; &nbsp; 名: <input type="text" onBlur={_self.testInfo} ref="infoname"/></div>
                <div className="input_wrap">*电 &nbsp; &nbsp; &nbsp; 话: <input type="text" onBlur={_self.testInfo} ref="infotel"/></div>
                <div className="input_wrap">*地 &nbsp; &nbsp; &nbsp; 址: <input type="text" onBlur={_self.testInfo} ref="infoaddress"/></div>
              </div>
            </div>
            <div className="discount" id={this.state.rewards.length} style={{display:this.state.rewards.length>=1?"block":"none"}}>
              <h4>已享受优惠 <span>优惠说明</span></h4>
              {
                this.state.rewards.map(function(item, index){
                  if(item.type == "礼"){
                    return  <div className="detail" key={"gift"+index}>
                            <em className="icon i-gift"></em>
                            <b>【{item.name}】</b>{item.content}
                          </div>
                  }else if(item.type == "免"){
                    return <div className="detail" key={"free"+index}>
                              <em className="icon i-free"></em>
                              <b>【{item.name}】</b>{item.content}
                            </div>
                  }else if(item.type == "送"){
                    return <div className="detail" key={"give"+index}>
                              <em className="icon i-give"></em>
                              <b>【{item.name}】</b>{item.content}
                            </div>
                  }

                })
              }
            </div>
            <div className="total">
              总价 : <b>¥{this.state.sum}</b>可获积分 : {this.state.sum}
              <a href="javascript:void(0);" className="submit_btn" onClick={this.submit}>提交订单</a>
            </div>
          </div>
        </div>
        <div className="modal_wrap" ref="modal1">
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
        <div className="modal_wrap" ref="modal2">
          <div className="modal">
            <em className="icon i-close" onClick={this.closeDetail}></em>
            <div dangerouslySetInnerHTML={{__html: this.state.detail}}></div>
          </div>
        </div>
      </div>
    </div>
    </Page>
    )
  }
})

module.exports = Signup
