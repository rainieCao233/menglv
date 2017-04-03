var React = require("react")
var ReactDOM = require("react-dom")

//CSS
require("./screening.css")

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
    	res:[{}],
    	totalCount:0,
    	pagenum:1,
    	time_tab:[true,false,false],
    	level_tab:[true,false,false,false,false],
    	type_tab:[true,false,false,false,false,false,false,false,false,false,false],
    	price_tab:[true,false,false],
    	month_tab:[true,false,false,false,false,false,false,false,false,false,false,false,false],
    	object:{"start_index":0,"page_size":6,"holiday":-1,"month":-1,"type":-1,"level":-1,"duration":-1,"low_price":-1,"high_price":-1,"is_long_journey":-1}
    }
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
  searchActivities:function(obj){
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
  	this.forceUpdate();
  	console.log(this.state.object)
    var _self = this;
    Helper.send("getActivitiesAction_getActivities",_self.state.object)
      .success(function(res){
        _self.state.res = res.activities;
        if(!isChangePage){
          _self.state.totalCount = res.totalCount;
        }
        _self.forceUpdate();
      })
      .error(function(req){
        console.log("error : " + req)
      });
  },
  changeTab:function(e){
  	console.log(e.target.name)
  	switch(e.target.name){
  		case "time_tab":
  			for (var i = 0; i < this.state.time_tab.length; i++) {
	        this.state.time_tab[i] = false;
	      };
  			this.state.time_tab[e.target.value] = true;
  			this.searchActivities({duration:e.target.value})
  			break;
  		case "level_tab":
  			for (var i = 0; i < this.state.level_tab.length; i++) {
	        this.state.level_tab[i] = false;
	      };
  			this.state.level_tab[e.target.value] = true;
  			this.searchActivities({level:e.target.value})
  			break;
  		case "type_tab":
  			for (var i = 0; i < this.state.type_tab.length; i++) {
	        this.state.type_tab[i] = false;
	      };
  			this.state.type_tab[e.target.value] = true;
  			this.searchActivities({type:e.target.value})
  			break;
  		case "price_tab":
  			for (var i = 0; i < this.state.price_tab.length; i++) {
	        this.state.price_tab[i] = false;
	      };
  			this.state.price_tab[e.target.value] = true;
  			if(e.target.value == "0"){
  				this.searchActivities({low_price:0,high_price:500})
  			}else if(e.target.value == "1"){
  				this.searchActivities({low_price:500,high_price:1000})
  			}else{
  				this.searchActivities({low_price:-1,high_price:-1})
  			}
  			break;
  		case "month_tab":
  			for (var i = 0; i < this.state.month_tab.length; i++) {
	        this.state.month_tab[i] = false;
	      };
  			this.state.month_tab[e.target.value] = true;
  			this.searchActivities({month:e.target.value})
  			break;
  		default:
  	}
  	this.forceUpdate();
  },
  changePage:function(start_index, page_size){
  	this.setState({pnum : start_index/6});
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
  render:function(){
    return(
      <div id="screening">
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
	      		<div className="operate_wrap"></div>
	      		<ul className="triplist">
	      		{
	      			this.state.res.map(function(item, index){
	      				return <Tripitem key={"trip"+index} type="1" v={item}/>
	      			})
	      		}
	      		</ul>
	      		<Pagination num={this.state.totalCount} click={this.changePage}/>
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
						<a href="" className="tip_btn">报名须知</a>
						<a href="" className="tip_btn">支付方式</a>
	      	</div>
      	</div>
      </div>
    )
  }
})

module.exports = Screening
