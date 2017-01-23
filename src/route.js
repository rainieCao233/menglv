var React = require('react')
var ReactRouter = require('react-router')
var Router = ReactRouter.Router
var Route = ReactRouter.Route
var IndexRoute = ReactRouter.IndexRoute
var hashHistory = ReactRouter.hashHistory

var App = require("./app")

//pages
var Homepage = require("./pages/homepage/homepage")

var routes =
    <Route path='/' component={App}>
      <IndexRoute component={Homepage} />
      // <Route path="/homepage" component={Homepage} />  // for example
      <Route path="*" component={Homepage} />
    </Route>

var routerCfg = (
  <Router history={hashHistory} routes={routes} />
)

module.exports = routerCfg
