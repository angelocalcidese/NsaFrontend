nsaApp.controller('nsaStepperController', ['$scope','$log', 'modalService','uibDateParser',
    function ($scope, $log, modalService, uibDateParser) {
        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(),
            startingDay: 1
        };
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && date.getDay() >= new Date() ;
        }
        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };
        $scope.format = "dd/MM/yyyy";
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.currentPage = 1;
        $scope.sort = function(keyname){
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        };
        $scope.modenabled = function(index, dati){
            for(var a = 0; a <= dati.length; a++) if (a === index) {
                $scope.openMenu[a] = !$scope.openMenu[a];
            } else {
                $scope.openMenu[a] = false;
            }
        };
        $scope.openMenu = [];
        $scope.getTemplateUrl = function() {
            if ($scope.type === "distinta")
                return "views/directive/stepper/distinta.html";
            if ($scope.type === "dettaglio")
                return "views/directive/stepper/dettaglio.html";
            if ($scope.type === "aggiuntivi")
                return "views/directive/stepper/aggiuntivi.html";
            if ($scope.type === "allestimento")
                return "views/directive/stepper/allestimento.html";
        };


    }]).directive("stepperType", function() {
    return {
        template: '<ng-include src="getTemplateUrl()"/>',
        //templateUrl: unfortunately has no access to $scope.user.type
        scope: {
            type: '=',
            formData: '=',
            stepNumber: '=',
            sottostepNumber: '=',
            tableDetail: '=',
            valueDetail: '='
        },
        restrict: 'E',
        controller: 'nsaStepperController'
    };
});