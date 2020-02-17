nsaApp.controller('workingprogres', ['$scope', '$rootScope', '$log', 'modalService', 'RestService', '$state',
    function ($scope, $rootScope, $log, modalService, RestService, $state) {
        $scope.controlloUtente('workingprogres');

        $scope.tipologia= "tabellaclassica";
        $scope.tabActive= "ordersinline";
// INIZIO MOCK
        $scope.ordersinline = [
            {"id":42341,"bookingdate":"2019-01-05T09:05:05.035Z","bookingcode":"4102440","client":"Tim S.p.a.","product":"Posta Target Basic","service":"Qui e ora","state":"50", "anomalies": "0"},
            {"id":2234342,"bookingdate":"2019-01-06T09:05:05.035Z","bookingcode":"1234567","client":"Iliad S.p.a.","product":"Posta Target Basic","service":"Qui e ora","state":"60", "anomalies": "0"},
            {"id":323434,"bookingdate":"2019-01-05T09:05:05.035Z","bookingcode":"3453525","client":"Iliad S.p.a.","product":"Posta Target Basic","service":"Qui e ora","state":"20", "anomalies": "0"},
            {"id":4234423,"bookingdate":"2019-01-07T09:05:05.035Z","bookingcode":"5464564","client":"Vodafone S.p.a.","product":"Posta Target Basic","service":"Qui e ora","state":"90", "anomalies": "0"},
            {"id":5234234,"bookingdate":"2019-01-08T09:05:05.035Z","bookingcode":"4102440","client":"Tim S.p.a.","product":"Posta Target Basic","service":"Qui e ora","state":"50", "anomalies": "0"},
            {"id":2342344,"bookingdate":"2019-01-06T09:05:05.035Z","bookingcode":"1234567","client":"Iliad S.p.a.","product":"Posta Target Basic","service":"Qui e ora","state":"60", "anomalies": "0"},
            {"id":4234234,"bookingdate":"2019-01-07T09:05:05.035Z","bookingcode":"3453525","client":"Iliad S.p.a.","product":"Posta Target Basic","service":"Qui e ora","state":"20", "anomalies": "0"},
            {"id":4423423,"bookingdate":"2019-01-04T09:05:05.035Z","bookingcode":"5464564","client":"Vodafone S.p.a.","product":"Posta Target Basic","service":"Qui e ora","state":"90", "anomalies": "0"},
            {"id":2344324,"bookingdate":"2019-01-03T09:05:05.035Z","bookingcode":"4102440","client":"Tim S.p.a.","product":"Posta Target Basic","service":"Qui e ora","state":"50", "anomalies": "0"},
            {"id":4322444,"bookingdate":"2019-01-03T09:05:05.035Z","bookingcode":"1234567","client":"Iliad S.p.a.","product":"Posta Target Basic","service":"Qui e ora","state":"60", "anomalies": "0"},
            {"id":3244343,"bookingdate":"2019-01-08T09:05:05.035Z","bookingcode":"3453525","client":"Iliad S.p.a.","product":"Posta Target Basic","service":"Qui e ora","state":"20", "anomalies": "0"},
            {"id":3242342,"bookingdate":"2019-01-09T09:05:05.035Z","bookingcode":"5464564","client":"Vodafone S.p.a.","product":"Posta Target Basic","service":"Qui e ora","state":"90", "anomalies": "0"},
            {"id":2434234,"bookingdate":"2019-01-11T09:05:05.035Z","bookingcode":"4102440","client":"Tim S.p.a.","product":"Posta Target Basic","service":"Qui e ora","state":"50", "anomalies": "0"},
            {"id":2342344,"bookingdate":"2019-01-11T09:05:05.035Z","bookingcode":"1234567","client":"Iliad S.p.a.","product":"Posta Target Basic","service":"Qui e ora","state":"60", "anomalies": "0"},
            {"id":4234234,"bookingdate":"2019-01-03T09:05:05.035Z","bookingcode":"3453525","client":"Iliad S.p.a.","product":"Posta Target Basic","service":"Qui e ora","state":"20", "anomalies": "0"},
            {"id":4324344,"bookingdate":"2019-01-07T09:05:05.035Z","bookingcode":"5464564","client":"Vodafone S.p.a.","product":"Posta Target Basic","service":"Qui e ora","state":"90", "anomalies": "0"}
            ];

        $scope.ordinifinish = [
            {"id":32434234,"bookingdate":"2016-01-05T09:05:05.035Z","bookingcode":"4102440","client":"Tim S.p.a.","product":"Posta Target Basic","service":"Qui e ora","state":"50", "anomalies": "0"},
            {"id":2342342,"bookingdate":"2016-01-05T09:05:05.035Z","bookingcode":"1234567","client":"Iliad S.p.a.","product":"Posta Target Basic","service":"Qui e ora","state":"60", "anomalies": "0"},
            {"id":32344423,"bookingdate":"2016-01-05T09:05:05.035Z","bookingcode":"3453525","client":"Iliad S.p.a.","product":"Posta Target Basic","service":"Qui e ora","state":"20", "anomalies": "0"},
            {"id":32423444,"bookingdate":"2016-01-05T09:05:05.035Z","bookingcode":"5464564","client":"Vodafone S.p.a.","product":"Posta Target Basic","service":"Qui e ora","state":"90", "anomalies": "0"},
            {"id":5324234,"bookingdate":"2016-01-05T09:05:05.035Z","bookingcode":"4102440","client":"Tim S.p.a.","product":"Posta Target Basic","service":"Qui e ora","state":"50", "anomalies": "0"},
            {"id":3242346,"bookingdate":"2016-01-05T09:05:05.035Z","bookingcode":"1234567","client":"Iliad S.p.a.","product":"Posta Target Basic","service":"Qui e ora","state":"60", "anomalies": "0"},
            {"id":7234423,"bookingdate":"2016-01-05T09:05:05.035Z","bookingcode":"3453525","client":"Iliad S.p.a.","product":"Posta Target Basic","service":"Qui e ora","state":"20", "anomalies": "0"},
            {"id":8242334,"bookingdate":"2016-01-05T09:05:05.035Z","bookingcode":"5464564","client":"Vodafone S.p.a.","product":"Posta Target Basic","service":"Qui e ora","state":"90", "anomalies": "0"}
            ];

        $scope.ordiniblocked = [
            {"id":132434,"bookingdate":"2016-01-05T09:05:05.035Z","bookingcode":"4102440","client":"Tim S.p.a.","product":"Posta Target Basic","service":"Qui e ora","state":"50", "anomalies": "1"},
            {"id":223423,"bookingdate":"2016-01-05T09:05:05.035Z","bookingcode":"1234567","client":"Iliad S.p.a.","product":"Posta Target Basic","service":"Qui e ora","state":"60", "anomalies": "2"},
            {"id":323423,"bookingdate":"2016-01-05T09:05:05.035Z","bookingcode":"3453525","client":"Iliad S.p.a.","product":"Posta Target Basic","service":"Qui e ora","state":"20", "anomalies": "1"},
            {"id":234234,"bookingdate":"2016-01-05T09:05:05.035Z","bookingcode":"5464564","client":"Vodafone S.p.a.","product":"Posta Target Basic","service":"Qui e ora","state":"90", "anomalies": "1"}
            ];

        $scope.headerTableOrdersInline = [{"key": "id", "value": "Tipo", "type": "ordid"},
                                            {"key": "bookingdate", "value": "Pren. n°", "type": "date"},
                                            {"key": "bookingcode", "value": "Pren. n°", "type": "text"},
                                            {"key": "client", "value": "Cliente", "type": "text"},
                                            {"key": "product", "value": "Prodotto", "type": "text"},
                                            {"key": "service", "value": "Servizio access.", "type": "text"},
                                            {"key": "state", "value": "Pezzi", "type": "percentage"},
                                            {"key": "anomalies", "value": "Anomalie", "type": "text"},
                                             {"key": "edit", "value": "", "type": "eye", "title": "Dettaglio Ordine"},
                                             {"key": "edit", "value": "", "type": "detail", "title": "Dettaglio Ordine"}
                                            ];
        $scope.headerTableOrdersFinish =[{"key": "id", "value": "Tipo", "type": "ordid"},
                                        {"key": "bookingdate", "value": "Pren. n°", "type": "date"},
                                        {"key": "bookingcode", "value": "Pren. n°", "type": "text"},
                                        {"key": "client", "value": "Cliente", "type": "text"},
                                        {"key": "product", "value": "Prodotto", "type": "text"},
                                        {"key": "service", "value": "Servizio access.", "type": "text"},
                                        {"key": "edit", "value": "", "type": "eye", "title": "Dettaglio Ordine"},
                                        {"key": "edit", "value": "", "type": "detail", "title": "Dettaglio Ordine"}
                                    ];
        $scope.headerTableOrdersBlocked = [{"key": "id", "value": "Tipo", "type": "ordid"},
                                            {"key": "bookingdate", "value": "Pren. n°", "type": "date"},
                                            {"key": "bookingcode", "value": "Pren. n°", "type": "text"},
                                            {"key": "client", "value": "Cliente", "type": "text"},
                                            {"key": "product", "value": "Prodotto", "type": "text"},
                                            {"key": "service", "value": "Servizio access.", "type": "text"},
                                            {"key": "state", "value": "Pezzi", "type": "percentage"},
                                            {"key": "anomalies", "value": "Anomalie", "type": "text"},
                                            {"key": "edit", "value": "", "type": "eye", "title": "Dettaglio Ordine"},
                                            {"key": "edit", "value": "", "type": "detail", "title": "Dettaglio Ordine"}
                                        ];
// FINE MOCK
        $scope.modalFilterInput = [ {"model": "", "label": "TIPO", "type": "title"},
            {"model": "directacept", "label": "Accettazione Diretta", "type": "checkbox"},
            {"model": "bill", "label": "Bolletta", "type": "checkbox"},
            {"model": "decentralization", "label": "Decentramento", "type": "checkboxend"},
            {"model": "id", "label": "PRENOTAZIONE", "type":"text", "required":true, "disabledMod": true},
            {"model": "client", "label": "CLIENTE", "type":"text", "required":true, "disabledMod": true},
            {"model": "bookingcode", "label": "CONTO", "type":"text", "required":true, "disabledMod": true},
            {"model": "product", "label": "PRODOTTO", "type":"option", "required":true, "disabledMod": true},
            {"model": "workto", "label": "LAVORATO DA", "type":"option", "required":true, "disabledMod": true},
            {"model": "state", "label": "STATO", "type":"option", "required":true, "disabledMod": true},
            {"model": "anomalies", "label": "ANOMALIE", "type":"option", "required":true, "disabledMod": true},
        ];
        $scope.modalFilterProcess = function(){
            modalService.showModal({}, {
                headerText: "Filtra per",
                contentType: "",
                bodyText: "",
                scope: $scope,
                type: "insert",
                input: $scope.modalFilterInput,
                callbackFunction: ''
            });
        };

        $scope.changeTab = function(tab){
            $scope.tabActive = tab;
            $state.params.tab = tab;
            $state.go('root.workingprogres', {tab: tab});
        };
        if($state.params.tab){
            $scope.changeTab($state.params.tab);
        } else {
            $state.params.tab = 'users';
            $scope.changeTab('users');
        }
        $scope.detailOrdersInline = function(item){
            $state.go('root.workingprogres.working', {order: item});
        };
    }]);