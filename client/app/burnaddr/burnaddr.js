'use strict';

angular.module('angularFullstackBtcApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('burnaddr', {
        url: '/burnaddr',
        templateUrl: 'app/burnaddr/burnaddr.html',
        controller: 'BurnaddrCtrl'
      });
  });
