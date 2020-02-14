nsaApp.controller('detailrole', ['$scope', '$log', '$state','RestService', 'modalService',
    function ($scope, $log, $state, RestService, modalService) {
        $scope.controlloUtente('detailrole');

        $log.info("Dettaglio Ruolo");
        $scope.spinnerCard = false;
        $scope.tab="users";
        $scope.azzeraSearch();

        $scope.detailsInit = function(){
            $scope.spinnerCard = true;
            RestService.roledetails($state.params.name)
                .then(function(response){
                    $log.info(response);
                    $scope.groupdetail = response.data.roleData.groups;
                    $scope.membersdetail = response.data.roleData.members;
                    $scope.rolesdetail = response.data.roleData.role;
                    $scope.spinnerCard = false;
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.messageResponseController("KO", "Errore");
                    $scope.spinnerCard = false;
                });
        };
        if($state.params && $state.params.name) {
            $scope.cardDetailVoice = [{'itemTitle': 'Ruolo', 'data': 'shortDescription'},
                {'itemTitle': 'Descrizione', 'data': 'description'}];
            $scope.cardVoiceMembers = {'bottomAction': 'Elimina Utente', 'deActive': true, 'titleCard1': 'username',
                                        'membership' :'Utenti associati', 'deleteEnable': $scope.controlProfile('PROFILE', 'D')};

            $scope.cardVoiceGroups = {'bottomAction': 'Revoca Gruppo', 'titleCard1': 'name', 'deActive': true,
                                        'membership' :'Gruppo di appartenenza', 'deleteEnable': $scope.controlProfile('PROFILE', 'D')};

            $scope.detailsInit();

        } else {
            $state.go('root.elencouser');
        }

        /**
         * Modale aggiungi user a gruppo
         */
        $scope.addUsersToRole = function (group){
            $scope.loaderModal();
            $log.info(group);
            var modalViewsConf = {'label_seleziona' : 'Utenti', 'search': 'Utente'};

            var headerModalTable = [{"key": "username", "value": "Nome Utente", "type": "checkbox"},
                {"key": "name", "value": "Nome Utente", "type": "text"},
                {"key": "surname", "value": "Cognome", "type": "text"}
            ];

            RestService.allusers()
                .then(function(response){
                    var listaddgroups = $scope.cleanList(response.data.userData.users, $scope.membersdetail);
                    //$log.info(response);
                    if(listaddgroups.length > 0) {
                        $scope.loaderModal('OK', 'OK', 1);
                        modalService.showModal({}, {
                            headerText: "Associa Utenti al ruolo",
                            contentType: "",
                            bodyText: "",
                            scope: $scope,
                            type: "addToTable",
                            elementAdd: listaddgroups,
                            elementAdded: '',
                            confElement: modalViewsConf,
                            headerTable: headerModalTable,
                            callbackFunction: 'reimpostaUserInGroup'
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
        $scope.reimpostaUserInGroup = function(list){
            $scope.loaderModal();
            var listIns = [];
            angular.forEach(list, function(value) {
                listIns.push(value.username);
            });
            // $log.info(listIns);
            RestService.setusersrole($scope.rolesdetail.name, listIns)
                .then(function(response){
                    $scope.loaderModal(response.data.code, response.data.description);
                    $scope.detailsInit();
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.messageResponseController("KO", "Ruolo Non Aggiunto");
                });
        };

        $scope.eliminaCardMembers = function(card){
            $scope.loaderModal();
            $scope.spinnerCard = true;
            var item =[card.username];

            $log.info(item);
            RestService.unsetusersrole($scope.rolesdetail.name, item)
                .then(function(response){
                    $scope.loaderModal(response.data.code, response.data.description);
                    $scope.detailsInit();
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.loaderModal("KO", "Card Non Eliminata");
                    $scope.spinnerCard = false;
                });
        };
        var addGroupsModal = function(body){
            modalService.showModal({}, {
                headerText: "Aggiungi Gruppo",
                contentType: "seleziona un gruppo ",
                bodyText: "",
                scope: $scope,
                type: "addTable",
                data: body,
                callbackFunction: 'addGroupToRole'
            });
        };
        $scope.addGroupsToRole = function(){
            $scope.loaderModal();
            $scope.spinnerCard = true;
            RestService.allgroups()
                .then(function(response){
                    var listaddgroups = $scope.cleanList(response.data.groupData.groups, $scope.groupdetail);
                    if(listaddgroups.length > 0) {
                        $scope.loaderModal('OK', 'OK', 1);
                        addGroupsModal(listaddgroups);
                    } else {
                        $scope.loaderModal("KO", "Non puoi aggiungere più Gruppi");
                    }
                    $scope.spinnerCard = false;
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.spinnerCard = false;
                });

        };

        $scope.addGroupToRole = function(item){
            $scope.loaderModal();
            $scope.spinnerCard = true;
            var role =[$scope.rolesdetail.name];

            $scope.spinnerCard = true;
            RestService.setrolegroup(item.name, role)
                .then(function(response){
                    $scope.loaderModal(response.data.code, response.data.description);
                    $scope.detailsInit();
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
            var item =[$scope.rolesdetail.name];

            $log.info(item);
            RestService.unsetrolegroup(card.name, item)
                .then(function(response){
                    $scope.loaderModal(response.data.code, response.data.description);
                    $scope.detailsInit();
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.loaderModal("KO", "Card Non Eliminata");
                    $scope.spinnerCard = false;
                });
        };
    }]);