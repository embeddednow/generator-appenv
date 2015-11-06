"use strict";

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

var Header = require('./Header.react');
var Footer = require('./Footer.react');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Header />
        <div>
          <RouteHandler />
        </div>
        <Footer />
      </div>
    );
  }
});

module.exports = App;
