"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Button = require('react-bootstrap').Button;

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
      <section className='container'>
        <div className='row'>
          <div className='col-xs-12'>
            <h1>Dashboard</h1>
            <p>This is where a dashboard can go.</p>
            <Button bsStyle="info" onClick={this._onLogout}>Log Out</Button>
          </div>
        </div>
      </section>
    );
  }
});

module.exports = Dashboard;
