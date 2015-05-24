'use strict';

describe('TastemybeanApp', function () {
  var React = require('react/addons');
  var TastemybeanApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    TastemybeanApp = require('components/TastemybeanApp.js');
    component = React.createElement(TastemybeanApp);
  });

  it('should create a new instance of TastemybeanApp', function () {
    expect(component).toBeDefined();
  });
});
