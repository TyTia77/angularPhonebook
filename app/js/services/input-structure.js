app.service('inputStructure',[ '$rootScope', function($rootScope){

            var inputs = {
                firstname: {
                    input: 'text',
                    label: 'firstname',
                    id: 'first_name',
                    multi: false
                },
                lastname: {
                    input: 'text',
                    label: 'lastname',
                    id: 'last_name',
                    multi: false
                },
                email: {
                    input: 'text',
                    label: 'email',
                    id: 'email',
                    multi: false
                },
                mobile: {
                    input: 'text',
                    label: 'mobile',
                    id: 'phone_mob',
                    multi: false
                },
                gender: {
                    multi: true,
                    label: 'gender',
                    entries: {
                        male:{
                            input: 'radio',
                            label: 'male',
                            id: 'male'
                        },
                        female:{
                            input: 'radio',
                            label: 'female',
                            id: 'female'
                        }
                    }
                }
            };

    this.getInputs = function(){
        return inputs;
    };
}]);
