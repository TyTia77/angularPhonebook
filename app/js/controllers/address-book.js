/*jshint esversion: 6 */

angular.module('myApp')
    .controller('addressCtrl', ['$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {

        // variables
        const This = $scope;
        // const apiUrl = 'http://localhost:5000/contacts';
        const apiUrl = 'https://shrouded-lake-43811.herokuapp.com/contacts';

        var colours = [
            '#db4540',
            '#384c7a',
            '#6cde9b',
            '#b07142',
            '#b771e0',
            '#e6d698'
        ];

        // properties
        This.contactDetailEditMode = false;
        This.contactList = '';
        This.sortByValue = 'first_name';

        This.dialogAddNewContact = {
            inputValues: {
                first_name: '',
                last_name: '',
                email: '',
                phone_mob: '',
                phone_home: '',
                phone_work: '',
                gender: ''
            }
        };

        This.dialogContactDetail = {
            // values dynamically generated from function _getContactDetails
            contactDetail:{}
        };

        // initialize
        getContactsAjax();

        //TODO events handlers
        This.handleSort = $event => This.sortByValue = $('#sortby').val();
        This.handleDeleteContact = id => _ajaxDeleteContact(id);
        This.handleSortByChange = value => This.checkActive(value);
        This.handleclearAllFields = () => _clearAllFields();
        This.checkAddNewClearButton = () => This.checkAddNewContactClearAllButton();
        This.handleEditMode = () => This.contactDetailEditMode = !This.contactDetailEditMode;


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
                    _getContactDetails(id);
                }

                tempClassName.attr('opened', !property);
                $('.container').attr('faded', true);
                tempClassName.css('pointer-events', 'all');
            }
        };

        This.handleAddNewContact = $event => {
            let inputs = _getNewContactValues('object');
            _ajaxAddNewContact(inputs);
        };

        This.checkActive = value => {
            if (This.sortByValue == value) {
                return '';
            } else {
                return 'active';
            }
        };

        This.checkAddNewContactClearAllButton = () => {
            let values = _getNewContactValues('array');

            for(let index in values){
                if (values[index]) {
                    return 'active';
                }
            }
        };

        This.makeButtonActive = () => {
            let inputs = _getNewContactValues('object');

            if(inputs.first_name && inputs.last_name){
                return 'active';
            }
        };

        This.handleUpdatedContactDetails = () => {
            let newDetails = This.dialogContactDetail.contactDetail;
            let colour = newDetails.colour;
            let initials = newDetails.initials;
            let hash = newDetails.$$hashKey;

            delete newDetails.$$hashKey;
            delete newDetails.colour;
            delete newDetails.initials;

            _ajaxUpdateContact(newDetails);

            This.contactDetailEditMode = !This.contactDetailEditMode;

            This.dialogContactDetail.contactDetail.colour = colour;
            This.dialogContactDetail.contactDetail.initials = initials;
            This.dialogContactDetail.contactDetail.$$hashKey = hash;
        };



        // TODO functions
        const _checkListViewScrollbar = () => {
            let headerDom = $('.listview-header');
            let headerWidth = headerDom[0].clientWidth;
            let bodyWidth = $('.listview')[0].clientWidth;

            if (headerWidth > bodyWidth) {
                let variation = -Math.abs(headerWidth - bodyWidth);
                headerDom.css('left', variation + 'px');
            } else {
                headerDom.css('left', '0px');
            }
        };

        const _ajaxAddNewContact = (inputs) => {
            $.post(apiUrl, inputs, (response, status) => {
                console.log('response ' + response);
                console.log('status ' + status);
                if (status == 'success') {
                    _clearAllFields();
                    getContactsAjax();
                }
            });
        };

        const _ajaxDeleteContact = id => {
            $.ajax({
                url: `${apiUrl}/${id}`,
                type: 'delete',
                success: () => {
                    This.handleDialog(null, '.dialog-contact', true);
                    getContactsAjax();
                },
                error: error => console.log(error)
            });
        };

        const _ajaxUpdateContact = data => {
            $.ajax({
                url: `${apiUrl}/${data.id}`,
                type: 'put',
                data: data,
                // async: false,
                error: error => console.log(error)
            });
        };

        function getContactsAjax() {
            $.get(apiUrl, function(data) {
                This.contactList = data.contactList;

                let index = 0;

                data.contactList.forEach(x => {
                    let first = x.first_name[0].toUpperCase();
                    let last = x.last_name[0].toUpperCase();
                    let rand = Math.floor((Math.random() * 6));

                    This.contactList[index].initials = first + last;
                    This.contactList[index].colour = colours[rand];
                    index++;
                });


                // tells angular to check for changes
                // This.$apply();
                This.$digest();
                _checkListViewScrollbar();
            });
        }

        const _getContactDetails = id => {
            let contactlist = This.contactList;

            contactlist.forEach( contact => {
                if (contact.id == id) {
                    This.dialogContactDetail.contactDetail = contact;
                }
            });
        };

        const _clearAllFields = () => {
            let inputValues = This.dialogAddNewContact.inputValues;

            for (let index in inputValues){
                inputValues[index] = '';
            }
        };

        const _getNewContactValues = type => {
            let inputValues = This.dialogAddNewContact.inputValues;

            switch(type){
                case 'array':
                    let tempArray = [];

                    for (let index in inputValues){
                        tempArray.push(inputValues[index]);
                    }

                    return tempArray;

                case 'object':
                    return inputValues;

                default:
                    break;

            }
        };

        // watch
        This.$watch('sortByValue', (n, o) => {
            // console.log(n);
            // console.log(o);
            // console.log('watchedwatched');
        });

        This.$watch('dialogAddNewContact.inputValues', (n, o) => {
            n = JSON.stringify(n);
            var a = n.firstname;
            // console.log(a);
            // console.log(`new ${n}`);
            // console.log(`old ${o}`);
            // console.log('newcon changes');
        }, true);

    }]);
