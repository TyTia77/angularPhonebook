/*jshint esversion: 6 */

app.controller('dialogContactCtrl', [ '$scope', '$rootScope', 'myFactory', 'myService', 'dialogService', function($scope, $rootScope, myFactory, myService, dialogService) {

    $scope.openState = false;

    // allow method to be invoked from another controller
    $rootScope.$on('toggleDialogContact', function(){
        $scope.toggle();
    })

    $scope.toggle = function(){
        $scope.openState = !$scope.openState;
    }

}]);
