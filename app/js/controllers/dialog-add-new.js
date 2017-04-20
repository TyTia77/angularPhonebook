/*jshint esversion: 6 */

app.controller('dialogAddNewCtrl', [ '$scope', '$rootScope', 'myFactory', 'myService',
'buttonFactory', 'validateService', function($scope, $rootScope, myFactory, myService,
buttonFactory, validateService) {

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
        myService.checkOpenState($scope.openState);
    }


    $scope.handleNewContactClearAllValidate = function(inputs){
        for (let index in inputs){
            if(inputs[index].length > 0){
                return true;
            }
        }

        return false;
    }


    // accepts input value and input validation type
    // invokes validateservice method, returns true if validate
    // otherwise false
    $scope.handleBlur = function(ev, input, type){
        console.log(ev);
        var returned = validateService[type](input);
        console.log(returned);
        if (!returned){
            ev.target.classList.add('notvalid');
        } else{
            ev.target.classList.remove('notvalid');
        }
    }

    $scope.handleNewContactClearAllClick = function(){
        for (let index in $scope.newContact){
            $scope.newContact[index] = '';
        }

        $scope.newContactClearAll.active = false;
        $scope.newContactSubmit.active = false;
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
