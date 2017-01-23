var React = require('react')
var ReactDOM = require('react-dom')

//CSS
require("./header.css")

var Header = React.createClass({
  render:function(){
    return(
      <div className="header">
        <h2>我是标题</h2>
      </div>
    )
  }
});

module.exports = Header
