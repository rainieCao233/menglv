var React = require('react');
var helper = require('../helper/helper')

//CSS
require("./enrollmentSituation.css")

var Helper = require("../../components/helper/helper")

//跳转伪装标签
var EnrollmentSituation = React.createClass({
	getInitialState:function(){
    return {
      info:[]
    }
  },
	onClick:function(){

	},
	componentDidMount:function(){
	    this.postRequest({id:this.props.id});
	},
	postRequest:function(obj){
		var _self = this;
    Helper.send("activityDetailController_getSignUpInfo",obj)
      .success(function(res){
        console.log(res)
        _self.setState({info:res});
      })
      .error(function(req){
        console.log("error : " + req)
      });
  },
	render:function(){
		var _self = this;
		return (
			<div id="enrollmentSituation">
				<div className="wrap">
					<h4>报名进行时</h4>
					<ul>
					{
						this.state.info.map(function(item,index){
							return  <li key={"signUpInfo"+index}>
												<span>{item[1]}<b>{item[0]}</b>报名了</span><br />
												<a className="title">{_self.props.title}</a>
											</li>
						})
					}
					</ul>
				</div>
			</div>
		)
	}
});

module.exports = EnrollmentSituation;
