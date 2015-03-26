'use strict';

angular.module('angularFullstackBtcApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('asset', {
        url: '/asset',
        templateUrl: 'app/asset/asset.html',
        controller: 'AssetCtrl'
      });
  });