nsaApp.controller('nsaTableController', ['$scope','$log', 'modalService',
    function ($scope, $log, modalService) {
    // Codice Tabella
        $scope.disclaimer = false;
        $scope.form = {};
        $scope.currentPage = 1;
        $scope.sort = function(keyname){
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        };
        $scope.disclaimerFun = function(item){
            $scope.disclaimer = !$scope.disclaimer;
            $scope.detail = item;
        };
        $scope.openMenu = [];
        $scope.modenabled = function(index, dati){
            for(var a = 0; a <= dati.length; a++) if (a === index) {
                $scope.openMenu[a] = !$scope.openMenu[a];
            } else {
                $scope.openMenu[a] = false;
            }
        };
        /**
         * Modale registrazione user
         */
        $scope.detailView = function(title, body){
            modalService.showModal({}, {
                headerText: "Dettaglio",
                contentType: "",
                bodyText: "",
                scope: $scope,
                type: "detail",
                input: title,
                data: body
            });
        };

    }]).directive('nsaTable', function() {
    return {
        restrict: 'E',
        scope: {
            dati: '=',
            customHeader: '=',
            showSpinner: '=',
            tipologia: '=',
            detailViews: '=',
            functionEdit: '=',
            functionDetail: '=',
            voiceNoElement: '=',
            search: '=',
            detailObj: '=',
            searchElement: '=',
            tableName:'='
        },
        replace: true,
        controller: 'nsaTableController',
        templateUrl: 'views/directive/table.html'
    }
});