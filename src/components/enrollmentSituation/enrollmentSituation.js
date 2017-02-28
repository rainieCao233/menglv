var React = require('react');
var helper = require('../helper/helper')

//CSS
require("./enrollmentSituation.css")

//跳转伪装标签
var EnrollmentSituation = React.createClass({

	onClick:function(){

	},

	render:function(){
		return (
			<div id="enrollmentSituation">
				<div className="wrap">
					<h4>报名进行时</h4>
					<ul>
						<li>
							<span>今天12:11 <b>zhang</b>报名了</span><br />
							<a className="title">[徒步认证系列之一]2.25周六 让我们抛掉烦恼，徒步古月城山</a>
						</li>
						<li>
							<span>今天12:11 <b>zhang</b>报名了</span><br />
							<a className="title">[徒步认证系列之一]2.25周六 让我们抛掉烦恼，徒步古月城山</a>
						</li>
						<li>
							<span>今天12:11 <b>zhang</b>报名了</span><br />
							<a className="title">[徒步认证系列之一]2.25周六 让我们抛掉烦恼，徒步古月城山</a>
						</li>
					</ul>
				</div>
			</div>
		)
	}
});

module.exports = EnrollmentSituation;
