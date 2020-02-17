nsaApp.controller('working', ['$scope', '$rootScope', '$log', 'modalService', 'RestService', '$state',
    function ($scope, $rootScope, $log, modalService, RestService, $state) {
        $scope.controlloUtente('working');

        $scope.format = 'yyyy/MM/dd';
        $scope.date = new Date();

        // INIZIO MOCK
        $scope.tabledetail = [{'id': 'P1', 'format': 'Piccolo', 'logistic': 'Standard', 'price': '500', 'weight': '20 gr', 'destination': 'EU', 'rate': '0.25€', 'subtotal':'125,00 €', 'omog': 'SI', 'codeomog': 'CODOM001', 'action': ''},
            {'id': 'P1', 'format': 'Piccolo', 'logistic': 'Standard', 'price': '500', 'weight': '20 gr', 'destination': 'EU', 'rate': '0.25€', 'subtotal':'125,00 €', 'omog': 'SI', 'codeomog': 'CODOM001', 'action': ''}];

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

        $scope.formato = [];
        $scope.logistico = [];
        // FINE MOCK

        // MODALE POSIZIONE
        $scope.modalPositionInput = [{"model": "format", "label": "Formato", "type":"option", "option": [{"entityId": "1", "entityValue": "valore 1"}, {"entityId": "2", "entityValue": "valore 2"}],"required":true},
            {"model": "logistic", "label": "Formato Logistico", "type":"option", "option": [{"entityId": "1", "entityValue": "valore 1"}, {"entityId": "2", "entityValue": "valore 2"}],"required":true},
            {"model": "weight", "label": "Peso", "type":"weight", "required":true},
            {"model":"gromog", "label":"Grammatura Omogenea","type":"radiobutton2", "required":true},
            {"model": "pieces", "label": "N°Pezzi", "type":"text", "required":true},
            {"model": "codomog", "label": "Codice omologazione", "type":"option", "option": [{"entityId": "1", "entityValue": "valore 1"}, {"entityId": "2", "entityValue": "valore 2"}], "required":true},
            {"model": "tariffdest", "label": "Destinazione Tariffaria", "type":"option", "option": [{"entityId": "1", "entityValue": "valore 1"}, {"entityId": "2", "entityValue": "valore 2"}], "required":true},
            {"model": "dest", "label": "Paese", "type":"option", "option": [{"entityId": "1", "entityValue": "valore 1"}, {"entityId": "2", "entityValue": "valore 2"}] ,"required":true},
            {"model": "", "label": "Grammatura Omogenea", "type": "title"},
            {"model": "moneyorder", "label": "Assegno a mezzo vaglia", "type": "checkbox"},
            {"model": "receptarea", "label": "Avviso di ricevimento (Zona 1)", "type": "checkbox"},
            {"model": "priorityarea", "label": "Avviso di ricevimento Prioritario", "type": "checkbox"},
            {"model": "postalcheck", "label": "Avviso ricevimento (Zona 2, Zona 3)", "type": "checkbox"},
            {"model": "cashdelivery", "label": "Contrassegno Estero", "type": "checkbox"}
           ];
        $scope.modalPosition = function(){
            modalService.showModal({}, {
                headerText: "Aggiungi Posizione",
                contentType: "",
                bodyText: "",
                scope: $scope,
                type: "insert",
                input: $scope.modalPositionInput,
                callbackFunction: ''
            });
        };

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