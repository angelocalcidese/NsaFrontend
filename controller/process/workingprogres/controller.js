nsaApp.controller('workingprogres', ['$scope', '$rootScope', '$log', 'modalService', 'RestServiceProcess', '$state',
    function ($scope, $rootScope, $log, modalService, RestServiceProcess, $state) {
        $scope.controlloUtente('workingprogres');

        $scope.tipologia= "tabellaclassica";
        $scope.tabActive= "coda";
        $scope.cancellaFiltri = function(){
            $scope.$parent.filterView = "";
            $scope.listWorkingProgress();
        };
        var optionForFilter = function(){

            var campi = {"username": $scope.operatore.user.username, "cmp": $scope.operatore.user.zona};
            // $scope.loaderModal();
            RestServiceProcess.getFiltriOption(campi)
                .then(function(response){
                    // if(response.data.code === 'KO') $scope.loaderModal('KO', response.data.description);
                    $scope.productOptions = response.data.options.productOptions;
                    $scope.userOptions = response.data.options.userOptions;
                    $scope.statusOptions = response.data.options.statusOptions;
                    $scope.anomaliesOptions = [{"entityId":"1","entityValue":"Si"},{"entityId":"0","entityValue":"No"}];

                     // $scope.loaderModal('OK', 'Elementi caricati', 1);

                    $scope.modalFilterInput = [ {"model": "", "label": "TIPO", "type": "title"},
                        {"model": "AD", "label": "Accettazione Diretta", "type": "checkbox"},
                        {"model": "B", "label": "Accettazione di Bolgetta", "type": "checkbox"},
                        {"model": "ED", "label": "Accettazione Decentrata per Editoria", "type": "checkbox"},
                        {"model": "E", "label": "Editoria", "type": "checkbox"},
                        {"model": "PE", "label": "Posta Easy", "type": "checkboxend"},
                        {"model": "codPrenotazione", "label": "PRENOTAZIONE", "type":"number", "required":false, "disabledMod": true},
                        {"model": "codiceCliente", "label": "CLIENTE", "type":"text", "required":false, "disabledMod": true},
                        {"model": "conto", "label": "CONTO", "type":"text", "required":false, "disabledMod": true},
                        {"model": "nomeProdotto", "label": "PRODOTTO", "type":"option", "required":false, "disabledMod": true , "option": $scope.productOptions, "open": false},
                        {"model": "utenteUltimaModifica", "label": "LAVORATO DA", "type":"option", "required":false, "disabledMod": true, "option": $scope.userOptions, "open": false},
                        {"model": "stato", "label": "STATO", "type":"option", "required":false, "disabledMod": false, "option": $scope.statusOptions, "open": false},
                        {"model": "presenteAnomalia", "label": "ANOMALIE", "type":"option", "required":false, "disabledMod": true, "option": $scope.anomaliesOptions, "open": false}
                    ];
                })
                .catch(function(error){
                    // $scope.loaderModal('KO', error.description);
                });
        };

        $scope.listWorkingProgress = function(elementView, start, finish){
            $scope.loaderModal();
            if(!start) start = 1;
            if(!finish) finish = 100;
            // var user = $scope.operatore.user.username;
            // var cmp = $scope.operatore.user.zona;
            // var tipolovorazione = $state.params.tab || $scope.tabActive; // ('coda’, ‘conclusi’ ‘bloccati’)
            $log.info(start + '\n' + finish);

            var campi = {"username": $scope.operatore.user.username,
                         "cmp": $scope.operatore.user.zona,
                         "tipolovorazione":$state.params.tab || $scope.tabActive,
                         "start": start,
                         "end": finish
            };
            if($scope.filterView){
                campi.codPrenotazione = $scope.filterView.codPrenotazione;
                campi.codiceCliente = $scope.filterView.codiceCliente;
                campi.conto = $scope.filterView.conto;
                campi.dataFiltro = $scope.filterView.dataFiltro;
                campi.giorni = $scope.filterView.giorni;
                campi.nomeProdotto = $scope.filterView.nomeProdotto;
                campi.presenteAnomalia = $scope.filterView.presenteAnomalia;
                campi.stato = $scope.filterView.stato;
                campi.tipo = $scope.filterView.tipo;
                campi.utenteUltimaModifica = $scope.filterView.utenteUltimaModifica;
            }

            RestServiceProcess.tailMachining(campi)
                .then(function(response){

                    if(response.data.code === 'KO') $scope.loaderModal('KO', response.data.description);

                    if(elementView){
                        $scope.ordinifinish = $scope.ordiniblocked = $scope.ordersinline = elementView;
                        var b = 0;
                        var startNewPage = start - 1;
                        for(var a=startNewPage; a < finish; a++){
                            $scope.ordinifinish[a] = $scope.ordiniblocked[a] =  $scope.ordersinline[a] = response.data.lavorazioni.righe[b];
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
                    $scope.loaderModal('KO', error.data.description);
                });
            optionForFilter();
        };
        if($scope.operatore && $scope.operatore.user && $scope.operatore.user.zona){
            $scope.ordersinline = $scope.ordinifinish = $scope.ordiniblocked = '';
            $scope.righeTotalOrdersInLine = $scope.righeTotalOrdersCompleted = $scope.righeTotalOrdersBlocked = '';

            $scope.listWorkingProgress();
        } else {
            $scope.loaderModal();
            $scope.loaderModal('KO', 'Errore: Utente sprovvisto di CMP');
        }

        $scope.$watch("operatore.user.zona", function(newValue, oldValue) {
            if(newValue !== oldValue){
                $scope.listWorkingProgress();
            }
        });

        $scope.headerTableOrdersInline = [{"key": "tipoAccettazione", "value": "Tipo", "type": "ordid"},
                                            {"key": "dataAccettazione", "value": "Data Accettazione", "type": "date"},
                                            {"key": "bookingId", "value": "Pren. n°", "type": "text"},
                                            {"key": "nomeCliente", "value": "Cliente", "type": "text"},
                                            {"key": "prodotto", "value": "Prodotto", "type": "text"},
                                            {"key": "servizio", "value": "Servizio access.", "type": "text"},
                                            {"key": "numPezzi", "value": "Pezzi", "type": "text"},
                                            {"key": "percentualeAvanzamento", "value": "Stato", "type": "percentage"},
                                            {"key": "numAnomalieAperte", "value": "Anomalie", "type": "anomalie"},
                                             {"key": "edit", "value": "", "type": "eye", "title": "Dettaglio Ordine"},
                                             {"key": "edit", "value": "", "type": "detail", "title": "Dettaglio Ordine"}
                                            ];
        $scope.headerTableOrdersFinish =[{"key": "tipoAccettazione", "value": "Tipo", "type": "ordid"},
                                        {"key": "dataAccettazione", "value": "Data Accettazione", "type": "date"},
                                        {"key": "bookingId", "value": "Ordine n°", "type": "text"},
                                        {"key": "nomeCliente", "value": "Cliente", "type": "text"},
                                        {"key": "prodotto", "value": "Prodotto", "type": "text"},
                                        {"key": "servizio", "value": "Servizio access.", "type": "text"},
                                        {"key": "numPezzi", "value": "Pezzi", "type": "text"},
                                        {"key": "descModalitaPagamento", "value": "Pagamento", "type": "text"},
                                        {"key": "", "value": "Valore", "type": "text"},
                                        {"key": "percentualeAvanzamento", "value": "Stato", "type": "percentage"},
                                        {"key": "numAnomalieAperte", "value": "Anomalie", "type": "anomalie"},
                                        {"key": "edit", "value": "", "type": "eyeCustom", "title": "Dettaglio Ordine"}
                                    ];
        $scope.headerTableOrdersBlocked = [{"key": "tipoAccettazione", "value": "Tipo", "type": "ordid"},
                                            {"key": "dataAccettazione", "value": "Data Accettazione", "type": "date"},
                                            {"key": "bookingId", "value": "Pren. n°", "type": "text"},
                                            {"key": "nomeCliente", "value": "Cliente", "type": "text"},
                                            {"key": "prodotto", "value": "Prodotto", "type": "text"},
                                            {"key": "servizio", "value": "Servizio access.", "type": "text"},
                                            {"key": "percentualeAvanzamento", "value": "Pezzi", "type": "percentage"},
                                            {"key": "numAnomalieAperte", "value": "Anomalie", "type": "anomalie"},
                                            {"key": "edit", "value": "", "type": "eye", "title": "Dettaglio Ordine"},
                                            {"key": "edit", "value": "", "type": "detail", "title": "Dettaglio Ordine"}
                                        ];

        $scope.modalFilterProcess = function(){

            modalService.showModal({}, {
                headerText: "Filtra per",
                contentType: "",
                bodyText: "",
                scope: $scope,
                type: "insert",
                input: $scope.modalFilterInput,
                data: $scope.$parent.filterView,
                callbackFunction: 'callBackFilter'
            });
        };

        $scope.callBackFilter = function(filter){

            if(filter.AD || filter.B || filter.ED || filter.E || filter.PE) var tipo = [];
            var countCheck = 0;
            if(filter.AD) {tipo.push('AD'); }
            if(filter.B) {tipo.push('B');}
            if(filter.ED) {tipo.push('ED');}
            if(filter.E) {tipo.push('E');}
            if(filter.PE) {tipo.push('PE');}

            if(filter.AD !== undefined) { countCheck++;}
            if(filter.B !== undefined) { countCheck++;}
            if(filter.ED !== undefined) { countCheck++;}
            if(filter.E !== undefined) { countCheck++;}
            if(filter.PE !== undefined) { countCheck++;}

            if(tipo) filter.tipo = tipo;
            $scope.$parent.filterView = filter;

            var keys = Object.keys(filter);
            var count = 0;
            for(var a = 0; a <= keys.length; a++){
                if((filter[keys[a]] !== undefined) && (filter[keys[a]] !== "")) count++;
            }
            $scope.$parent.countFilter = count - countCheck;
            $scope.listWorkingProgress('', '1', '100');
        };

        // MODALE ORDINI CONCLUSI
        $scope.detailOrdersFinished = function(dato){
            $scope.loaderModal();
            var campi = {"username": $scope.operatore.user.username,
                "cmp": $scope.operatore.user.zona,
                "idAccettazione":dato.idAccettazione
            };
            RestServiceProcess.getDettaglioConclusa(campi)
                .then(function(response){
                    if(response.data.code === 'KO'){
                        $scope.loaderModal('KO', response.data.description);
                    } else {
                        $scope.loaderModal('OK', 'Elementi caricati', 1);
                        modalService.showModal({}, {
                            headerText: "ORDINE N." + dato.idAccettazione,
                            buttonOk: "Esporta",
                            contentType: "",
                            bodyText: "",
                            scope: $scope,
                            type: "finished",
                            input: "",
                            data: response.data.lavorazione,
                            callbackFunction: ""
                        });
                    }
                })
                .catch(function(error){
                    $scope.loaderModal('KO', error.data.description);
                });
        };
        $scope.changeTab = function(tab){
            $scope.tabActive = tab;

            if(tab !== $state.params.tab){
                $scope.ordersinline = '';
                $scope.ordinifinish = '';
                $scope.ordiniblocked = '';
                $state.params.tab = tab;
                $state.go('root.workingprogres', {tab: tab});
            }
        };
        if($state.params.tab){
            $scope.changeTab($state.params.tab);
        } else {
            $state.params.tab = 'users';
            $scope.changeTab('users');
        }
        /**
         * Controllo provider Contract
         * @param item
         */
        $scope.controldetailOrdersInline = function(item){
            if(item.idContoFatturazione){
                modalService.showModal({}, {
                    headerText: "Spedizione",
                    contentType: "",
                    bodyText: "Provider Contract o Conto Contrattuale che verrà utilizzato per la spedizione: " + item.idContoFatturazione,
                    scope: $scope,
                    type: "confirmPC",
                    buttonOk: "ok",
                    input: '',
                    data: item,
                    callbackFunction: 'callBackControlProviderContr'
                });
            } else {
                item.tipoAzione = true;
                $scope.callBackControlProviderContr(item);
            }

        };
        $scope.callBackControlProviderContr = function(dati){
            if(dati.tipoAzione){
                delete dati.tipoAzione;
                $scope.modalPCCCInput = [
                    {"model": "conto", "label": "Cliente", "type":"label", "value": dati.nomeCliente , "required":false, "disabledMod": true},
                    {"model": "nomeProdotto", "label": "PROVIDER CONTRACT / CONTO CONTRATTUALE", "type":"option", "required":true, "disabledMod": true , "option": "", "open": false},
                ];

                modalService.showModal({}, {
                    headerText: "Cerca Provider Contract",
                    contentType: "Inserire il Provider Contract o Conto Contrattuale per avviare l’ordine.",
                    bodyText: "",
                    scope: $scope,
                    type: "insert",
                    input: $scope.modalPCCCInput,
                    data: dati,
                    callbackFunction: 'detailOrders'
                });
            } else {
                $scope.detailOrders(dati);
            }
        };
        $scope.detailOrders = function(item){
            $state.go('root.workingprogres.working', {order: item});
        };

        var controlloTab = function(tab){
            return (tab !== 'coda') && (tab !== 'conclusi') && (tab !== 'bloccati');
        };
        if(!$state.params.tab || controlloTab($state.params.tab)){
            $scope.changeTab('coda');
        }
    }]);