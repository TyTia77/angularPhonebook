/*jshint esversion: 6 */

app.controller('dialogContactCtrl', [ '$scope', '$rootScope', 'myFactory', 'myService',
    'buttonFactory', 'validateService', 'inputStructure',
    function($scope, $rootScope, myFactory, myService, buttonFactory, validateService,
    inputStructure) {

    $scope.openState = false;
    $scope.editMode = false;
    $scope.buttonEdit = new buttonFactory.new(true);
    $scope.buttonCancel = new buttonFactory.new(true);
    $scope.buttonDelete = new buttonFactory.new(true);
    $scope.buttonSave = new buttonFactory.new();
    $scope.error = validateService.errorMsgTemplate();
    $scope.inputStructure = inputStructure.getInputs();
    var oldInput;


    $scope.handleButtonEditClick = function(){
        $scope.editMode = !$scope.editMode;
    };

    $scope.handleButtonCancelClick = function(){
        $scope.contactDetail =  JSON.parse(JSON.stringify(oldInput));
        $scope.editMode = !$scope.editMode;
        $scope.buttonSave.setState(false);
    };

    $scope.handleButtonDeleteClick = function(id){
        _ajaxDeleteContact(id);
    };

    $scope.handleButtonSaveClick = function(contactDetails){
        handleUpdatedContactDetails(contactDetails);
    };

    function getContactDetail(id){
        $scope.contactDetail = myService.getContactList(id);
        getWidth($scope.contactDetail);
        // clone a new object instead of a reference to an object
        oldInput = JSON.parse(JSON.stringify($scope.contactDetail));
    }

    function getWidth(contact){
        $scope.inputWidth = contact.email !== null ? contact.email.length * 14 : 300;
        $scope.inputWidth = $scope.inputWidth < 300 ? 300 : $scope.inputWidth;
    }

    // allow method to be invoked from another controller
    $rootScope.$on('toggleDialogContact', function(ev, contactId){
        if (contactId){
            getContactDetail(contactId);
        }
        $scope.toggle();
    });

    $scope.toggle = function(){
        $scope.openState = !$scope.openState;
        myService.checkOpenState($scope.openState);
        if ($scope.editMode){
            $scope.editMode = !$scope.editMode;
        }
    };

    $scope.handleInput = function(){
        var newInput = $scope.contactDetail;
        var list = {};

        for(var index in newInput){
            if(newInput[index] != oldInput[index]){
                list[index] = newInput[index];
            }
        }

        clearAll();
        if(!$.isEmptyObject(list)){
            handleValidation(list);
        }
    };

    function clearAll(){
        for (var index in $scope.error){
           $scope.error[index].display = false;
        }
        var test = $("input[name^=cd-]");

        for(var i = 0; i < test.length; i++){
            test[i].classList.remove('notvalid');
        }

        $scope.buttonSave.setState(false);
    }

    function handleValidation(input){
        var returned ={};

        if(input.first_name){
            returned.firstname = validateService['text'](input.first_name);
        }

        if(input.last_name){
            returned.lastname = validateService['text'](input.last_name);
        }

        if(input.phone_mob){
            returned.mobile = validateService['num'](input.phone_mob);
        }

        if(input.email){
            returned.email = validateService['email'](input.email);
        }

        if(input.gender){
            $scope.buttonSave.setState(true);
        }

        _handleErrors(returned);
    }

    function _handleErrors(errors){

        for (var index in errors){
            console.log(index);
            if(!errors[index]){
                $('input[name=cd-' +index +']')[0].classList.add('notvalid');
                $scope.error[index].display = true;
            }
        }

        var errorstest = $('.notvalid');

        if(errorstest.length === 0){
            $scope.buttonSave.setState(true);
        } else{
            $scope.buttonSave.setState(false);
        }
    }

    function handleUpdatedContactDetails(contactDetails){
        let newDetails = {};

        for (let index in contactDetails){
            switch(index){
                case '$$hashKey':
                case 'colour':
                case 'initials':
                    break;

                default:
                    newDetails[index] = contactDetails[index];
                    break;
            }
        }

        _ajaxUpdateContact(newDetails);
        $scope.editMode = !$scope.editMode;
        getContactDetail(newDetails.id);
        $scope.buttonSave.setState(false);
    }

    function _ajaxDeleteContact(id){
        myFactory.deleteContact(id)
            .then(function(response){
                console.log('successfully deleted');
                $scope.editMode = !$scope.editMode;
                myService.updateContactInstanceState();
                $rootScope.$emit('refreshContactList',{});
            }, function(error){
                console.log('gg');
                console.log(error);
            });

    }

    function  _ajaxUpdateContact(data){
        myFactory.updateContact(data.id, data)
            .then(function(response){
                console.log('succesfully inserted');
            }, function(error){
                console.log(error);
            });
    }
}]);
