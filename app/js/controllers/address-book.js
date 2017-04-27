/*jshint esversion: 6 */

    app.controller('addressCtrl', ['$rootScope', '$scope', '$location', 'myFactory', 'myService', 'buttonFactory', function($rootScope, This, $location, myFactory, myService, buttonFactory) {

        _ajaxGetContacts();

        This.sortByValue = myService.getSortByValue();

        This.toggleSettingDialog = function(){
            $rootScope.$emit('toggleDialogSetting',{});
        };

        This.toggleAddNewDialog = function(){
            $rootScope.$emit('toggleDialogAddNew',{});
        }

        This.toggleContactDialog = function(contactId){
            $rootScope.$emit('toggleDialogContact', contactId);
        }

        $rootScope.$on('sortByChange', function(ev, value){
            This.sortByValue = value;
        })

        $rootScope.$on('refreshContactList', function(){
            _ajaxGetContacts();
        })

        // checks if there is a scrollbar in the contact list and adjusts the header
        // accordingly
        var _checkListViewScrollbar = function(){

            let headerDom = $('.listview-header') || false;
            let headerWidth = headerDom[0].clientWidth;
            let bodyWidth = $('.listview')[0].clientWidth;

            if (headerWidth > bodyWidth) {
                let variation = -Math.abs(headerWidth - bodyWidth);
                headerDom.css('left', variation + 'px');
            } else {
                headerDom.css('left', '0px');
            }
        };

        function _ajaxGetContacts() {
            myFactory.getContacts()
                .then(function(response){

                    var tempContactList = response.data.contactList.map(function(contact){
                        contact.initials = contact.first_name[0].toUpperCase()+ contact.last_name[0].toUpperCase();
                        contact.colour = myService.getColours();

                        return contact;
                    });

                    myService.setContactList(tempContactList);
                    This.contactList = myService.getContactList();

                    setTimeout(function(){
                        _checkListViewScrollbar();
                    }, 1);
                }, function (error){
                    console.log(error);
                });
        }

    }]);
