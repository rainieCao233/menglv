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
					<li>上海</li>
					<li>北京</li>
					<li>深圳</li>
					<li>深圳</li>
					<li>深圳</li>
					<li>广州</li>
				</ul>
			</div>
		)
	}
});

module.exports = LinkageMenu;
