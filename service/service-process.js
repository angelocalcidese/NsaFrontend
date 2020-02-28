nsaApp.service('RestServiceProcess', ['$http','BASEPATH', 'APP',
    function ($http, BASEPATH, APP) {
        var _tailMachining = function (campi) {
            // required
            var search = "?frazionario=" + campi.cmp + "&end=" + campi.end + "&start=" + campi.start + "&username=" + campi.username + "&tipoLavorazioni=" + campi.tipolovorazione;
            // no required
            if(campi.codPrenotazione)  search += "&codPrenotazione=" + campi.codPrenotazione;
            if(campi.codiceCliente)  search += "&codiceCliente=" + campi.codiceCliente;
            if(campi.conto)  search += "&conto=" + campi.conto;
            if(campi.dataFiltro)  search += "&dataFiltro=" + campi.dataFiltro;
            if(campi.giorni)  search += "&giorni=" + campi.giorni;
            if(campi.nomeProdotto)  search += "&nomeProdotto=" + campi.nomeProdotto;
            if(campi.presenteAnomalia)  search += "&presenteAnomalia=" + campi.presenteAnomalia;
            if(campi.stato)  search += "&stato=" + campi.stato;
            if(campi.tipo)  search += "&tipo=" + campi.tipo;
            if(campi.utenteUltimaModifica)  search += "&utenteUltimaModifica=" + campi.utenteUltimaModifica;

            // call
            return $http.get(BASEPATH + 'accettazione/lista' + search);
        };
        var _getFiltriOption = function(campi) {
            var search = "?frazionario=" + campi.cmp + "&username=" + campi.username;
            if(campi.dataFiltro)  search += "&dataFiltro=" + campi.dataFiltro;
            if(campi.giorni)  search += "&giorni=" + campi.giorni;

            return $http.get(BASEPATH + 'accettazione/filtri/option' + search);
        };
        var _getDettaglioConclusa = function(campi) {
            var search = "?frazionario=" + campi.cmp + "&username=" + campi.username + "&idAccettazione=" + campi.idAccettazione;
            return $http.get(BASEPATH + 'accettazione/dettaglio/conclusa' + search);
        };
            return {
                tailMachining: _tailMachining,
                getFiltriOption: _getFiltriOption,
                getDettaglioConclusa: _getDettaglioConclusa
            };
        }
    ]);
