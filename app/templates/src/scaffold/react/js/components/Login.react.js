"use strict";

var React = require('react');
var Router = require('react-router');

var Login = React.createClass({
  mixins: [
    Router.Navigation
  ],

  _onLogin: function(event) {
    event.preventDefault();

    this.transitionTo('dashboard');
  },

  render: function() {
    return (
      <form>
        <button onClick={this._onLogin}>Log In</button>
      </form>
    );
  }
});

module.exports = Login;
