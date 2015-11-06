"use strict";

var React = require('react');
var Router = require('react-router');
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;

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
      <section className='container'>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">Login</h3>
          </div>
          <div className="panel-body">
            <form className="form-horizontal">
              <Input type="email" label="Email" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
              <Input type="password" label="Password" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
              <Input type="checkbox" label="Remember Me" wrapperClassName="col-xs-offset-2 col-xs-10" />
              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <Button bsStyle="primary" onClick={this._onLogin}>Log In</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
});

module.exports = Login;
