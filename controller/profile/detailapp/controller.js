nsaApp.controller('detailapp', ['$scope', '$log', '$state','RestService', 'modalService',
    function ($scope, $log, $state, RestService, modalService) {
        $scope.controlloUtente('detailapp');
        $scope.tab = "utenti";

        $log.info("Dettaglio Applicazioni");
        $scope.spinnerCard = false;

        $scope.AppInit = function(){
            $scope.spinnerCard = true;
            RestService.appdetails($state.params.name)
                .then(function(response){
                    $log.info(response);
                    $scope.appdetails = response.data.applicationData.application;
                    $scope.membersdetail = response.data.applicationData.users;
                    $scope.spinnerCard = false;
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.messageResponseController("KO", "Errore");
                    $scope.spinnerCard = false;
                });
        };
        if($state.params && $state.params.name) {
            $scope.cardDetailVoice = [{'itemTitle': 'Nome Applicazione', 'data': 'name'},
                                        {'itemTitle': 'Descrizione', 'data': 'description'}];
            $scope.cardVoiceApp = {'bottomAction': 'Elimina Utente', 'deActive': true, 'titleCard1': 'username',
                                     'membership' :'Utenti associati', 'deleteEnable': true};

            $scope.AppInit();

        } else {
            $state.go('root.application');
        }

        /**
         * Modale aggiungi user a gruppo
         */
        $scope.addUserToApp = function (group){
            $log.info(group);
            $scope.loaderModal();
            var modalViewsConf = {'label_seleziona' : 'Utenti', 'search': 'Utente'};

            var headerModalTable = [{"key": "username", "value": "Nome Utente", "type": "checkbox"},
                {"key": "name", "value": "Nome Utente", "type": "text"},
                {"key": "surname", "value": "Cognome", "type": "text"}
            ];

            RestService.totalusers()
                .then(function(response){
                    var listaddgroups = $scope.cleanList(response.data.userData.usersTotal, $scope.membersdetail);
                    if(listaddgroups.length > 0) {
                        $scope.loaderModal('OK', 'OK', 1);
                        //$log.info(response);
                        modalService.showModal({}, {
                            headerText: "Associa Utenti all'applicazione",
                            contentType: "",
                            bodyText: "",
                            scope: $scope,
                            type: "addToTable",
                            elementAdd: listaddgroups,
                            elementAdded: '' ,
                            confElement: modalViewsConf,
                            headerTable: headerModalTable,
                            callbackFunction: 'reimpostaUserInApp'
                        });
                    } else {
                        $scope.loaderModal("KO", "Non puoi aggiungere altri utenti");
                    }

                })
                .catch(function(error){
                    $log.info(error);
                    $scope.spinOn = false;
                });



        };
        $scope.reimpostaUserInApp = function(list){
            $scope.loaderModal();
            // var listIns = {"users": []};
            var listIns = [];
            angular.forEach(list, function(value) {
                listIns.push(value.username);
            });
            // $log.info(listIns);
            RestService.setappuser($scope.appdetails.name, listIns)
                .then(function(response){
                    $scope.loaderModal(response.data.code, response.data.description);
                    $scope.AppInit();
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.messageResponseController("KO", "Utenti Non Aggiunti");
                });
        };

        $scope.eliminaCardMembers = function(card){
            $scope.loaderModal();
            $scope.spinnerCard = true;
            var item =[card.username];

            $log.info(item);
            RestService.unsetappuser($scope.appdetails.name, item)
                .then(function(response){
                    $scope.loaderModal(response.data.code, response.data.description);
                    $scope.AppInit();
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.loaderModal("KO", "Card Non Eliminata");
                    $scope.spinnerCard = false;
                });
        };
    }]);