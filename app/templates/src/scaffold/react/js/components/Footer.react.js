"use strict";

var React = require('react');

var Footer = React.createClass({
  render: function() {
    return (
      <footer style={{ position: 'absolute', bottom: 0, width: '100%', height: '60px', backgroundColor: '#f5f5f5' }}>
        <div className='container'>
          <p className='text-muted' style={{ margin: '20px 0'}}>Copyright <%= (new Date().getFullYear()) %></p>
        </div>
      </footer>
    );
  }
});

module.exports = Footer;
