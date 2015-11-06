"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Dashboard = React.createClass({
  mixins: [
    Router.Navigation
  ],

  _onLogout: function(event) {
    event.preventDefault();

    this.transitionTo('/');
  },

  render: function() {
    return (
      <form>
        <button onClick={this._onLogout}>Log Out</button>
      </form>
    );
  }
});

module.exports = Dashboard;
