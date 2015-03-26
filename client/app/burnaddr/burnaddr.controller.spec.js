'use strict';

describe('Controller: BurnaddrCtrl', function () {

  // load the controller's module
  beforeEach(module('angularFullstackBtcApp'));
  beforeEach(module('socketMock'));

  var BurnaddrCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/burnaddrs')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    BurnaddrCtrl = $controller('BurnaddrCtrl', {
      $scope: scope
    });
  }));
  it('should attach a list of burnaddrs to the scope', function () {
    $httpBackend.flush();
    expect(scope.awesomeBurnaddrs.length).toBe(4);
  });
});
