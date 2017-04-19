/*jshint esversion: 6 */

app.controller('dialogAddNewCtrl', [ '$scope', '$rootScope', 'myFactory', 'myService', 'buttonFactory', function($scope, $rootScope, myFactory, myService, buttonFactory) {

    $scope.openState = false;
    $scope.newContact = {};

    $scope.newContactClearAll = new buttonFactory.new();
    $scope.newContactSubmit = new buttonFactory.new();

    // allow method to be invoked from another controller
    $rootScope.$on('toggleDialogAddNew', function(){
        $scope.toggle();
    })

    $scope.toggle = function(){
        $scope.openState = !$scope.openState;
    }


    $scope.handleNewContactClearAllValidate = function(inputs){
        for (let index in inputs){
            if(inputs[index].length > 0){
                return true;
            }
        }

        return false;
    }

    $scope.handleNewContactClearAllClick = function(){
        for (let index in $scope.newContact){
            $scope.newContact[index] = '';
        }

        $scope.newContactClearAll.active = false;
    }

    $scope.handleNewContactSubmitValidate = function(inputs){
        if(inputs.first_name && inputs.last_name){
            return true;
        }

        return false;
    }

    $scope.handleNewContactSubmitClick = function(){
        _ajaxAddNewContact($scope.newContact);
        $scope.newContactSubmit.active = false;
    }


    function _ajaxAddNewContact(inputs){
        myFactory.insertContact(inputs)
            .then(function(response){
                console.log('succesfully inserted');
                $scope.handleNewContactClearAllClick();
                $rootScope.$emit('refreshContactList',{});
            }, function(error){
                console.log(error);
            });
    }
}]);
