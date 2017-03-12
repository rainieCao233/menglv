var React = require("react")
var ReactDOM = require("react-dom")

//CSS
require("./signup.css")

//components
var Helper = require("../../components/helper/helper")
var LinkageMenu = require("../../components/linkageMenu/linkageMenu")
var Counter = require("../../components/counter/counter")

var Signup = React.createClass({
  getInitialState:function(){
    return {
      res:[{}],
      number:1,
      detail:""
    }
  },
  componentDidMount:function(){
    this.postRequest({});
  },
  postRequest:function(obj){
    var _self = this;
    Helper.send("orderSubmitAction_initEquipments",{id:this.props.params.id})
      .success(function(res){
        _self.setState({res:res});
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
  showDetail:function(){
    var _self = this;
    Helper.send("equipmentOperationAction_getEquipmentDetailInfo",{itemId:this.props.params.id})
      .success(function(res){
        _self.setState({detail:res});
        _self.refs.modal2.style.display = "block";
      })
      .error(function(req){
        console.log("error : " + req)
      });
  },
  addPerson:function(){
    this.setState({number:number+1});
  },
  render:function(){
    var _self = this;
    return(
      <div id="signup">
        <div className="wrap">
          <div className="title">报名信息</div>
          <div className="main clearfix">
            <div className="info_wrap" ref="info_wrap">
              <div className="info" ref="info">
                <div className="input_wrap">*姓 &nbsp; &nbsp; &nbsp; 名: <input type="text" /></div>
                <div className="input_wrap">*昵 &nbsp; &nbsp; &nbsp; 称: <input type="text" /></div>
                <div className="input_wrap">*身份证号: <input type="text" /></div>
                <div className="input_wrap">*手机号码: <input type="text" /></div>
                <div className="input_wrap">*集合地点: <LinkageMenu /></div>
              </div>
            </div>
            <a href="javascript:void(0);" className="signup_btn" onClick={this.addPerson}>增加报名人员</a>
            {
              _self.state.res.map(function(item, index){
                return <div className="discount" key={"zb"+index}>
                          <h4>可享受优惠促销套装</h4>
                          <p className="name">{item.name}</p>
                          <p className="ruler">{item.content}</p>
                          <a href="javascript:void(0);" className="detail_btn" onClick={_self.showDetail}>查看详情</a>
                          <div className="price">
                            <span>市场价：<b className="before">¥{item.originalPrice}</b></span>
                            <span><b className="now">¥{item.offPrice}</b>/份</span>
                          </div>
                        <Counter />
                      </div>
              })
            }

            <div className="discount">
              <h4>已享受优惠 <span>优惠说明</span></h4>
              <div className="detail">
                <em className="icon i-gift"></em>
                <b>【新人红包】</b>首次参加活动立减10
              </div>
              <div className="detail">
                <em className="icon i-free"></em>
                <b>【免单抽奖】</b>分享照片，赢取活动免单
              </div>
              <div className="detail">
                <em className="icon i-give"></em>
                <b>【携朋带友】</b>带朋友参加活动送豪华户外装备
              </div>
              <div className="tip">备注：身份信息仅用来购买户外专业保险，萌旅户外旅行承诺不会泄露玩家身份信息或用户其他用途</div>
              <div className="must_wrap">继续预定代表您已经阅读并同意<a href="javascript:void(0);" className="must_know" onClick={this.showModal}>预订须知</a></div>
            </div>
            <div className="total">
              总价 : <b>¥569</b>可获积分 : 569
              <a href="" className="submit_btn">提交订单</a>
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
    )
  }
})

module.exports = Signup
