var React = require('react');
var helper = require('../helper/helper')

//CSS
require("./recommendation.css")

var Helper = require('../helper/helper')

//跳转伪装标签
var Recommendation = React.createClass({

	onClick:function(){

	},
	getInitialState:function(){
    return {
      activityList:[{}]
    }
  },
	componentDidMount:function(){
	    this.postRequest({});
	  },
  postRequest:function(obj){
    var _self = this;
    Helper.send("activityDetailController/getSimilarActivities",{id:this.props.activityId})
      .success(function(res){
        _self.setState({activityList:res});
      })
      .error(function(req){
        console.log("error : " + req)
      });
  },
  jump:function(id){
  	window.scrollTo(0,0);
  	Helper.forwardTo("/detail/"+id);
  },
	render:function(){
		var _self = this;
		if(this.state.activityList && this.state.activityList.length>0){
			return (
				<div id="recommendation">
					<h4>近期活动推荐</h4>
					<ul className="item_wrap clearfix">
					{
						this.state.activityList.map(function(item, index){
							return <li key={"recommendation"+index}><a href="javascript:void(0);" onClick={_self.jump.bind(null,item.id)}><img src={item.mainPicRoute} /><div className='name'>{item.title}</div><div className='time'>时间: {item.startTime}</div></a></li>
						})
					}
					</ul>
				</div>
			)
		}else{
			return (
				<div id="recommendation"></div>
			)
		}
	}
});

module.exports = Recommendation;
