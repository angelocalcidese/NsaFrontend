nsaApp.controller('workingprogres', ['$scope', '$rootScope', '$log', 'modalService', 'RestServiceProcess', '$state',
    function ($scope, $rootScope, $log, modalService, RestServiceProcess, $state) {
        $scope.controlloUtente('workingprogres');

        $scope.tipologia= "tabellaclassica";
        $scope.tabActive= "ordersinline";

        $scope.listWorkingProgress = function(elementView, start, finish, dateFilter, giorni, wday){
            $scope.loaderModal();
            if(!start) start = 1;
            if(!finish) finish = 100;
            var user = $scope.operatore.user.username;
            var cmp = $scope.operatore.user.zona;
            $log.info(start + '\n' + finish);
            RestServiceProcess.tailMachining(dateFilter, cmp, giorni, wday, start, finish, user)
                .then(function(response){
                    if(elementView){
                        $scope.ordersinline = elementView;
                        var b = 0;
                        var startNewPage = start - 1;
                        for(var a=startNewPage; a < finish; a++){
                            $scope.ordersinline[a] = response.data.lavorazioni.righe[b];
                            b++;
                        }
                        $log.info($scope.ordersinline);
                    } else {
                        $scope.ordersinline = response.data.lavorazioni.righe;
                        $scope.ordinifinish = response.data.lavorazioni.righe;
                        $scope.ordiniblocked = response.data.lavorazioni.righe;


                        $scope.righeTotalOrdersInLine = response.data.lavorazioni.righeTotaliCoda;
                        $scope.righeTotalOrdersCompleted = response.data.lavorazioni.righeTotaliConcluse;
                        $scope.righeTotalOrdersBlocked = response.data.lavorazioni.righeTotaliBloccate;
                    }
                    $scope.loaderModal('OK', 'Elementi caricati', 1);
                })
                .catch(function(error){
                    $scope.loaderModal('KO', error.description);
                });
        };
        if($scope.operatore && $scope.operatore.user && $scope.operatore.user.zona){
            $scope.ordersinline = $scope.ordinifinish = $scope.ordiniblocked = '';
            $scope.righeTotalOrdersInLine = $scope.righeTotalOrdersCompleted = $scope.righeTotalOrdersBlocked = '';

            $scope.listWorkingProgress();
        } else {
            $scope.loaderModal();
            $scope.loaderModal('KO', 'Errore: Utente sprovvisto di CMP');
        }

        $scope.$watch("operatore.user.zona", function(newValue) {
            if(newValue){
                $scope.listWorkingProgress();
            }
        });
// INIZIO MOCK
//         $scope.ordersinline = [
//             {"idAccettazione":42341,"dataAccettazione":"2019-01-05T09:05:05.035Z","bookingId":"4102440","nomeCliente":"Primo","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"50", "numAnomalieAperte": "0"},
//             {"idAccettazione":2234342,"dataAccettazione":"2019-01-06T09:05:05.035Z","bookingId":"1234567","nomeCliente":"Iliad S.p.a.","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"60", "numAnomalieAperte": "0"},
//             {"idAccettazione":323434,"dataAccettazione":"2019-01-05T09:05:05.035Z","bookingId":"3453525","nomeCliente":"Iliad S.p.a.","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"20", "numAnomalieAperte": "0"},
//             {"idAccettazione":4234423,"dataAccettazione":"2019-01-07T09:05:05.035Z","bookingId":"5464564","nomeCliente":"Vodafone S.p.a.","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"90", "numAnomalieAperte": "0"},
//             {"idAccettazione":5234234,"dataAccettazione":"2019-01-08T09:05:05.035Z","bookingId":"4102440","nomeCliente":"Tim S.p.a.","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"50", "numAnomalieAperte": "0"},
//             {"idAccettazione":2342344,"dataAccettazione":"2019-01-06T09:05:05.035Z","bookingId":"1234567","nomeCliente":"Iliad S.p.a.","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"60", "numAnomalieAperte": "0"},
//             {"idAccettazione":4234234,"dataAccettazione":"2019-01-07T09:05:05.035Z","bookingId":"3453525","nomeCliente":"Iliad S.p.a.","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"20", "numAnomalieAperte": "0"},
//             {"idAccettazione":4423423,"dataAccettazione":"2019-01-04T09:05:05.035Z","bookingId":"5464564","nomeCliente":"Vodafone S.p.a.","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"90", "numAnomalieAperte": "0"},
//             {"idAccettazione":2344324,"dataAccettazione":"2019-01-03T09:05:05.035Z","bookingId":"4102440","nomeCliente":"Tim S.p.a.","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"50", "numAnomalieAperte": "0"},
//             {"idAccettazione":4322444,"dataAccettazione":"2019-01-03T09:05:05.035Z","bookingId":"1234567","nomeCliente":"Iliad S.p.a.","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"60", "numAnomalieAperte": "0"},
//             {"idAccettazione":3244343,"dataAccettazione":"2019-01-08T09:05:05.035Z","bookingId":"3453525","nomeCliente":"Iliad S.p.a.","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"20", "numAnomalieAperte": "0"},
//             {"idAccettazione":3242342,"dataAccettazione":"2019-01-09T09:05:05.035Z","bookingId":"5464564","nomeCliente":"Vodafone S.p.a.","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"90", "numAnomalieAperte": "0"},
//             {"idAccettazione":2434234,"dataAccettazione":"2019-01-11T09:05:05.035Z","bookingId":"4102440","nomeCliente":"Tim S.p.a.","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"50", "numAnomalieAperte": "0"},
//             {"idAccettazione":2342344,"dataAccettazione":"2019-01-11T09:05:05.035Z","bookingId":"1234567","nomeCliente":"Iliad S.p.a.","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"60", "numAnomalieAperte": "0"},
//             {"idAccettazione":4234234,"dataAccettazione":"2019-01-03T09:05:05.035Z","bookingId":"3453525","nomeCliente":"Iliad S.p.a.","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"20", "numAnomalieAperte": "0"},
//             {"idAccettazione":4234234,"dataAccettazione":"2019-01-03T09:05:05.035Z","bookingId":"3453525","nomeCliente":"Iliad S.p.a.","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"20", "numAnomalieAperte": "0"},
//             {"idAccettazione":4234234,"dataAccettazione":"2019-01-03T09:05:05.035Z","bookingId":"3453525","nomeCliente":"Iliad S.p.a.","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"20", "numAnomalieAperte": "0"},
//             {"idAccettazione":4234234,"dataAccettazione":"2019-01-03T09:05:05.035Z","bookingId":"3453525","nomeCliente":"Iliad S.p.a.","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"20", "numAnomalieAperte": "0"},
//             {"idAccettazione":4234234,"dataAccettazione":"2019-01-03T09:05:05.035Z","bookingId":"3453525","nomeCliente":"Iliad S.p.a.","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"20", "numAnomalieAperte": "0"},
//             {"idAccettazione":4324344,"dataAccettazione":"2019-01-07T09:05:05.035Z","bookingId":"5464564","nomeCliente":"Ultimo","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"90", "numAnomalieAperte": "0"}
//             ];

        // $scope.ordinifinish = [
        //     {"idAccettazione":32434234,"dataAccettazione":"2016-01-05T09:05:05.035Z","bookingId":"4102440","nomeCliente":"Tim S.p.a.","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"50", "numAnomalieAperte": "0"},
        //     {"idAccettazione":2342342,"dataAccettazione":"2016-01-05T09:05:05.035Z","bookingId":"1234567","nomeCliente":"Iliad S.p.a.","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"60", "numAnomalieAperte": "0"},
        //     {"idAccettazione":32344423,"dataAccettazione":"2016-01-05T09:05:05.035Z","bookingId":"3453525","nomeCliente":"Iliad S.p.a.","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"20", "numAnomalieAperte": "0"},
        //     {"idAccettazione":32423444,"dataAccettazione":"2016-01-05T09:05:05.035Z","bookingId":"5464564","nomeCliente":"Vodafone S.p.a.","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"90", "numAnomalieAperte": "0"},
        //     {"idAccettazione":5324234,"dataAccettazione":"2016-01-05T09:05:05.035Z","bookingId":"4102440","nomeCliente":"Tim S.p.a.","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"50", "numAnomalieAperte": "0"},
        //     {"idAccettazione":3242346,"dataAccettazione":"2016-01-05T09:05:05.035Z","bookingId":"1234567","nomeCliente":"Iliad S.p.a.","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"60", "numAnomalieAperte": "0"},
        //     {"idAccettazione":7234423,"dataAccettazione":"2016-01-05T09:05:05.035Z","bookingId":"3453525","nomeCliente":"Iliad S.p.a.","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"20", "numAnomalieAperte": "0"},
        //     {"idAccettazione":8242334,"dataAccettazione":"2016-01-05T09:05:05.035Z","bookingId":"5464564","nomeCliente":"Vodafone S.p.a.","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"90", "numAnomalieAperte": "0"}
        //     ];
        //
        // $scope.ordiniblocked = [
        //     {"idAccettazione":132434,"dataAccettazione":"2016-01-05T09:05:05.035Z","bookingId":"4102440","nomeCliente":"Tim S.p.a.","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"50", "numAnomalieAperte": "1"},
        //     {"idAccettazione":223423,"dataAccettazione":"2016-01-05T09:05:05.035Z","bookingId":"1234567","nomeCliente":"Iliad S.p.a.","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"60", "numAnomalieAperte": "2"},
        //     {"idAccettazione":323423,"dataAccettazione":"2016-01-05T09:05:05.035Z","bookingId":"3453525","nomeCliente":"Iliad S.p.a.","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"20", "numAnomalieAperte": "1"},
        //     {"idAccettazione":234234,"dataAccettazione":"2016-01-05T09:05:05.035Z","bookingId":"5464564","nomeCliente":"Vodafone S.p.a.","prodotto":"Posta Target Basic","servizio":"Qui e ora","statoAccettazione":"90", "numAnomalieAperte": "1"}
        //     ];

        $scope.headerTableOrdersInline = [{"key": "codModalitaAccettazione", "value": "Tipo", "type": "ordid"},
                                            {"key": "dataAccettazione", "value": "Data Prenotazione", "type": "date"},
                                            {"key": "bookingId", "value": "Pren. n°", "type": "text"},
                                            {"key": "nomeCliente", "value": "Cliente", "type": "text"},
                                            {"key": "prodotto", "value": "Prodotto", "type": "text"},
                                            {"key": "servizio", "value": "Servizio access.", "type": "text"},
                                            {"key": "numPezzi", "value": "Pezzi", "type": "text"},
                                            {"key": "statoAccettazione", "value": "Stato", "type": "percentage"},
                                            {"key": "numAnomalieAperte", "value": "Anomalie", "type": "text"},
                                             {"key": "edit", "value": "", "type": "eye", "title": "Dettaglio Ordine"},
                                             {"key": "edit", "value": "", "type": "detail", "title": "Dettaglio Ordine"}
                                            ];
        $scope.headerTableOrdersFinish =[{"key": "codModalitaAccettazione", "value": "Tipo", "type": "ordid"},
                                        {"key": "dataAccettazione", "value": "Pren. n°", "type": "date"},
                                        {"key": "bookingId", "value": "Pren. n°", "type": "text"},
                                        {"key": "nomeCliente", "value": "Cliente", "type": "text"},
                                        {"key": "prodotto", "value": "Prodotto", "type": "text"},
                                        {"key": "servizio", "value": "Servizio access.", "type": "text"},
                                        {"key": "edit", "value": "", "type": "eye", "title": "Dettaglio Ordine"},
                                        {"key": "edit", "value": "", "type": "detail", "title": "Dettaglio Ordine"}
                                    ];
        $scope.headerTableOrdersBlocked = [{"key": "codModalitaAccettazione", "value": "Tipo", "type": "ordid"},
                                            {"key": "dataAccettazione", "value": "Pren. n°", "type": "date"},
                                            {"key": "bookingId", "value": "Pren. n°", "type": "text"},
                                            {"key": "nomeCliente", "value": "Cliente", "type": "text"},
                                            {"key": "prodotto", "value": "Prodotto", "type": "text"},
                                            {"key": "servizio", "value": "Servizio access.", "type": "text"},
                                            {"key": "statoAccettazione", "value": "Pezzi", "type": "percentage"},
                                            {"key": "numAnomalieAperte", "value": "Anomalie", "type": "text"},
                                            {"key": "edit", "value": "", "type": "eye", "title": "Dettaglio Ordine"},
                                            {"key": "edit", "value": "", "type": "detail", "title": "Dettaglio Ordine"}
                                        ];
// FINE MOCK
        $scope.modalFilterInput = [ {"model": "", "label": "TIPO", "type": "title"},
            {"model": "directacept", "label": "Accettazione Diretta", "type": "checkbox"},
            {"model": "bill", "label": "Bolletta", "type": "checkbox"},
            {"model": "decentralization", "label": "Decentramento", "type": "checkboxend"},
            {"model": "idAccettazione", "label": "PRENOTAZIONE", "type":"text", "required":true, "disabledMod": true},
            {"model": "nomeCliente", "label": "CLIENTE", "type":"text", "required":true, "disabledMod": true},
            {"model": "bookingId", "label": "CONTO", "type":"text", "required":true, "disabledMod": true},
            {"model": "prodotto", "label": "PRODOTTO", "type":"option", "required":true, "disabledMod": true},
            {"model": "workto", "label": "LAVORATO DA", "type":"option", "required":true, "disabledMod": true},
            {"model": "state", "label": "STATO", "type":"option", "required":true, "disabledMod": true},
            {"model": "numAnomalieAperte", "label": "ANOMALIE", "type":"option", "required":true, "disabledMod": true},
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