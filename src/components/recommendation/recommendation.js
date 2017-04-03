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
    Helper.send("activityDetailAction_getSimilarActivities",{id:this.props.activityId})
      .success(function(res){
        _self.setState({activityList:res});
      })
      .error(function(req){
        console.log("error : " + req)
      });
  },
	render:function(){
		return (
			<div id="recommendation">
				<h4>近期活动推荐</h4>
				<ul className="item_wrap clearfix">
				{
					this.state.activityList.map(function(item, index){
						return <li key={"recommendation"+index}><a href={"/#/detail/"+item.id}><div className='img'></div><div className='name'>{item.title}</div><div className='time'>¥ {item.offPrice} 元</div></a></li>
					})
				}
				</ul>
			</div>
		)
	}
});

module.exports = Recommendation;
