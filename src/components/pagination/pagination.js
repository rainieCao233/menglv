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
  	
  },
  componentDidMount:function(){
  },
  lastPage:function(){
  	if(this.props.pagenum == 1){
  		console.log("不能往前")
  		return;
  	}
  	this.props.click((this.props.pagenum-2)*6,6);
  },
  nextPage:function(){
  	if(this.props.pagenum == Math.ceil(this.props.num/6)){
      console.log("不能往后")
  		return;
  	}
	 this.props.click((this.props.pagenum)*6,6);
  },
  jumpPage:function(e){
  	this.props.click((e.target.innerText-1)*6,6);
  },
  goPage:function(){
    this.props.click((this.refs.text.value-1)*6,6);
  },
	render:function(){
		var items = [];
		var isShow = "inline-block";
		var long = this.props.pagenum-5>0?(Math.ceil(this.props.num/6)-this.props.pagenum>4?this.props.pagenum-5:Math.ceil(this.props.num/6)-9):1;
    var maxLong = (long+9)>Math.ceil(this.props.num/6)?Math.ceil(this.props.num/6):(long+9);

    if(Math.ceil(this.props.num/6)>0){
      console.log("long",long,"maxLong",maxLong)
      for (var i = long; i <= maxLong; i++) {
        if(i == this.props.pagenum){
            items.push(<a href='javascript:void(0);' className='page_btn checked' key={i} onClick={this.jumpPage}>{i}</a>);
        }else{
           items.push(<a href='javascript:void(0);' className='page_btn' key={i} onClick={this.jumpPage}>{i}</a>);
        }
      }
    }
		return (
			<div id="pagination">
				<a href="javascript:void(0);" className="page_btn last" onClick={this.lastPage}>上一页</a>
				{items}
				<a href="javascript:void(0);" className="page_btn next" onClick={this.nextPage}>下一页</a>
				<input type="text" ref="text" />
				<a href="javascript:void(0);" className="page_btn go" onClick={this.goPage}>go</a>
			</div>
		)
	}
});

module.exports = Pagination;