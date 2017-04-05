var React = require('react');
var helper = require('../helper/helper')

//CSS
require("./topbar.css")

//跳转伪装标签
var Topbar = React.createClass({

	render:function(){
		return (
			<div id="topbar">
				<ul className="clearfix">
					<li className="lg">全部活动分类</li>
					<li><a href="#">首页</a></li>
					<li><a href="#">周边短途游</a></li>
					<li><a href="#">长途深度游</a></li>
					<li><a href="/#/customize">团队定制/扩展</a></li>
					<li><a href="#">装备商城</a></li>
					<li><a href="#">积分兑换</a></li>
					<li><a href="#">成为VIP</a></li>
					<li className="lg"><a href="#">{this.props.isLogin?"最新公告":"个人中心"}</a></li>
				</ul>
			</div>
		)
	}
});

module.exports = Topbar;