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
    	object:{"text":"","start_index":0,"page_size":6,"holiday":-1,"month":-1,"type":-1,"level":-1,"duration":-1,"low_price":-1,"high_price":-1,"is_long_journey":-1}
    }
  },
  componentWillMount:function(){
    window.scrollTo(0,0);
    this.toLogin();
    Helper.clearTimer();
  },
  componentDidMount:function(){
  	var obj = {};
  	switch(this.props.params.type){
  		case "duration":
			obj.duration = this.props.params.value;
			this.refs.time.childNodes[obj.duration==-1?0:obj.duration*1].childNodes[0].checked = true;
  			break;
  		case "level":
  			obj.level = this.props.params.value;
  			this.refs.level.childNodes[obj.level*1+1].childNodes[0].checked = true;
  			break;
  		case "type":
  			obj.type = this.props.params.value;
  			this.refs.type.childNodes[obj.type*1+1].childNodes[0].checked = true;
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
  			this.refs.month.childNodes[obj.month==-1?0:obj.month].childNodes[0].checked = true;
  			break;
  		default:
  	}
  	this.searchActivities(obj);
  },
  componentWillUnmount:function(){
    window.localStorage.text = "";
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
    if(localStorage.getItem("text")){
      this.state.object.text = localStorage.getItem("text");
    }
  	this.forceUpdate();
    var _self = this;
    Helper.send("getActivitiesController/getActivities",_self.state.object)
      .success(function(res){
        _self.state.res = res.activities;
        if(!_self.isChangePage){
          _self.state.totalCount = res.totalCount;
        }else{
          _self.isChangePage = false;
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
          // alert("登录失败：" + req)
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
    this.state.res = [];
    this.state.isSearch = !this.state.isSearch;
    this.state.pagenum = start_index/6+1;
    this.forceUpdate();
    window.scrollTo(0,document.querySelectorAll(".maodian")[0].offsetTop);
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
      <Page isLogin={this.state.isLogin} searchActivities={this.searchActivities.bind(null,this.state.object,true)}>
      <div id="screening">
      	<Topbar isLogin={this.state.isLogin}/>
        <Slider className="normal" />
      	<div className="wrap clearfix">
      		<div className="left">
	      		<div className="screening_wrap">
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
	      		<div className="maodian"></div>
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
            <div className="ad-wrap-top"></div>
	      		<ul className="hotlist">
	      			<h4>热门活动</h4>
	      			<li><div className="ad-wrap"></div></li>
	      			<li><div className="ad-wrap"></div></li>
	      			<li><div className="ad-wrap"></div></li>
	      		</ul>
						<Ad className="four" />
						<Ad className="five" />
						<Ad className="six"/>
	      	</div>
      	</div>
      </div>
      </Page>
    )
  }
})

module.exports = Screening

            // <a href="javascript:void(0);" className="tip_btn" onClick={this.showModal}>报名须知</a>