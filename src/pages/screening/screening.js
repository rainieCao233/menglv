var React = require("react")
var ReactDOM = require("react-dom")

//CSS
require("./screening.css")

var Page = require("../page/page")
//components
var Helper = require("../../components/helper/helper")
var Tripitem = require("../../components/tripitem/tripitem")
var Pagination = require("../../components/pagination/pagination")
var Ad = require("../../components/ad/ad")
var Topbar = require("../../components/topbar/topbar")
var Slider = require("../../components/slider/slider")

var Screening = React.createClass({
  isChangePage:false,
  getInitialState:function(){
    return {
    	res:[],
    	totalCount:0,
    	pagenum:1,
      isLogin:false,
      wxNickname:"",
      overage:"",
      score:"",
    	time_tab:[true,false,false],
    	level_tab:[true,false,false,false,false],
    	type_tab:[true,false,false,false,false,false,false,false,false,false,false],
    	price_tab:[true,false,false],
    	month_tab:[true,false,false,false,false,false,false,false,false,false,false,false,false],
    	object:{"start_index":0,"page_size":6,"holiday":-1,"month":-1,"type":-1,"level":-1,"duration":-1,"low_price":-1,"high_price":-1,"is_long_journey":-1}
    }
  },
  componentWillMount:function(){
    window.scrollTo(0,0);
    this.toLogin();
  },
  componentDidMount:function(){
  	var obj = {};
  	switch(this.props.params.type){
  		case "duration":
			obj.duration = this.props.params.value;
			this.refs.time.childNodes[obj.duration].childNodes[0].checked = true;
  			break;
  		case "level":
  			obj.level = this.props.params.value;
  			this.refs.level.childNodes[obj.level].childNodes[0].checked = true;
  			break;
  		case "type":
  			obj.type = this.props.params.value;
  			this.refs.type.childNodes[obj.type].childNodes[0].checked = true;
  			break;
  		case "price":
  			if(this.props.params.value==1){
  				obj.low_price = 0;
  				obj.high_price = 500;
  				this.refs.price.childNodes[1].childNodes[0].checked = true;
  			}else if(this.props.params.value==2){
  				obj.low_price = 500;
  				obj.high_price = 1000;
  				this.refs.price.childNodes[2].childNodes[0].checked = true;
  			}
  			break;
  		case "month":
  			obj.month = this.props.params.value;
  			this.refs.month.childNodes[obj.month].childNodes[0].checked = true;
  			break;
  		default:
  	}
  	this.searchActivities(obj);
  },
  searchActivities:function(obj,isTab){
  	if(obj==null){

  	}else if(obj.duration != undefined){
  		this.state.object.duration = obj.duration;
  	}else if(obj.level != undefined){
  		this.state.object.level = obj.level;
  	}else if(obj.type != undefined){
  		this.state.object.type = obj.type;
  	}else if(obj.low_price != undefined && obj.high_price != undefined){
  		this.state.object.low_price = obj.low_price;
  		this.state.object.high_price = obj.high_price;
  	}else if(obj.start_index != undefined && obj.page_size != undefined){
  		this.state.object.start_index = obj.start_index;
  		this.state.object.page_size = obj.page_size;
      this.isChangePage = true;
  	}else if(obj.month != undefined){
		  this.state.object.month = obj.month;
  	}
    if(isTab){
      this.state.object.page_size = 6;
      this.state.object.start_index = 0;
    }
  	this.forceUpdate();
  	console.log(this.state.object)
    var _self = this;
    Helper.send("getActivitiesController/getActivities",_self.state.object)
      .success(function(res){
        _self.state.res = res.activities;
        if(!this.isChangePage){
          _self.state.totalCount = res.totalCount;
        }else{
          this.isChangePage = false;
        }
        _self.forceUpdate();
      })
      .error(function(req){
        console.log("error : " + req);
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
          alert("登录失败：" + req)
          _self.setState({isLogin:false})
          console.log(req)
        })
  },
  changeTab:function(e){
    console.log(e.target.name)
    this.state.pagenum = 1;
    switch(e.target.name){
      case "time_tab":
        for (var i = 0; i < this.state.time_tab.length; i++) {
          this.state.time_tab[i] = false;
        };
        this.state.time_tab[e.target.value] = true;
        this.searchActivities({duration:e.target.value},true)
        break;
      case "level_tab":
        for (var i = 0; i < this.state.level_tab.length; i++) {
          this.state.level_tab[i] = false;
        };
        this.state.level_tab[e.target.value] = true;
        this.searchActivities({level:e.target.value},true)
        break;
      case "type_tab":
        for (var i = 0; i < this.state.type_tab.length; i++) {
          this.state.type_tab[i] = false;
        };
        this.state.type_tab[e.target.value] = true;
        this.searchActivities({type:e.target.value},true)
        break;
      case "price_tab":
        for (var i = 0; i < this.state.price_tab.length; i++) {
          this.state.price_tab[i] = false;
        };
        this.state.price_tab[e.target.value] = true;
        if(e.target.value == "0"){
          this.searchActivities({low_price:0,high_price:500},true)
        }else if(e.target.value == "1"){
          this.searchActivities({low_price:500,high_price:1000},true)
        }else{
          this.searchActivities({low_price:-1,high_price:-1},true)
        }
        break;
      case "month_tab":
        for (var i = 0; i < this.state.month_tab.length; i++) {
          this.state.month_tab[i] = false;
        };
        this.state.month_tab[e.target.value] = true;
        this.searchActivities({month:e.target.value},true)
        break;
      default:
    }
    this.forceUpdate();
  },
  changePage:function(start_index, page_size){
    this.setState({pnum : start_index/6});
    this.setState({isSearch:!this.state.isSearch});
    this.searchActivities({"start_index":start_index,"page_size":page_size})
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
  showModal:function(){
    this.refs.modal2.style.display = "block";
  },
  closeModal:function(){
    this.refs.modal2.style.display = "none";
  },
  render:function(){
    return(
      <Page isLogin={this.state.isLogin}>
      <div id="screening">
      	<Topbar isLogin={this.state.isLogin}/>
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
                  <li>网名：{this.state.wxNickname?this.state.wxNickname:""}</li>
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
      	<div className="wrap clearfix">
      		<div className="left">
	      		<div className="screening_wrap">
	      			<div className="row">
	      				<span className="input_name">时 间</span>
		      			<div className="input_wrap" ref="time">
		      				<span className="tab_wrap">
			      				<input type="radio" name="time_tab" value="-1" onChange={this.changeTab} defaultChecked="checked"/>
			      				<span>全部</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="time_tab" value="1" onChange={this.changeTab} />
			      				<span>1天</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="time_tab" value="2" onChange={this.changeTab} />
			      				<span>2天</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="time_tab" value="3" onChange={this.changeTab} />
			      				<span>3天</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="time_tab" value="4" onChange={this.changeTab} />
			      				<span>4天</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="time_tab" value="5" onChange={this.changeTab} />
			      				<span>5天</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="time_tab" value="6" onChange={this.changeTab} />
			      				<span>6天</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="time_tab" value="7" onChange={this.changeTab} />
			      				<span>7天</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="time_tab" value="8" onChange={this.changeTab} />
			      				<span>8天</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="time_tab" value="9" onChange={this.changeTab} />
			      				<span>9天</span>
		      				</span>
		      			</div>
	      			</div>
	      			<div className="row">
	      				<span className="input_name">等 级</span>
		      			<div className="input_wrap" ref="level">
		      				<span className="tab_wrap">
			      				<input type="radio" name="level_tab" value="-1" onChange={this.changeTab} defaultChecked="checked"/>
			      				<span>全部</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="level_tab" value="0" onChange={this.changeTab}/>
			      				<span>休闲</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="level_tab" value="1" onChange={this.changeTab} />
			      				<span>初级</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="level_tab" value="2" onChange={this.changeTab} />
			      				<span>进阶</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="level_tab" value="3" onChange={this.changeTab} />
			      				<span>高深</span>
		      				</span>
		      			</div>
	      			</div>
	      			<div className="row">
	      				<span className="input_name">类 型</span>
		      			<div className="input_wrap" ref="type">
		      				<span className="tab_wrap">
			      				<input type="radio" name="type_tab" value="-1"  onChange={this.changeTab}  defaultChecked="checked"/>
			      				<span>全部</span>
		      				</span>
		      				<span className="tab_wrap lg">
			      				<input type="radio" name="type_tab" value="0"  onChange={this.changeTab} />
			      				<span>轻装(农家)</span>
		      				</span>
		      				<span className="tab_wrap lg">
			      				<input type="radio" name="type_tab" value="1"  onChange={this.changeTab}  />
			      				<span>重装(露营)</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="type_tab" value="2"  onChange={this.changeTab}  />
			      				<span>水线</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="type_tab" value="3"  onChange={this.changeTab}  />
			      				<span>长线</span>
		      				</span>
		      				<span className="tab_wrap lg">
			      				<input type="radio" name="type_tab" value="4"  onChange={this.changeTab}  />
			      				<span>技术路线</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="type_tab" value="5"  onChange={this.changeTab}  />
			      				<span>单日</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="type_tab" value="6"  onChange={this.changeTab}  />
			      				<span>室内</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="type_tab" value="7"  onChange={this.changeTab}  />
			      				<span>初体验</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="type_tab" value="8" onChange={this.changeTab} />
			      				<span>海岛</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="type_tab" value="9" onChange={this.changeTab} />
			      				<span>特价</span>
		      				</span>
		      			</div>
	      			</div>
	      			<div className="row">
	      				<span className="input_name">价 格</span>
		      			<div className="input_wrap" ref="price">
		      				<span className="tab_wrap">
			      				<input type="radio" name="price_tab" value="-1" onChange={this.changeTab}  defaultChecked="checked"/>
			      				<span>全部</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="price_tab" value="0" onChange={this.changeTab} />
			      				<span>0-500</span>
		      				</span>
		      				<span className="tab_wrap lg">
			      				<input type="radio" name="price_tab" value="1" onChange={this.changeTab}  />
			      				<span>500-1000</span>
		      				</span>
		      			</div>
	      			</div>
	      			<div className="row">
	      				<span className="input_name">月 份</span>
		      			<div className="input_wrap" ref="month">
		      				<span className="tab_wrap">
			      				<input type="radio" name="month_tab" value="-1" onChange={this.changeTab}  defaultChecked="checked"/>
			      				<span>全部</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="month_tab" value="1" onChange={this.changeTab} />
			      				<span>一月</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="month_tab" value="2" onChange={this.changeTab}  />
			      				<span>二月</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="month_tab" value="3" onChange={this.changeTab}  />
			      				<span>三月</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="month_tab" value="4" onChange={this.changeTab}  />
			      				<span>四月</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="month_tab" value="5" onChange={this.changeTab}  />
			      				<span>五月</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="month_tab" value="6" onChange={this.changeTab}  />
			      				<span>六月</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="month_tab" value="7" onChange={this.changeTab}  />
			      				<span>七月</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="month_tab" value="8" onChange={this.changeTab}  />
			      				<span>八月</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="month_tab" value="9" onChange={this.changeTab}  />
			      				<span>九月</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="month_tab" value="10" onChange={this.changeTab}  />
			      				<span>十月</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="month_tab" value="11" onChange={this.changeTab}  />
			      				<span>十一月</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="month_tab" value="12" onChange={this.changeTab}  />
			      				<span>十二月</span>
		      				</span>
		      			</div>
	      			</div>
	      		</div>
	      		<a className="operate_wrap" href="#product_more"></a>
	      		<ul className="triplist">
	      		{
              this.state.res.map(function(item, index){
                return <Tripitem key={"trip"+index} type="1" v={item}/>
              })
	      		}
	      		</ul>
	      		<Pagination num={this.state.totalCount} pagenum={this.state.pagenum} click={this.changePage}/>
	      	</div>
	      	<div className="right">
	      		<div className="ad-wrap"></div>
	      		<ul className="hotlist">
	      			<h4>热门活动</h4>
	      			<li><div className="ad-wrap"></div></li>
	      			<li><div className="ad-wrap"></div></li>
	      			<li><div className="ad-wrap"></div></li>
	      		</ul>
						<Ad imgName="detail_footer.png"/>
						<Ad imgName="detail_footer.png"/>
						<Ad imgName="detail_footer.png"/>
						<Ad imgName="detail_footer.png"/>
						<Ad imgName="detail_footer.png"/>
						<a href="javascript:void(0);" className="tip_btn" onClick={this.showModal}>报名须知</a>
						<a href="javascript:void(0);" className="tip_btn">支付方式</a>
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
      </Page>
    )
  }
})

module.exports = Screening