app.service('dialogContactService', ['$rootScope', function($rootScope){

    this.state = false;

    this.getState = function(){
        return this.state;
    }
}]);
