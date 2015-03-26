'use strict';

angular.module('angularFullstackBtcApp')
  .controller('BurnaddrCtrl', function ($scope, $http, socket) {
    $scope.awesomeBurnaddrs = [];

    $http.get('/api/burnaddrs').success(function(awesomeBurnaddrs){
      $scope.awesomeBurnaddrs = awesomeBurnaddrs;
      socket.syncUpdates('burnaddr', $scope.awesomeBurnaddrs)
    });
    $scope.addBurnaddr = function(){
      if($scope.newBurnaddr === ''){
        return;
      }
      $http.post('/api/burnaddrs', { name: $scope.newBurnaddr});
      $scope.newBurnaddr = '';
    }
    $scope.deleteBurnaddr = function(burnaddr){
      $http.delete('/api/burnaddrs/' + burnaddr._id);
    }
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('burnaddr');
    });

  });
