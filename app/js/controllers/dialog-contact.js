/*jshint esversion: 6 */

app.controller('dialogContactCtrl', [ '$scope', '$rootScope', 'myFactory', 'myService', 'buttonFactory', function($scope, $rootScope, myFactory, myService, buttonFactory) {

    $scope.openState = false;

    $scope.editMode = false;

    $scope.buttonEdit = new buttonFactory.new(true);
    $scope.buttonCancel = new buttonFactory.new(true);
    $scope.buttonDelete = new buttonFactory.new(true);
    $scope.buttonSave = new buttonFactory.new();
    var oldInput;

    $scope.handleButtonEditClick = function(){
        $scope.editMode = !$scope.editMode;
    }

    $scope.handleButtonCancelClick = function(){
        $scope.contactDetail =  JSON.parse(JSON.stringify(oldInput));
        $scope.editMode = !$scope.editMode;
        $scope.buttonSave.setState(false);
    }

    $scope.handleButtonDeleteClick = function(id){
        _ajaxDeleteContact(id);
    }

    $scope.handleButtonSaveClick = function(contactDetails){
        handleUpdatedContactDetails(contactDetails);
    }

    function getContactDetail(id){
        $scope.contactDetail = myService.getContactList(id);
        // clone a new object instead of a reference to an object
        oldInput = JSON.parse(JSON.stringify($scope.contactDetail));
    }

    // allow method to be invoked from another controller
    $rootScope.$on('toggleDialogContact', function(ev, contactId){
        if (contactId){
            getContactDetail(contactId);
        }
        $scope.toggle();
    })

    $scope.toggle = function(){
        $scope.openState = !$scope.openState;
        myService.checkOpenState($scope.openState);
        if ($scope.editMode){
            $scope.editMode = !$scope.editMode;
        }
    }

    $scope.handleInput = function(){
        var newInput = $scope.contactDetail;

        console.log(newInput);
        console.log(oldInput);

        for(var index in newInput){
            if(newInput[index] != oldInput[index]){
                $scope.buttonSave.setState(true);
                return;
            }
            $scope.buttonSave.setState(false);
            newInput[index]
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
