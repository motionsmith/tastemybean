'use strict';

var React = require('react/addons');


require('styles/Pagetitle.sass');

var Pagetitle = React.createClass({

  render: function () {
    return (
        <h1>{this.props.children}</h1>
      );
  }
});

module.exports = Pagetitle; 

