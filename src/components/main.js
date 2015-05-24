'use strict';

var TastemybeanApp = require('./TastemybeanApp');
var About = require('./About');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var content = document.getElementById('content');

var Routes = (
  <Route handler={TastemybeanApp}>
    <Route name="/" handler={TastemybeanApp}/>
    <Route name="about" handler={About}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
