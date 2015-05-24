'use strict';

describe('Service: BrewMethod', function () {

  // load the service's module
  beforeEach(module('tastemybeanApp'));

  // instantiate service
  var BrewMethod;
  beforeEach(inject(function (_BrewMethod_) {
    BrewMethod = _BrewMethod_;
  }));

  it('should do something', function () {
    expect(!!BrewMethod).toBe(true);
  });

});
