var React = require("react")
var ReactDOM = require("react-dom")
var tripList = require('../../../node/server/api/tripList.json');

//CSS
require("./homepage.css")

//components
var Helper = require("../../components/helper/helper")

var Homepage = React.createClass({
  getInitialState:function(){
    return {
    }
  },
  componentDidMount:function(){
  },
  render:function(){
    return(
      <div id="homepage">
        <div className="topbar">插件topbar</div>
        <div className="slider_wrap">
          <div className="slider">
            <div className="category">
              <ul>
                <h4></h4>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="wrap"></div>
      </div>
    )
  }
})

module.exports = Homepage
