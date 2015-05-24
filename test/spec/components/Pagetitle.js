'use strict';

describe('Pagetitle', function () {
  var React = require('react/addons');
  var Pagetitle, component;

  beforeEach(function () {
    Pagetitle = require('components/Pagetitle.js');
    component = React.createElement(Pagetitle);
  });

  it('should create a new instance of Pagetitle', function () {
    expect(component).toBeDefined();
  });
});
