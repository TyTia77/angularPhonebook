app.factory('buttonFactory', function(){

    function Button(state){
        this.active = state || false;
    }

    Button.prototype.getActive = function(){
        return this.active;
    }

    Button.prototype.validate = function(callback, arg1){
        if (typeof callback === 'function'){
            this.active = callback(arg1);
        }
    }

    Button.prototype.handleClick = function(callback, arg1){
        if (typeof callback === 'function'){
            callback(arg1);
        }
    }

    return{
        new: Button
    }
});
