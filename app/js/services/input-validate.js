app.service('validateService',[ '$rootScope', function($rootScope){

    this.email = function(input){
        // var re =  new RegExp(/\S+@\S+\.\S+/);
        var regExp =  /\S+@\S+\.\S+/;
        if (input === undefined || input === ''){
            return true;
        }
        return regExp.test(input);
    };

    this.text = function(input){
        var regExp = /^[a-zA-Z\s]+$/;

        if (input === undefined || input === ''){
            return false;
        }

        return regExp.test(input);
    }

    this.num = function(input){
        var regExp = /^[0-9]+$/;

        if (input === undefined || input === ''){
            return true;
        } else if (input.length < 10){
            return false;
        }

        return regExp.test(input);
    }

    this.errorMsgTemplate = function(){
        return {
            firstname: {
                msg: 'Only letters and is required',
                display: false
            },
            lastname: {
                msg: 'Only letters and is required',
                display: false
            },
            email: {
                msg: 'Invalid Email, Please try again',
                display: false
            },
            mobile: {
                msg: 'Only numbers allowed and 10digits',
                display: false
            }
        };
    };

}]);
