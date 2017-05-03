var React = require('react');
var helper = require('../helper/helper')

//CSS
require("./slider.css")

var Helper = require("../../components/helper/helper")

//跳转伪装标签
var Slider = React.createClass({
	getInitialState:function(){
		return {
			picId:1
		}
	},
	getPicId:function(e){
		if(e.target.href){
			this.setState({picId:e.target.id});
			this.changePic(e.target.id);
		}
	},
	changePic:function(id){
		for (var i = 0; i < this.refs["dot_list"].childNodes.length; i++) {
			this.refs["dot_list"].childNodes[i].className = "";
		}
		this.refs["dot_list"].childNodes[id-1].className = "on";

		for (var i = 0; i < this.refs["pic_list"].childNodes.length; i++) {
			this.refs["pic_list"].childNodes[i].className = "";
		}
		this.refs["pic_list"].childNodes[id-1].className = "fade";
	},
	lastPic:function(){
		if(this.state.picId > 1){
			this.setState({picId:(this.state.picId-1)});
			this.changePic(this.state.picId-1);
		}else if(this.state.picId == 1){
			this.setState({picId:4});
			this.changePic(4);
		}
	},
	nextPic:function(){
		if(this.state.picId < 4){
			this.setState({picId:(this.state.picId+1)});
			this.changePic(this.state.picId+1);
		}else if(this.state.picId == 4){
			this.setState({picId:1});
			this.changePic(1);
		}
	},
	render:function(){
		return (
			<div id="slider" className={this.props.className}>
				<a href="javascript:void(0);" className="slider_btn last" onClick={this.lastPic}><em className="icon i-left"></em></a>
				<a href="javascript:void(0);" className="slider_btn next" onClick={this.nextPic}><em className="icon i-right"></em></a>
				<ul className="pic_list clearfix" ref="pic_list">
					<li className="fade"></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
				<ul className="dot_list clearfix" onClick={this.getPicId} ref="dot_list">
					<li className="on"><a href="javascript:void(0)" id="1"></a></li>
					<li><a href="javascript:void(0)" id="2"></a></li>
					<li><a href="javascript:void(0)" id="3"></a></li>
					<li><a href="javascript:void(0)" id="4"></a></li>
				</ul>
			</div>
		)
	}
});

module.exports = Slider;
