var React = require('react');
var ReactDOM = require('react-dom');
var helper = require('../helper/helper')

//CSS
require("./pagination.css")

var Pagination = React.createClass({
	getInitialState:function(){
    return {
    }
  },
  componentDidMount:function(){
  },
  jumpPage:function(e){
  	this.props.click((e.target.innerText-1)*6,6);
  },
	render:function(){
		var items = [];
		var isShow = "inline-block";
		var length = Math.ceil(this.props.num/6)>10?10:this.props.num/6;
		if(this.props.num<=10){
			isShow = "none";
		}
		for (var i = 1; i <= length; i++) {
	    	items.push(<a href='javascript:void(0);' className='page_btn' key={i} onClick={this.jumpPage}>{i}</a>);
		}
		return (
			<div id="pagination">
				<a href="javascript:void(0);" className="page_btn last" onClick={this.lastPage}>上一页</a>
				{items}
				<span className="page_btn" ref="page_btn" style={{display:isShow}}>...</span>
				<a href="javascript:void(0);" className="page_btn next" onClick={this.nextPage}>下一页</a>
				<input type="text" />
				<a href="javascript:void(0);" className="page_btn go">go</a>
			</div>
		)
	}
});

module.exports = Pagination;