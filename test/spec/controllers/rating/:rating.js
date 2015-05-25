'use strict';

describe('Controller: RatingRatingCtrl', function () {

  // load the controller's module
  beforeEach(module('tastemybeanApp'));

  var RatingRatingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RatingRatingCtrl = $controller('RatingRatingCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
