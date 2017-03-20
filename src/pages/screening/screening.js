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
    	object:{"start_index":0,"page_size":6,"month":-1,"type":-1,"level":-1,"duration":-1,"holiday":-1,"low_price":-1,"high_price":-1,"is_long_journey":-1}
    }
  },
  componentDidMount:function(){
  	this.searchActivities();
  },
  searchActivities:function(obj){
  	if(obj==null){

  	}else if(obj.duration != undefined){
  		this.state.object.duration = obj.duration;
  	}else if(obj.level != undefined){
  		this.state.object.level = obj.level;
  	}else if(obj.holiday != undefined){
  		this.state.object.holiday = obj.holiday;
  	}else if(obj.low_price != undefined && obj.high_price != undefined){
  		this.state.object.low_price = obj.low_price;
  		this.state.object.high_price = obj.high_price;
  	}else if(obj.start_index != undefined && obj.page_size != undefined){
  		this.state.object.start_index = obj.start_index;
  		this.state.object.page_size = obj.page_size;
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
		      			<div className="input_wrap">
		      				<span className="tab_wrap">
			      				<input type="radio" name="time_tab" value="-1" onChange={this.changeTab} defaultChecked="checked"/>
			      				<span>全部</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="time_tab" value="0" onChange={this.changeTab} />
			      				<span>1天</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="time_tab" value="1" onChange={this.changeTab} />
			      				<span>2天</span>
		      				</span>
		      			</div>
	      			</div>
	      			<div className="row">
	      				<span className="input_name">类 型</span>
		      			<div className="input_wrap">
		      				<span className="tab_wrap">
			      				<input type="radio" name="class_tab" value="-1" onChange={this.changeTab} defaultChecked="checked"/>
			      				<span>全部</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="class_tab" value="0" onChange={this.changeTab}/>
			      				<span>休闲</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="class_tab" value="1" onChange={this.changeTab} />
			      				<span>初级</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="class_tab" value="2" onChange={this.changeTab} />
			      				<span>进阶</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="class_tab" value="3" onChange={this.changeTab} />
			      				<span>高深</span>
		      				</span>
		      			</div>
	      			</div>
	      			<div className="row">
	      				<span className="input_name">节 日</span>
		      			<div className="input_wrap">
		      				<span className="tab_wrap">
			      				<input type="radio" name="festival_tab" value="-1"  onChange={this.changeTab}  defaultChecked="checked"/>
			      				<span>全部</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="festival_tab" value="0"  onChange={this.changeTab} />
			      				<span>国庆</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="festival_tab" value="1"  onChange={this.changeTab}  />
			      				<span>圣诞</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="festival_tab" value="2"  onChange={this.changeTab}  />
			      				<span>中秋</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="festival_tab" value="3"  onChange={this.changeTab}  />
			      				<span>端午</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="festival_tab" value="4"  onChange={this.changeTab}  />
			      				<span>五一</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="festival_tab" value="5"  onChange={this.changeTab}  />
			      				<span>清明</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="festival_tab" value="6"  onChange={this.changeTab}  />
			      				<span>春节</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="festival_tab" value="7"  onChange={this.changeTab}  />
			      				<span>元旦</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="festival_tab" value="8" onChange={this.changeTab} />
			      				<span>双休日</span>
		      				</span>
		      				<span className="tab_wrap">
			      				<input type="radio" name="festival_tab" value="9" onChange={this.changeTab} />
			      				<span>平日</span>
		      				</span>
		      			</div>
	      			</div>
	      			<div className="row">
	      				<span className="input_name">价 格</span>
		      			<div className="input_wrap">
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
	      		</div>
	      		<div className="operate_wrap">
	      			<span className="title">活动展示方式</span>
	      			<span className="input">
	      				<input type="radio" name="operate_tab" value="1" defaultChecked="checked"/>
	      				<span><em className="icon i-tw"></em>图文</span>
	      			</span>
	      			<span className="input">
	      				<input type="radio" name="operate_tab" value="2" />
	      				<span><em className="icon i-lb"></em>列表</span>
	      			</span>
	      		</div>
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
