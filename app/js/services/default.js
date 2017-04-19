app.service('myService',[ '$rootScope', function($rootScope){

    var sortByValue = 'first_name';

    var colours = [
        '#db4540',
        '#384c7a',
        '#6cde9b',
        '#b07142',
        '#b771e0',
        '#e6d698'
    ];

    var contactList;

    this.getColours = function(index){
        return colours[index];
    };

    this.getSortByValue = function(){
        return sortByValue;
    }

    this.setSortByValue = function(value){
        sortByValue = value;

        $rootScope.$emit('sortByChange', value);
    };

    this.setContactList = function(contactList){
        this.contactList = contactList;
    };

    this.getContactList = function(index){
        if(index){
            for (let i in this.contactList){
                if(this.contactList[i].id == index){
                    return this.contactList[i];
                }
            }
        } else{
            return this.contactList;
        }
    };
}]);
