/*jshint esversion: 6 */

app.controller('dialogSettingCtrl', [ '$scope', '$rootScope', 'myFactory', 'myService', 'dialogService', function($scope, $rootScope, myFactory, myService, dialogService) {

    console.log('party from settings');

    $scope.openState = false;

    $scope.testwhichcontroller = 'this controller';


    // allow method to be invoked from another controller
    $rootScope.$on('toggleDialogSetting', function(){
        $scope.toggle();
    })

    $scope.toggle = function(){
        $scope.openState = !$scope.openState;
    }
}]);
