"use strict";

var React = require('react');

var Header = React.createClass({
  render: function() {
    return (
      <nav className='navbar navbar-inverse navbar-static-top'>
        <div className='container'>
          <div className='navbar-header'>
            <span className='navbar-brand'><%= applicationName %></span>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Header;
