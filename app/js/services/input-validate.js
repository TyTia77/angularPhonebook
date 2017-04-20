app.service('validateService',[ '$rootScope', function($rootScope){

    this.email = function(input){
        // var re =  new RegExp(/\S+@\S+\.\S+/);
        var regExp =  /\S+@\S+\.\S+/;
        return regExp.test(input);
    };

    this.text = function(input){
        var regExp = /^[a-zA-Z\s]+$/;
        return regExp.test(input);
    }

    this.num = function(input){
        var regExp = /^[0-9]+$/;
        return regExp.test(input);
    }
}]);
