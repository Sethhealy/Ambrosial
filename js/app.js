//  Here I'm Calling my application and what I'm using in the code.
var app = angular.module("Ambrosial", ['ngRoute','xeditable','ui.bootstrap','firebase'])
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
        }).when('/form',{
            templateUrl:'Views/form.html',
            controller: 'HomeController'
        }).when('/user',{
            templateUrl: 'Views/signupuser.html',
            controller: 'LoginController'
        });
    }]);
    // I an running editableoption so that the application will be using bootstrap by default.
    app.run(function(editableOptions) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    });

    app.filter('toArray', function () {
    'use strict';

    return function (obj) {
        if (!(obj instanceof Object)) {
            return obj;
        }

        return Object.keys(obj).filter(function(key){if(key.charAt(0) !== "$") {return key;}}).map(function (key) {
            return Object.defineProperty(obj[key], '$key', {__proto__: null, value: key});
        });
    };
});
