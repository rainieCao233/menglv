var React = require('react');
var helper = require('../helper/helper')

//CSS
require("./topbar.css")

var Helper = require("../helper/helper")

//跳转伪装标签
var Topbar = React.createClass({
	toCustomize:function(){
		Helper.jumpTo("http://www.mikecrm.com/faNs8M");
	},
	toHomePage:function(id){
		if(location.href.indexOf("homepage")!=-1){
			Helper.forwardTo("/homepage/"+id);
			location.reload();
		}else{
			Helper.forwardTo("/homepage/"+id);
		}
	},
	render:function(){
		return (
			<div id="topbar">
				<ul className="clearfix">
					<li className="lg">全部活动分类</li>
					<li onClick={this.toHomePage}><a href="javascript:void(0);">首页</a></li>
					<li onClick={this.toHomePage.bind(null,1)} className={this.props.id==1?"on":""}><a href="javascript:void(0);">周边短途游</a></li>
					<li onClick={this.toHomePage.bind(null,2)} className={this.props.id==2?"on":""}><a href="javascript:void(0);">长途深度游</a></li>
					<li onClick={this.toCustomize}><a href="javascript:void(0);">团队定制/扩展</a></li>
					<li><a href="#">装备商城</a></li>
					<li><a href="#">积分兑换</a></li>
					<li><a href="#">成为VIP</a></li>
					<li className="lg"><a href="#">{this.props.isLogin?"个人中心":"最新公告"}</a></li>
				</ul>
			</div>
		)
	}
});

module.exports = Topbar;
// onClick={this.props.switchTab.bind(null,"1")}
// onClick={this.props.switchTab.bind(null,"2")}