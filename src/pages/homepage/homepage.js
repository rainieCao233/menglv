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
      <div className="Homepage">
        i am Homepage
        {
          tripList.items.map(function(value, index, array){
            return <div>{value.id}</div>
          })
        }
      </div>
    )
  }
})

module.exports = Homepage
