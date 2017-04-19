app.factory('myFactory', ['$http', function($http){
    // const urlBase = 'http://localhost:5000/contacts';
    // const urlBase = 'https://60.242.62.79:5000/contacts';
    let urlBase = 'http://60.242.62.79:5000/contacts';
    // const urlBase = 'https://shrouded-lake-43811.herokuapp.com/contacts';
    let api = {};

    api.getContacts = function(){
        return $http.get(urlBase);
    };

    api.insertContact = function(contact){
        return $http.post(urlBase, contact);
    };

    api.updateContact = function(id, contact){
        return $http.put(urlBase +'/' +id, contact);
    };

    api.deleteContact = function(id){
        return $http.delete(urlBase +'/' +id);
    };

    return api;

}]);
