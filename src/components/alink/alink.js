var React = require('react');
var helper = require('../helper/helper')

//CSS
require("./alink.css")

//跳转伪装标签
var ALink = React.createClass({

	onClick:function(){
		if(this.props.href && this.props.href.indexOf("//")>=0){
			helper.jumpTo(this.props.href)
		}else{
			helper.forwardTo(this.props.href)
		}

	},

	render:function(){
		return (
			<div id="alink">
				<a className={this.props.className} href="javascript:void(0);" onClick={this.onClick}>{this.props.children}</a>
			</div>
		)
	}
});

module.exports = ALink;
