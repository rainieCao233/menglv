var React = require('react');
var helper = require('../helper/helper')

//CSS
require("./tripitem.css")

//跳转伪装标签
var Tripitem = React.createClass({

	render:function(){
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
		return (
			<li id="tripitem">
				<div className="class_1 clearfix" style={{display:class_1}}>
					<em className="item-pic left"></em>
					<div className="detail right">
						<h4>【经典徒步】经典徒步经典徒步经典徒，经典徒步经典徒步经典徒步</h4>
						<p>经典徒步经典徒步经典徒，经典徒步经典徒步经典徒步典徒步经典徒步经典徒，经典徒步经典徒步经典徒典徒步经典徒步经典徒，经典徒步经典徒步经典徒典徒步经典徒步经典徒，经典徒步经典徒步经典徒...</p>
						<div className="timenbtn">
							<span className="timestamp">活动日期 : 2012/12/30</span>
							<a href="/#/" className="signup_btn">活动报名</a>
						</div>
					</div>
				</div>
				<div className="class_2" style={{display:class_2}}>
					1234
				</div>
			</li>
		)
	}
});

module.exports = Tripitem;