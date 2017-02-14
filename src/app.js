var React = require('react')
var ReactDOM = require('react-dom')

//components
var Header = require("./components/header/header")
var Footer = require("./components/footer/footer")

//CSS
require("./app.css")
require("./sprite.css")

var App = React.createClass({
	render: function() {
	  return (
	  	<div id="app">
			<Header />
        		{this.props.children}
			<Footer location={this.props.location} />
	  	</div>
	  	);
	}
});

module.exports = App
