var React = require('react');
var helper = require('../helper/helper')

//CSS
require("./recommendation.css")

//跳转伪装标签
var Recommendation = React.createClass({

	onClick:function(){

	},

	render:function(){
		return (
			<div id="recommendation">
				<h4>近期活动推荐</h4>
				<ul className="item_wrap clearfix">
					<li>
						<a href="">
							<div className="img"></div>
							<div className="name">【婺源秋摄】徒步穿越石城至长西</div>
							<div className="time">时间：2016-12-20</div>
						</a>
					</li>
					<li>
						<a href="">
							<div className="img"></div>
							<div className="name">【婺源秋摄】徒步穿越石城至长西</div>
							<div className="time">时间：2016-12-20</div>
						</a>
					</li>
					<li>
						<a href="">
							<div className="img"></div>
							<div className="name">【婺源秋摄】徒步穿越石城至长西</div>
							<div className="time">时间：2016-12-20</div>
						</a>
					</li>
					<li>
						<a href="">
							<div className="img"></div>
							<div className="name">【婺源秋摄】徒步穿越石城至长西</div>
							<div className="time">时间：2016-12-20</div>
						</a>
					</li>
				</ul>
			</div>
		)
	}
});

module.exports = Recommendation;
