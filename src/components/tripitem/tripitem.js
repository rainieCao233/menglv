var React = require('react');
var helper = require('../helper/helper')

//CSS
require("./tripitem.css")

//跳转伪装标签
var Tripitem = React.createClass({
	getInitialState:function(){
		return {
			time:""
		}
	},
	componentDidMount:function(){
		this.state.time = this.props.v.startTime;
		this.forceUpdate();
		this.refs.em.style.background = "url('"+this.props.v.mainPicRoute+"')";
		this.refs.em.style.backgroundSize = "100% 100%";
	},
	render:function(){
		var class_1 = "none",class_2 = "none";
		if(this.props.v){
			switch(this.props.type){
				case "1":
					var class_1 = "block";
					var class_2 = "none";
					break;
				case "2":
					var class_2 = "block";
					var class_1 = "none";
					break;
				default:
			}
		}
		return (
			<li id="tripitem">
				<div className="class_1 clearfix" style={{display:class_1}}>
					<a href={"/#/detail/"+this.props.v.id} >
						<em className="item-pic left" ref="em"></em>
						<div className="detail right">
							<h4>{this.props.v.title}</h4>
							<span className="price"><b>¥{this.props.v.offPrice}</b>元/人</span>
							<p>{this.props.v.description1},{this.props.v.description2},{this.props.v.description3}</p>
							<div className="timenbtn">
								<span className="timestamp">活动日期 : {this.state.time}</span>
								<a href={"/#/signup/"+this.props.v.id} className="signup_btn">活动报名</a>
							</div>
						</div>
					</a>
				</div>
			</li>
		)
	}
});

module.exports = Tripitem;