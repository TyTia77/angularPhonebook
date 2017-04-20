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

        function _ajaxGetContacts() {
            myFactory.getContacts()
                .then(function(response){

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

    }]);
