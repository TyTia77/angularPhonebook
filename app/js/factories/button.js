app.factory('buttonFactory', ['$rootScope', function($rootScope){

    function Button(state){
        this.active = state || false;
    }

    Button.prototype.getState = function(){
        return this.active;
    }

    Button.prototype.setState = function(state){
        this.active = state;
    }

    // Button.prototype.validate = function(callback, arg1){
    //     if (typeof callback === 'function'){
    //         this.active = callback(arg1);
    //     }
    // }
    //
    // Button.prototype.handleClick = function(callback, arg1){
    //     if (typeof callback === 'function'){
    //         callback(arg1);
    //     }
    // }

    return{
        new: Button
    }
}]);
