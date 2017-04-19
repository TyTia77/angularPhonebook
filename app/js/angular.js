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



    // all angular services, factories, providers are singletons

    app.factory('dialogService', function(){

        function dialog(className){
            this.class = className;
            this.active = false;
        }

        dialog.prototype.getClass = function(){
            return this.class;
        }

        dialog.prototype.getState = function(){
            return this.active;
        }

        return{
            new: dialog
        }
    });

    app.service('dialogSettingService', function(){
        this.createNew = {active: false};
        this.contactDetail = {active: false};
        this.setting = {active: true};
    })







// convert to json and output to console
//console.log(angular.toJson($scope.menu))
