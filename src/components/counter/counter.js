var React = require('react');
var helper = require('../helper/helper')

//CSS
require("./counter.css")

var Helper = require("../../components/helper/helper")

var Counter = React.createClass({
	getInitialState:function(){
		return{
			number:0
		}
	},
	minus:function(){
		if(this.state.number>0){
			this.setState({number:this.state.number-1});
			this.props.calculatePrice(this.props.p,(this.state.number-1),this.props.index);
			console.log("minus", this.props.p,(this.state.number-1))
		}
	},
	add:function(){
		this.setState({number:this.state.number+1});
		this.props.calculatePrice(this.props.p,(this.state.number+1),this.props.index);
		console.log("add",this.props.p,(this.state.number+1))

	},
	render:function(){
		return (
			<div id="counter">
				<a href="javascript:void(0);" className="counter_btn minus" onClick={this.minus} ref="minus">-</a>
				<span className="number">{this.state.number}</span>
				<a href="javascript:void(0);" className="counter_btn add" onClick={this.add}>+</a>
			</div>
		)
	}
});

module.exports = Counter;
