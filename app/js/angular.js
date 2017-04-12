// angularJS modules define the Applications
'use strict';

angular.module('myApp', ['ngRoute'])

    // inorder to work in js minify, we pass the parameters wrapped in an array
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider.when('/', {
            templateUrl: 'app/view/address-book.html',
            controller: 'addressCtrl'
        });

        // $routeProvider.when('/customers', {
        //   resolve: {
        //     "check": function($location, $rootScope){
        //       if(!$rootScope.loggedIn){
        //         $location.path('/');
        //       }
        //     }
        //   },
        //   templateUrl: 'partials/customers.html',
        //   controller: 'customerCtrl'
        // }),
        //
        // $routeProvider.when('/orders', {
        //   templateUrl: 'partials/orders.html'
        //   }).otherwise({
        //     redirectTo: '/'
        // });

    }]);

// convert to json and output to console
//console.log(angular.toJson($scope.menu))
