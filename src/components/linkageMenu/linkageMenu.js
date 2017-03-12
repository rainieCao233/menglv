var React = require('react');
var ReactDOM = require('react-dom');
var helper = require('../helper/helper')

//CSS
require("./linkageMenu.css")

var Helper = require("../../components/helper/helper")

var LinkageMenu = React.createClass({

	jumpToAd:function(){
		Helper.jumpTo(this.props.href);
	},
	showlist:function(){
		this.refs["citylist"].style.display = "block";
	},
	hidelist:function(){
		this.refs["citylist"].style.display = "none";
	},
	getvalue:function(e){
		this.refs["input"].value = e.target.firstChild.nodeValue;
		this.hidelist();
	},
	render:function(){
		return (
			<div id="linkageMenu">
				<div className="select_wrap" onClick={this.showlist}>
					<input type="text" placeholder="请选择" className="down" ref="input" disabled="disabled"/>
					<em className="icon i-down-lg"></em>
				</div>
				<ul className="citylist" ref="citylist" onClick={this.getvalue}>
					<li>上海体育馆2号扶梯口</li>
					<li>南方商城</li>
					<li>松江老城高速进口9号线松江体育中心</li>
				</ul>
			</div>
		)
	}
});

module.exports = LinkageMenu;
