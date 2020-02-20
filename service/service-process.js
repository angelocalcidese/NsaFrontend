nsaApp.service('RestServiceProcess', ['$http','BASEPATH', 'APP',
    function ($http, BASEPATH, APP) {
        var _tailMachining = function (data, cmp, giorni, wday, start, finish, user) {
            // required
            var search = "?frazionario=" + cmp + "&rigaFine=" + finish + "&rigaPartenza=" + start + "&username=" + user;
            // no required
            if(data) search += "&dataFiltro=" + data;
            if(giorni) search += "&giorni=" + giorni;
            if(wday) search += "&lavorazioniOdierne=" + wday;
            // call
            return $http.get(BASEPATH + 'accettazione/lista' + search);
        };
            return {
                tailMachining: _tailMachining
            };
        }
    ]);
