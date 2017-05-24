var React = require('react')
var ReactDOM = require('react-dom')

//components
var Header = require("../../components/header/header")
var Footer = require("../../components/footer/footer")
var Helper = require("../../components/helper/helper")

//CSS
require("./page.css")

var Page = React.createClass({
	render: function() {
	  return (
	  	<div id="page">
			<Header isLogin={this.props.isLogin} searchActivities={this.props.searchActivities}/>
        		{this.props.children}
			<Footer location={this.props.location} />
	  	</div>
	  	);
	}
});

module.exports = Page