'use strict';

describe('Controller: AssetCtrl', function () {

  // load the controller's module
  beforeEach(module('angularFullstackBtcApp'));

  var AssetCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AssetCtrl = $controller('AssetCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
