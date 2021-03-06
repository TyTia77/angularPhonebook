app.directive('customDialog', [ function(){
    return {
        // E - element, A - attribute
        restrict: 'E',
        scope: {
            // '=' - bind to attribute/property
            // '@' - pass as string
            headerTitle: '=',
            class: '='
        },
        // transclude: true,
        transclude: {
            // ? - makes element optional
            // right - inside custom directive element
            'body': '?dialogBody',
            'footer': '?dialogFooter'
        },
        // replace: true,
        templateUrl: 'app/view/custom-directives/custom-dialog.html',
        // controller: function($scope){
        //
        // }
        // controller: 'dialogSettingCtrl'
        controller: '@',
        name: 'controller'
    };
}]);
