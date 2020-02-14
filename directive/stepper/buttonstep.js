nsaApp.controller('buttonController', ['$scope','$log',
    function ($scope, $log) {

    }]).directive('buttonStep', function() {
    return {
        restrict: 'E',
        scope: {
            formName: '=',
            anomalie: '=',
            textAvanti: '@'
        },
        replace: true,
        controller: 'buttonController',
        templateUrl: 'views/directive/stepper/buttonStep.html'
    }
});