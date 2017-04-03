var React = require("react")
var ReactDOM = require("react-dom")

//CSS
require("./screening.css")

//components
var Helper = require("../../components/helper/helper")
var Tripitem = require("../../components/tripitem/tripitem")
var Pagination = require("../../components/pagination/pagination")
var Ad = require("../../components/ad/ad")

var Screening = React.createClass({
  getInitialState:function(){
    return {
    	res:[{}],
    	totalCount:0,
    	pagenum:1,
    	time_tab:[true,false,false],
    	class_tab:[true,false,false,false,false],
    	festival_tab:[true,false,false,false,false,false,false,false,false,false,false],
    	price_tab:[true,false,false],
    	object:{"start_index":0,"page_size":6,"month":-1,"type":-1,"level":-1,"duration":-1,"low_price":-1,"high_price":-1,"is_long_journey":-1}
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
  	}else if(obj.month != undefined){
		this.state.object.month = obj.month;
  	}
  	this.forceUpdate();
  	console.log(this.state.object)
    var _self = this;
    Helper.send("getActivitiesAction_getActivities",_self.state.object)
      .success(function(res){
        _self.state.res = res.activities;
        _self.state.totalCount = res.totalCount;
        _self.forceUpdate();
      })
      .error(function(req){
        console.log("error : " + req)
      });
  },
  changeTab:function(e){
  	switch(e.target.name){
  		case "time_tab":
  			for (var i = 0; i < this.state.time_tab.length; i++) {
	        this.state.time_tab[i] = false;
	      };
  			this.state.time_tab[e.target.value] = true;
  			this.searchActivities({duration:e.target.value})
  			break;
  		case "class_tab":
  			for (var i = 0; i < this.state.class_tab.length; i++) {
	        this.state.class_tab[i] = false;
	      };
  			this.state.class_tab[e.target.value] = true;
  			this.searchActivities({level:e.target.value})
  			break;
  		case "festival_tab":
  			for (var i = 0; i < this.state.festival_tab.length; i++) {
	        this.state.festival_tab[i] = false;
	      };
  			this.state.festival_tab[e.target.value] = true;
  			this.searchActivities({holiday:e.target.value})
  			break;
  		case "price_tab":
  			for (var i = 0; i < this.state.price_tab.length; i++) {
	        this.state.price_tab[i] = false;
	      };
  			this.state.price_tab[e.target.value] = true;
  			if(e.target.value == "1"){
  				this.searchActivities({low_price:0,high_price:500})
  			}else if(e.target.value == "2"){
  				this.searchActivities({low_price:500,high_price:1000})
  			}else{
  				this.searchActivities({low_price:-1,high_price:-1})
  			}
  			break;
  		default:
  	}
  	this.forceUpdate();
  },
  changePage:function(start_index, page_size){
  	this.setState({pnum : start_index/6});
  	this.searchActivities({"start_index":start_index,"page_size":page_size})
  },
  render:function(){
    return(
      <div id="screening">
      	<em className="screening"></em>
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
