var React = require('react')
var ReactDOM = require('react-dom')

//CSS
require("./app.css")
require("./sprite.css")

var App = React.createClass({
	render: function() {
	  return (
	  	<div id="app">
    		{this.props.children}
	  	</div>
	  	);
	}
});

module.exports = App
