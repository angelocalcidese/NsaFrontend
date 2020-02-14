nsaApp.config(['$httpProvider', '$qProvider',
    function ($httpProvider, $qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
        //Configurazione chiamate HTTP POST con header 'application/json'
        $httpProvider.defaults.headers.common['Authorization'] = 'Basic ' + btoa("admin" + ":" + "adminPass");
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
    }]).config(['uibDatepickerPopupConfig', function(uibDatepickerPopupConfig) {
        uibDatepickerPopupConfig.closeText = 'Chiudi';
        uibDatepickerPopupConfig.currentText = 'Oggi';
        uibDatepickerPopupConfig.clearText = 'Azzera';
}]);
