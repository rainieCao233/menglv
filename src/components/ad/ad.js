var React = require('react');
var helper = require('../helper/helper')

//CSS
require("./ad.css")

var Helper = require("../../components/helper/helper")

//跳转伪装标签
var Ad = React.createClass({

	jumpToAd:function(){
		Helper.jumpTo(this.props.href);
	},

	render:function(){
		return (
			<div id="ad" className={this.props.className}>
				<div onClick={this.jumpToAd} className="img"></div>
			</div>
		)
	}
});

module.exports = Ad;
