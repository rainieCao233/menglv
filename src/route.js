var React = require('react')
var ReactRouter = require('react-router')
var Router = ReactRouter.Router
var Route = ReactRouter.Route
var IndexRoute = ReactRouter.IndexRoute
var hashHistory = ReactRouter.hashHistory

var App = require("./app")

//pages
var Homepage = require("./pages/homepage/homepage")
var Register = require("./pages/register/register")

var routes =
    <Route path='/' component={App}>
    	<IndexRoute component={Register} />
      	<Route path="/homepage" component={Homepage} />
      	<Route path="/register" component={Register} />  
      	<Route path="*" component={Register} />
    </Route>

var routerCfg = (
  <Router history={hashHistory} routes={routes} />
)

module.exports = routerCfg
// <Route path='/' component={App}>
//       // <IndexRoute component={Homepage} />
//       // <Route path="/homepage" component={Homepage} />
//       <Route path="/register" component={Register} />  
//       // <Route path="*" component={Homepage} />
//     </Route>