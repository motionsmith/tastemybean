'use strict';

var React = require('react/addons');


require('styles/Imagebox.sass');

var Imagebox = React.createClass({

  render: function () {
    return (
        <div>
          <img src={this.props.imageUrl} />
        </div>
      );
  }
});

module.exports = Imagebox; 

