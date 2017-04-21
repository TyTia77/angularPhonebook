/*jshint esversion: 6 */

app.controller('dialogAddNewCtrl', [ '$scope', '$rootScope', 'myFactory', 'myService',
'buttonFactory', 'validateService', function($scope, $rootScope, myFactory, myService,
buttonFactory, validateService) {

    $scope.openState = false;
    $scope.newContact = {};
    $scope.error = validateService.errorMsgTemplate();
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

    $scope.handleKeyUp = function(contactsInput){
        var returned = {};

        console.log(contactsInput);

        if(contactsInput.first_name ||
            contactsInput.first_name === ''){
            returned.firstname = validateService['text'](contactsInput.first_name);
        }

        if(contactsInput.last_name ||
            contactsInput.last_name === ''){
            returned.lastname = validateService['text'](contactsInput.last_name);
        }

        if(contactsInput.phone_mob ||
            contactsInput.phone_mob === ''){
            returned.mobile = validateService['num'](contactsInput.phone_mob);
        }

        if(contactsInput.email ||
            contactsInput.email === ''){
            returned.email = validateService['email'](contactsInput.email);
        }

        console.log(returned);

        _handleErrors(returned);
        $scope.handleNewContactClearAllValidate();
        $scope.handleNewContactSubmitValidate();
    }

    function _handleErrors(obj){
        for (var index in obj){
            if(!obj[index]){
                $('input[name=' +index +']')[0].classList.add('notvalid');
                $scope.error[index].display = true;
            } else{
                $('input[name=' +index +']')[0].classList.remove('notvalid');
                $scope.error[index].display = false;
            }
        }
    }

    $scope.handleNewContactClearAllValidate = function(){
        console.log($scope.newContact);
        for (let index in $scope.newContact){
            if($scope.newContact[index].length > 0){
                $scope.newContactClearAll.setState(true);
                return;
            }
        }
        $scope.newContactClearAll.setState(false);
    }

    $scope.handleNewContactClearAllClick = function(){
        for (let index in $scope.newContact){
            delete $scope.newContact[index];
        }

        for (let index in $scope.error){
            $scope.error[index].display = false;
        }

        var errors = $('.notvalid');

        for (var index in errors){
            if (errors[index].classList !== undefined){
                errors[index].classList.remove('notvalid');
            }
        }

        $scope.newContactClearAll.active = false;
        $scope.newContactSubmit.active = false;
    }

    $scope.handleNewContactSubmitValidate = function(){
        var inputs = $scope.newContact;
        var errors = $('.notvalid');

        if(inputs.first_name && inputs.last_name && errors.length === 0){
            $scope.newContactSubmit.setState(true);
            return true;
        }
        $scope.newContactSubmit.setState(false);
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
