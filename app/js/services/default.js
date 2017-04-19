app.service('myService', function(){

    var initialised = false;

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

    this.getInitialised = function(){
        return initialised;
    };

    this.setInitialised = function(){
        initialised = true;
    }
});
