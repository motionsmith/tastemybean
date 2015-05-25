'use strict';

describe('Directive: rater', function () {

  // load the directive's module
  beforeEach(module('tastemybeanApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<rater></rater>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the rater directive');
  }));
});
