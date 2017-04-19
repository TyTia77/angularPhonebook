/*jshint esversion: 6 */

    app.controller('addressCtrl', ['$rootScope', '$scope', '$location', 'myFactory', 'myService', 'dialogService', 'buttonFactory', 'dialogSettingService', function($rootScope, This, $location, myFactory, myService, dialogService, buttonFactory, dialogSettingService) {

        // initialize
        initialiseApp();

        This.toggleSettingDialog = function(){
            $rootScope.$emit('toggleDialogSetting',{});
        };

        This.toggleAddNewDialog = function(){
            $rootScope.$emit('toggleDialogAddNew',{});
        }

        This.toggleContactDialog = function(){
            $rootScope.$emit('toggleDialogContact',{});
        }


        // properties
        This.contactDetailEditMode = false;
        This.sortByValue = 'first_name';
        This.newContact = {};


        // create instances
        This.settingApply = new buttonFactory.new();

        This.newContactClearAll = new buttonFactory.new();
        This.newContactSubmit = new buttonFactory.new();

        This.contactDetailEdit = new buttonFactory.new(true);
        This.contactDetailCancel = new buttonFactory.new(true);
        This.contactDetailDelete = new buttonFactory.new(true);
        This.contactDetailSave = new buttonFactory.new(true);


        // button event handlers
        This.handleSettingValidate = function(value){
            if (value != This.sortByValue){
                return true;
            }

            return false;
        }

        This.handleSettingSubmit = function() {
            This.sortByValue = $('#sortby').val();
            This.settingApply.active = false;
        }

        This.handleNewContactClearAllValidate = function(inputs){
            for (let index in inputs){
                if(inputs[index].length > 0){
                    return true;
                }
            }

            return false;
        }

        This.handleNewContactClearAllClick = function(){
            for (let index in This.newContact){
                This.newContact[index] = '';
            }

            This.newContactClearAll.active = false;
        }

        This.handleNewContactSubmitValidate = function(inputs){
            if(inputs.first_name && inputs.last_name){
                return true;
            }

            return false;
        }

        This.handleNewContactSubmitClick = function(){
            _ajaxAddNewContact(This.newContact);
            This.newContactSubmit.active = false;
        }

        This.handleContactDetailEditClick = function(){
            This.contactDetailEditMode = !This.contactDetailEditMode;
        }

        This.handleContactDetailCancelClick = function(){
            This.contactDetailEditMode = !This.contactDetailEditMode;
        }

        This.handleContactDetailDeleteClick = function(id){
            _ajaxDeleteContact(id);
        }

        This.handleContactDetailSaveClick = function(contactDetails){
            handleUpdatedContactDetails(contactDetails);
        }




        This.handleDialog = ($event, classname, property) => {
            let tempClassName = $(classname);

            if (property) {
                if (classname == '.dialog-contact' && This.contactDetailEditMode){
                    This.contactDetailEditMode = !This.contactDetailEditMode;
                }

                tempClassName.removeAttr('opened');
                $('.container').removeAttr('faded');
            } else {
                if (classname == '.dialog-contact') {
                    let id = $event.currentTarget.firstElementChild.dataset.id;
                    This.contactDetail = myService.getContactList(id);
                }

                tempClassName.attr('opened', !property);
                $('.container').attr('faded', true);
                tempClassName.css('pointer-events', 'all');
            }
        };


        // TODO functions
        const _checkListViewScrollbar = () => {
            try{
                let headerDom = $('.listview-header') || false;
                let headerWidth = headerDom[0].clientWidth;
                let bodyWidth = $('.listview')[0].clientWidth;

                if (headerWidth > bodyWidth) {
                    let variation = -Math.abs(headerWidth - bodyWidth);
                    headerDom.css('left', variation + 'px');
                } else {
                    headerDom.css('left', '0px');
                }
            }
            catch(err){
                console.log(err);
            }
        };

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
            This.contactDetailEditMode = !This.contactDetailEditMode;
        }


        function _ajaxAddNewContact(inputs){
            myFactory.insertContact(inputs)
                .then(function(response){
                    console.log('succesfully inserted');
                    This.handleNewContactClearAllClick();
                    _ajaxGetContacts();
                }, function(error){
                    console.log(error);
                });
        }


        function _ajaxDeleteContact(id){
            myFactory.deleteContact(id)
                .then(function(response){
                    console.log('successfully deleted');
                    This.handleDialog(null, '.dialog-contact', true);
                     _ajaxGetContacts();
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

        function _ajaxGetContacts() {
            myFactory.getContacts()
                .then(function(response){
                    // This.contactList = response.data.contactList;

                    let tempContactList = response.data.contactList;

                    let index = 0;

                    tempContactList.forEach(x => {
                        let first = x.first_name[0].toUpperCase();
                        let last = x.last_name[0].toUpperCase();
                        let rand = Math.floor((Math.random() * 6));

                        tempContactList[index].initials = first + last;
                        tempContactList[index].colour = myService.getColours(rand);
                        index++;
                    });

                    myService.setContactList(tempContactList);
                    This.contactList = myService.getContactList();


                    // tells angular to check for changes
                    // This.$apply();
                    // This.$digest();
                    setTimeout(function(){
                        _checkListViewScrollbar();
                    }, 1);
                }, function (error){
                    console.log(error);
                });
        }



        const _getContactDetails = id => This.dialogContactDetail.contactDetail = myService.getContactList(id);





        function initialiseApp(){
            // get request is being invoked 4times because the controller is being initialised 4times,
            // 3 for 3dialog, this method will reduce the get request to once
            if (myService.getInitialised() === false){
                _ajaxGetContacts();
                myService.setInitialised();
            }
        }

        // watch
        This.$watch('sortByValue', (n, o) => {
            // console.log(n);
            // console.log(o);
            // console.log('watchedwatched');
        });

        This.$watch(This.newContact, (n, o) => {
            // console.log(n);
            // console.log(o);
            console.log('watchedwatched');
        });

        // This.$watch('dialogAddNewContact.inputValues', (n, o) => {
        //     n = JSON.stringify(n);
        //     var a = n.firstname;
        //     // console.log(a);
        //     // console.log(`new ${n}`);
        //     // console.log(`old ${o}`);
        //     // console.log('newcon changes');
        // }, true);

    }]);
