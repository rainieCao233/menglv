var React = require('react');
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
	render:function(){
		var items = [];
		var length = this.props.num>10?10:this.props.num;
		for (var i = 1; i <= length; i++) {
	    items.push(<a href='' className='page_btn' key={i}>{i}</a>);
		}

		return (
			<div id="pagination">
				<a href="" className="page_btn last">上一页</a>
				{items}
				<span className="page_btn">...</span>
				<a href="" className="page_btn next">下一页</a>
				<input type="text" />
				<a href="" className="page_btn go">go</a>
			</div>
		)
	}
});

module.exports = Pagination;