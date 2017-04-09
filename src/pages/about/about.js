var React = require("react")
var ReactDOM = require("react-dom")

//CSS
require("./about.css")

var Topbar = require("../../components/topbar/topbar")

var About = React.createClass({
  isLogin:false,
  getInitialState:function(){
    return {
    }
  },
  componentDidMount:function(){
  },
  render:function(){
    return(
      <div id="about">
        <Topbar isLogin={this.isLogin}/>
        <div className="about_wrap">
        	<div className="wrap">
        		<h4>联系我们</h4>
            <p>地址：上海莘建东路539弄1号楼1403室</p>
            <p>邮编：201108</p>
            <p>电话：021-64201076</p>
            <p>传真：021-64201077</p>
            <p>工作时间：周一至周五 上午8:30--17:30</p>
        	</div>
        </div>
      </div>
    )
  }
})

module.exports = About
