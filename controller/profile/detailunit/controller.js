nsaApp.controller('detailunit', ['$scope', '$log', '$state','RestService', 'modalService',
    function ($scope, $log, $state, RestService, modalService) {
        $scope.controlloUtente('detailunit');

        $log.info("Dettaglio Unità Organizzative");
        $scope.spinnerCard = false;
        $scope.tab="users";
        $scope.azzeraSearch();

        $scope.unitDetailsInit = function(){
            $scope.spinnerCard = true;
            RestService.unitdetails($state.params.id)
                .then(function(response){
                    $log.info(response);
                    $scope.unitdetail = response.data.organizationUnitData.organizationUnit;
                    $scope.membersdetail = response.data.organizationUnitData.members;
                    $scope.spinnerCard = false;
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.messageResponseController("KO", "Errore");
                    $scope.spinnerCard = false;
                });
        };
        if($state.params && $state.params.id) {
            $scope.cardDetailVoice = [{'itemTitle': 'Nome Unità', 'data': 'name'},
                                        {'itemTitle': 'Descrizione', 'data': 'description'}];
            $scope.cardVoiceGroup = {'bottomAction': 'Elimina Utente', 'deActive': true, 'titleCard1': 'username',
                                     'membership' :'Utenti associati', 'deleteEnable': $scope.controlProfile('PROFILE', 'D')};

            $scope.unitDetailsInit();

        } else {
            $state.go('root.elencouser');
        }

        /**
         * Modale aggiungi user a gruppo
         */
        $scope.addUserToUnit = function (group){
            $log.info(group);
            $scope.loaderModal();
            var modalViewsConf = {'label_seleziona' : 'Utenti', 'search': 'Utente'};

            var headerModalTable = [{"key": "username", "value": "Nome Utente", "type": "checkbox"},
                {"key": "name", "value": "Nome Utente", "type": "text"},
                {"key": "surname", "value": "Cognome", "type": "text"}
            ];

            RestService.allusers()
                .then(function(response){
                    var listaddgroups = $scope.cleanList(response.data.userData.users, $scope.membersdetail);
                    if(listaddgroups.length > 0) {
                        $scope.loaderModal('OK', 'OK', 1);
                        //$log.info(response);
                        modalService.showModal({}, {
                            headerText: "Associa Utenti alla Unità organizzativa",
                            contentType: "",
                            bodyText: "",
                            scope: $scope,
                            type: "addToTable",
                            elementAdd: listaddgroups,
                            elementAdded: '' ,
                            confElement: modalViewsConf,
                            headerTable: headerModalTable,
                            callbackFunction: 'reimpostaUserInUnit'
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
        $scope.reimpostaUserInUnit = function(list){
            $scope.loaderModal();
            // var listIns = {"users": []};
            var listIns = [];
            angular.forEach(list, function(value) {
                listIns.push(value.username);
            });
            // $log.info(listIns);
            RestService.setunituser($scope.unitdetail.name, listIns)
                .then(function(response){
                    $scope.loaderModal(response.data.code, response.data.description);
                    $scope.unitDetailsInit();
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.messageResponseController("KO", "Gruppo Non Aggiunto");
                });
        };

        $scope.eliminaCardMembers = function(card){
            $scope.loaderModal();
            $scope.spinnerCard = true;
            var item =[card.username];

            $log.info(item);
            RestService.unsetunituser($scope.unitdetail.name, item)
                .then(function(response){
                    $scope.loaderModal(response.data.code, response.data.description);
                    $scope.unitDetailsInit();
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.loaderModal("KO", "Card Non Eliminata");
                    $scope.spinnerCard = false;
                });
        };


        $scope.addRoleToUser = function(item){
            $scope.loaderModal();
            $scope.spinnerCard = true;
            var role =[item.name];

            $scope.spinnerCard = true;
            RestService.setrolegroup($scope.groupdetail.name, role)
                .then(function(response){
                    $scope.loaderModal(response.data.code, response.data.description);
                    $scope.unitDetailsInit();
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.spinnerCard = false;
                    $scope.loaderModal("KO", "Gruppo Non Aggiunto");
                });
        };
        $scope.eliminaCardRoleGroup = function(card){
            $scope.loaderModal();
            $scope.spinnerCard = true;
            var item =[card.name];

            $log.info(item);
            RestService.unsetrolegroup($scope.groupdetail.name, item)
                .then(function(response){
                    $scope.loaderModal(response.data.code, response.data.description);
                    $scope.unitDetailsInit();
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.loaderModal("KO", "Card Non Eliminata");
                    $scope.spinnerCard = false;
                });
        };
    }]);