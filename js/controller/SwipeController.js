app.controller('SwipeController', ['$scope', '$window', function($scope, $window) {
      $scope.var1=true;
      $scope.delete = function() {
        $scope.var1=false;
      };
    }]);
