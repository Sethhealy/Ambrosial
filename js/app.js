//  Here I'm Calling my application and what I'm using in the code.
var app = angular.module("Ambrosial", ['ngRoute', 'ngTouch', 'xeditable','ui.bootstrap', 'firebase'])
    // Here I'm configuring the application with the correct routes.
    app.config(['$routeProvider', function($routeProvider){
        // Here I'm defining the routes the users will be using.
        $routeProvider
        // If the user was at the start page which in this case is a / will take the user to the login page.
        .when('/',{
            templateUrl:'Views/login.html',
            controller: 'LoginController'
        // If the user was logged in the application will take them to the home page.
        }).when('/home',{
            templateUrl:'Views/home.html',
            controller: 'HomeController'
        // If the Admin was logged in they could use the signup link and go to the signup page to sign new users in.
        }).when('/signup',{
            templateUrl:'Views/signup.html',
            controller: 'LoginController'
        });
    }]);
    // I an running editableoption so that the application will be using bootstrap by default.
    app.run(function(editableOptions) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    });

    app.filter('ordinal', function() {

  // Create the return function
  // set the required parameter name to **number**
  return function(section) {

    // Ensure that the passed in data is a number
    if(isNaN(section)) {

      // If the data is not a number or is less than one (thus not having a cardinal value) return it unmodified.
      return number;

    } else {

      // If the data we are applying the filter to is a number, perform the actions to check it's ordinal suffix and apply it.

      var lastDigit = number % 10;

      if(lastDigit === 1) {
        return number + 'st'
      } else if(lastDigit === 2) {
        return number + 'nd'
      } else if (lastDigit === 3) {
        return number + 'rd'
      } else if (lastDigit > 3) {
        return number + 'th'
      }

    }
  }
});



var mymodal = angular.module('mymodal', []);

mymodal.controller('Ambrosial', function ($scope) {
    $scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    };
  });

mymodal.directive('modal', function () {
    return {
      template: '<div class="modal fade">' +
          '<div class="modal-dialog">' +
            '<div class="modal-content">' +
              '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                '<h4 class="modal-title">{{ title }}</h4>' +
              '</div>' +
              '<div class="modal-body" ng-transclude></div>' +
            '</div>' +
          '</div>' +
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });

