app.service('myService',[ '$rootScope', function($rootScope){

    var colours = [
        '#db4540',
        '#384c7a',
        '#6cde9b',
        '#b07142',
        '#b771e0',
        '#e6d698'
    ];

    this.getColours = function(index){
        return colours[index];
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

    this.getContactList = function(index){
        return index ? this.contactList.find(contact => contact.id === index)
                          : this.contactList;

        // if(index){
        //     // for (let i in this.contactList){
        //     //     if(this.contactList[i].id == index){
        //     //         return this.contactList[i];
        //     //     }
        //     // }
        //     return this.contactList.find(function(contact){
        //         return contact.id === index;
        //     });
        // } else{
        //     return this.contactList;
        // }
    };

    this.updateContactInstanceState = function(){
        $rootScope.$emit('toggleDialogContact');
    }

    this.checkOpenState = function(state){
        state ? $('.container').attr('faded', true)
                : $('.container').removeAttr('faded');

        // if (state){
        //     $('.container').attr('faded', true);
        // } else{
        //     $('.container').removeAttr('faded');
        // }
    }
}]);
