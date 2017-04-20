/*jshint esversion: 6 */

app.controller('dialogContactCtrl', [ '$scope', '$rootScope', 'myFactory', 'myService', 'buttonFactory', function($scope, $rootScope, myFactory, myService, buttonFactory) {

    $scope.openState = false;

    $scope.contactDetailEditMode = false;

    $scope.contactDetailEdit = new buttonFactory.new(true);
    $scope.contactDetailCancel = new buttonFactory.new(true);
    $scope.contactDetailDelete = new buttonFactory.new(true);
    $scope.contactDetailSave = new buttonFactory.new(true);

    $scope.handleContactDetailEditClick = function(){
        $scope.contactDetailEditMode = !$scope.contactDetailEditMode;
    }

    $scope.handleContactDetailCancelClick = function(){
        $scope.contactDetailEditMode = !$scope.contactDetailEditMode;
    }

    $scope.handleContactDetailDeleteClick = function(id){
        _ajaxDeleteContact(id);
    }

    $scope.handleContactDetailSaveClick = function(contactDetails){
        handleUpdatedContactDetails(contactDetails);
    }

    // allow method to be invoked from another controller
    $rootScope.$on('toggleDialogContact', function(ev, contactId){
        if (contactId){
            $scope.contactDetail = myService.getContactList(contactId);
        }
        $scope.toggle();
    })

    $scope.toggle = function(){
        $scope.openState = !$scope.openState;
        myService.checkOpenState($scope.openState);
        if ($scope.contactDetailEditMode){
            $scope.contactDetailEditMode = !$scope.contactDetailEditMode;
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
        $scope.contactDetailEditMode = !$scope.contactDetailEditMode;
    }

    function _ajaxDeleteContact(id){
        myFactory.deleteContact(id)
            .then(function(response){
                console.log('successfully deleted');
                $scope.contactDetailEditMode = !$scope.contactDetailEditMode;
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
