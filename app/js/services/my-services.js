app.service('myService',[ '$rootScope', function($rootScope){

    var colours = [
        '#db4540',
        '#384c7a',
        '#6cde9b',
        '#b07142',
        '#b771e0',
        '#e6d698',
        '#000',
        'lightgrey',
        'pink'
    ];

    this.getColours = function(){
        return colours[Math.floor(
                (Math.random() * colours.length)
            )];
    };

    var sortByValue = 'first_name';

    this.getSortByValue = function(){
        return sortByValue;
    }

    this.setSortByValue = function(value){
        sortByValue = value;
        $rootScope.$emit('sortByChange', value);
    };

    var contactList;

    this.setContactList = function(contactList){
        this.contactList = contactList;
    };

    function findContact(contactId, contacts){
        return contacts.id === contactId;
    }

    this.getContactList = function(index){
        return index ? this.contactList.find(findContact.bind(null, index))
                          : this.contactList;
    };

    this.updateContactInstanceState = function(){
        $rootScope.$emit('toggleDialogContact');
    }

    this.checkOpenState = function(state){
        state ? $('.container').attr('faded', true)
                : $('.container').removeAttr('faded');
    }
}]);
