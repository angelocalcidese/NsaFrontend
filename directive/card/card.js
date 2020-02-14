nsaApp.controller('nsaCardController', ['$scope','$log', 'modalService',
    function ($scope, $log, modalService) {
        // Codice Card
        $scope.form ={};
        $scope.currentPage = 1;
        $scope.sort = function(keyname){
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        };
        $scope.elementViews = 8;
        $scope.operNum = false;

        $scope.confirmAction = function(value){
            modalService.showModal({}, {
                scope: $scope,
                type: "confirm",
                data: value,
                callbackFunction: 'confirmActionCallBack'
            });
            $scope.valAct = value;
        };
        $scope.confirmActionCallBack = function(){
           $scope.actionBottom($scope.valAct);
           $log.info($scope.valAct);
        };

    }]).directive('nsaCard', function() {
    return {
        restrict: 'E',
        scope: {
            dettaglioVoice:'=',
            dettaglio:'=',
            cards:'=',
            cardVoice:'=',
            actionBottom:'=',
            actionFunDett:'=',
            showSpinner:'=',
            searchElement: '=',
            cardName:'='
        },
        replace: true,
        controller: 'nsaCardController',
        templateUrl: 'views/directive/card.html'
    }
});