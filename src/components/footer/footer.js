var React = require("react")
var ReactDOM = require("react-dom")

//CSS
require("./footer.css")

var Footer = React.createClass({
  render:function() {
    return(
      <div id="footer">
        <h2 className="footer">我是footer</h2>
      </div>
    )
  }
});

module.exports = Footer
