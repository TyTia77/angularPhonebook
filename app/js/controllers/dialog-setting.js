/*jshint esversion: 6 */

app.controller('dialogSettingCtrl', [ '$scope', '$rootScope', 'myFactory', 'myService', 'buttonFactory', function($scope, $rootScope, myFactory, myService, buttonFactory) {


    // properties
    $scope.openState = false;
    $scope.settingApply = new buttonFactory.new();
    $scope.sortByValue = myService.getSortByValue();
    var prevSortBy = 'first_name';

    // methods
    $scope.toggle = function(){
        $scope.openState = !$scope.openState;

        if ($scope.openState){
            $('.container').attr('faded', true);
        }else {
            $('.container').removeAttr('faded');
        }
    }

    $scope.handleSettingValidate = function(value){
        if (value != prevSortBy){
            return true;
        }

        return false;
    }

    $scope.handleSettingSubmit = function() {
        myService.setSortByValue($('#sortby').val());
        $scope.sortByValue = $('#sortby').val();
        $scope.settingApply.active = false;
        prevSortBy = $('#sortby').val();
    }

    // allow method to be invoked from another controller
    $rootScope.$on('toggleDialogSetting', function(){
        $scope.toggle();
    })
}]);
