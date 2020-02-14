nsaApp.controller('working', ['$scope', '$rootScope', '$log', 'modalService', 'RestService', '$state',
    function ($scope, $rootScope, $log, modalService, RestService, $state) {
        $scope.controlloUtente('working');

        $scope.format = 'yyyy/MM/dd';
        $scope.date = new Date();
        // MOCK
        $scope.tabledetail = [{'id': 'P1', 'format': 'Piccolo', 'logistic': 'Standard', 'price': '500', 'weight': '20 gr', 'destination': 'EU',
            'rate': '0.25€', 'subtotal':'125,00 €', 'omog': 'SI', 'codeomog': 'CODOM001', 'action': ''}];

        $scope.headerTableDetail = [{"key": "id", "value": "ID", "type": "text"},
            {"key": "format", "value": "Formato", "type": "text"},
            {"key": "logistic", "value": "F.Logistico", "type": "text"},
            {"key": "price", "value": "Prezzi", "type": "text"},
            {"key": "weight", "value": "Peso", "type": "text"},
            {"key": "destination", "value": "Dest. T.", "type": "text"},
            {"key": "rate", "value": "Tariffa", "type": "text"},
            {"key": "subtotal", "value": "Sub-tot", "type": "text"},
            {"key": "omog", "value": "Gr.omog.", "type": "text"},
            {"key": "codeomog", "value": "Codice.om.", "type": "text"},
            {"key": "action", "value": "Azioni", "type": "action"}];


        $log.info($state.params);
        if($state.params.order){
            sessionStorage.order = JSON.stringify($state.params.order);
            $scope.order = $state.params.order;
        } else if(!$state.params.order && sessionStorage.order){
            $scope.order = JSON.parse(sessionStorage.order);
        } else {
            $scope.goTo('root.workingprogres');
        }
        $log.info($scope.order);

        // $scope.stepperCreate($scope.dataStep);


    function Init(){
        $scope.stepperViewElement();
        $scope.resetBall(0, '', true);
    }

    Init();
    }]);