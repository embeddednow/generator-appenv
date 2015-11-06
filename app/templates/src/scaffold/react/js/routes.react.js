"use strict";

var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var App = require('./components/App.react');
var Login = require('./components/Login.react');
var Dashboard = require('./components/Dashboard.react');

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={Login} />
    <Route name="dashboard" handler={Dashboard} />
  </Route>
);

module.exports = routes;
