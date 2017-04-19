/*jshint esversion: 6 */
var app = angular.module('myApp', ['ngRoute']);


    // inorder to work in js minify, we pass the parameters wrapped in an array
    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'app/view/address-book.html',
                controller: 'addressCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);

// convert to json and output to console
//console.log(angular.toJson($scope.menu))
