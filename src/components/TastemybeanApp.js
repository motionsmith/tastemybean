'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var Navigation = require('react-router').Navigation;

// CSS
require('normalize.css');
require('../styles/main.css');

var imageUrl = require('../images/yeoman.png');
var Imagebox = require('./Imagebox.js');
var PageTitle = require('./PageTitle.js');

var TastemybeanApp = React.createClass({
  mixins: [Navigation],
  componentDidMount: function() {
    this.transitionTo('about');
  },
  render: function() {
    return (
      <div className='main'>
      	<PageTitle>Cupping</PageTitle>
        <ReactTransitionGroup transitionName="fade">
          <Imagebox imageUrl={imageUrl} />
        </ReactTransitionGroup>
      </div>
    );
  }
});



module.exports = TastemybeanApp;
