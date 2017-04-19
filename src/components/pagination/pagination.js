var React = require('react');
var ReactDOM = require('react-dom');
var helper = require('../helper/helper')

//CSS
require("./pagination.css")

var Pagination = React.createClass({
  getInitialState:function(){
    return {
    	pnum_total:0
    }
  },
  componentWillMount:function(){
  	this.setState({pnum_total:Math.ceil(this.props.num/6)})
  },
  componentDidMount:function(){
  },
  lastPage:function(){
  	if(this.props.pagenum == 1){
  		console.log("No1 不能往前")
  		return;
  	}
  	this.props.click((this.props.pagenum-2)*6,6);
  },
  nextPage:function(){
  	if(this.props.pagenum == this.state.pnum_total){
  		console.log("No最后 不能往后")
  		return;
  	}
	this.props.click((this.props.pagenum)*6,6);
  },
  jumpPage:function(e){
  	this.props.click((e.target.innerText-1)*6,6);
  },
	render:function(){
		var items = [];
		var isShow = "inline-block";
		var long = this.props.pagenum-5>0?this.props.pagenum-5:1;
		for (var i = long; i <= long+10>this.state.pnum_total?this.props.pnum_total-long:long+10; i++) {
			if(i == this.props.pagenum){
	    		items.push(<a href='javascript:void(0);' className='page_btn checked' key={i} onClick={this.jumpPage}>{i}</a>);
			}else{
	    		items.push(<a href='javascript:void(0);' className='page_btn' key={i} onClick={this.jumpPage}>{i}</a>);
			}
		}
		return (
			<div id="pagination">
				<a href="javascript:void(0);" className="page_btn last" onClick={this.lastPage}>上一页</a>
				{items}
				<a href="javascript:void(0);" className="page_btn next" onClick={this.nextPage}>下一页</a>
				<input type="text" />
				<a href="javascript:void(0);" className="page_btn go">go</a>
			</div>
		)
	}
});

module.exports = Pagination;