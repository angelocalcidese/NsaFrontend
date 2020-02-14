nsaApp.controller('application', ['$scope', '$log', '$state','RestService', 'modalService',
    function ($scope, $log, $state, RestService, modalService) {
        $scope.controlloUtente('application');
        $scope.tipologia= "tabellaclassica";
        // $scope.tabActiveAdm= "applications";
        $scope.headerTableUsers = [{"key": "username", "value": "Nome Utente", "type": "text"},
            {"key": "name", "value": "Nome", "type": "text"},
            {"key": "surname", "value": "Cognome", "type": "text"},
            {"key": "email", "value": "Email", "type": "text"},
            {"key": "active", "value": "Attivo", "type": "valid"},
            {"key": "detail", "value": "Modifica", "type": "edit", "title": "Modifica Utente"}
        ];
        $scope.modalFormUser = [{"label":"Nome Utente", "model":"username", "type":"text", "required":true, "disabledMod": true},
            {"label":"Email", "model":"email", "type":"email", "required":true, "disabledMod": false},
            {"label":"Nome", "model":"name", "type":"text", "required":true, "disabledMod": false},
            {"label":"Cognome", "model":"surname", "type":"text", "required":true, "disabledMod": false},
            {"label":"Attivo", "model":"active", "type":"radiobutton2", "required":true, "disabledMod": false}
        ];
        $scope.headerTableApps = [{"key": "name", "value": "Nome", "type": "text"},
            {"key": "description", "value": "Descrizione", "type": "text"},
            {"key": "detail", "value": "Modifica", "type": "edit", "title": "Modifica Applicazione"},
            {"key": "edit", "value": "", "type": "detail", "title": "Aggiungi Utenti"}
            ];
        $scope.modalFormApp = [{"label":"Nome Applicazione", "model":"name", "type":"text", "required":true, "disabledMod": true, "maxlength" : '30'},
            {"label":"Descrizione", "model":"description", "type":"textarea",  "required":true, "disabledMod": false, "maxlength" : '255'}
        ];

        $scope.editApp = function( body){
            modalService.showModal({}, {
                headerText: "Modifica applicazione",
                contentType: "",
                bodyText: "",
                scope: $scope,
                type: "insert",
                input: $scope.modalFormApp,
                data: body,
                callbackFunction: 'editaApp'
            });
        };
        $scope.editaApp = function(item){
            // $log.info(item);
            $scope.loaderModal();
            RestService.updateapp(item)
                .then(function(response){
                    $scope.loaderModal(response.data.code, response.data.description);
                    $scope.allApp();
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.messageResponseController("KO", "Utente Non Modificato ");
                });
        };
        $scope.createApps = function(){

            modalService.showModal({}, {
                headerText: "Crea Applicazione",
                contentType: "",
                bodyText: "",
                scope: $scope,
                type: "insert",
                input: $scope.modalFormApp,
                callbackFunction: 'createApp'
            });
        };
        $scope.createApp = function(item){
            $scope.loaderModal();
            RestService.createapp(item)
                .then(function(response){
                    $scope.loaderModal(response.data.code, response.data.description);
                    $scope.allApp();
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.messageResponseController("KO", "Applicazione NON creata");
                });
        };
        $scope.allApp = function(){
            $scope.users = "";
            $scope.spinOn = true;
            RestService.allapps()
                .then(function(response){
                    $scope.applications = response.data.applicationData.applications;
                    $scope.spinOn = false;
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.spinOn = false;
                });

        };
        $scope.totalUsers = function(){
            $scope.users = "";
            $scope.spinOn = true;
            RestService.totalusers()
                .then(function(response){
                    $scope.users= response.data.userData.usersTotal;
                    $scope.spinOn = false;
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.spinOn = false;
                });

        };
        $scope.allApp();
        $scope.totalUsers();

        $scope.detailApp = function(app){
            $state.go('root.application.detailapp', {name: app.name});
        };
        $scope.changeTabAdm = function(tab){
            $scope.tabActiveAdm = tab;
            $state.params.tab = tab;
            $state.go('root.application', {tab: tab});
        };
        if($state.params.tab){
            $scope.changeTabAdm($state.params.tab);
        } else {
            $state.params.tab = 'application';
            $scope.changeTabAdm('application');
        }

        /**
         * Modale Creazione USER
         */
        $scope.createUserModal = function() {
            modalService.showModal({}, {
                headerText: "Creazione Utente",
                contentType: "",
                bodyText: "",
                scope: $scope,
                type: "insert",
                input: $scope.modalFormUser,
                callbackFunction: 'registraUser'
            });
        };
        $scope.registraUser = function(item){
            $scope.loaderModal();
            RestService.createuser(item)
                .then(function(response){
                    $scope.loaderModal(response.data.code, response.data.description);
                    $scope.totalUsers();
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.messageResponseController("KO", "Utente Non Aggiunto ");
                });
        };
        /**
         * Modale modifica USER
         * @param body
         */
        $scope.editUser = function( body){
            modalService.showModal({}, {
                headerText: "Modifica",
                contentType: "",
                bodyText: "",
                scope: $scope,
                type: "insert",
                input: $scope.modalFormUser,
                data: body,
                callbackFunction: 'editaUser'
            });
        };
        $scope.editaUser = function(item){
            // $log.info(item);
            $scope.loaderModal();
            RestService.updateuser(item)
                .then(function(response){
                    $scope.loaderModal(response.data.code, response.data.description);
                    $scope.totalUsers();
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.messageResponseController("KO", "Utente Non Modificato ");
                });
        };
    }]);