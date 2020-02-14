nsaApp.controller('detailuser', ['$scope', '$log', '$state','RestService', 'modalService', '$filter',
    function ($scope, $log, $state, RestService, modalService, $filter) {
        /**
         * controllo Utente deve essere centralizzato
         */
        $scope.controlloUtente('detailuser');

        $log.info("Dettaglio Utente");
        $scope.spinnerCard = false;
        $scope.tab="groups";
        $scope.azzeraSearch();
        $scope.viewsGroups = function(){
            $scope.spinnerCard = true;
            $scope.loaderModal();
            RestService.allgroups()
                .then(function(response){
                    // $scope.groups= response.data.groupData.groups;
                    var listaddgroups = $scope.cleanList(response.data.groupData.groups, $scope.groupsdetail);
                    if(listaddgroups.length > 0){
                        $scope.loaderModal('OK', 'ok ', 1);
                        addGroupsModal(listaddgroups);
                    } else {
                        $scope.loaderModal("KO", "Non hai Gruppi da aggiungere");
                    }
                    $scope.spinnerCard = false;
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.spinnerCard = false;
                });

        };
        $scope.viewsRoles = function(){
            $scope.spinnerCard = true;
            $scope.loaderModal();
            RestService.allroles()
                .then(function(response){
                    var listaddroles = $scope.cleanList(response.data.roleData.roles, $scope.rolesdetail);
                    if(listaddroles.length > 0) {
                        $scope.loaderModal('OK', 'ok ', 1);
                        addRolesModal(listaddroles);
                    } else {
                        $scope.loaderModal("KO", "Non puoi aggiungere più Ruoli");
                    }
                    $scope.spinnerCard = false;
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.spinnerCard = false;
                });

        };
        $scope.viewsUnits = function(){
            $scope.spinnerCard = true;
            $scope.loaderModal();
            RestService.allunits()
                .then(function(response){
                    $scope.allUnits = response.data.organizationUnitData.organizationUnits;
                    var listaddunits = $scope.cleanList($scope.allUnits, $scope.unitsdetail);
                    if(listaddunits.length > 0) {
                        $scope.loaderModal('OK', 'ok ', 1);
                        addUnitsModal(listaddunits);
                    } else {
                        $scope.loaderModal("KO", "Non puoi aggiungere più Unità Organizzative");
                    }
                    $scope.spinnerCard = false;
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.spinnerCard = false;
                });

        };
        $scope.userDetailsInit = function(){
            $scope.spinnerCard = true;
            RestService.userdetails($state.params.username)
                .then(function(response){
                    $scope.userdetail = response.data.userData.user;
                    $scope.groupsdetail = response.data.userData.groups;
                    $scope.rolesdetail = response.data.userData.roles;
                    $scope.unitsdetail = response.data.userData.organizationUnits;
                    $scope.spinnerCard = false;
                })
                .catch(function(error){
                    $log.info(error);
                     $scope.messageResponseController("KO", "Errore");
                    $scope.spinnerCard = false;
                });
        };

        if($state.params && $state.params.username) {
            $scope.cardDetailVoice = [{'itemTitle': 'Nome Utente', 'data': 'username'},
                                        {'itemTitle': 'Email', 'data': 'email'}];
            if($scope.operatore && ($scope.operatore.user.username === $state.params.username)) {
                $scope.cardVoiceGroup = {
                    'bottomAction': 'Elimina Gruppo','titleCard1': 'name',
                    'membership': 'Gruppi di appartenenza', 'deleteEnable': $scope.controlProfile('PROFILE', 'D')
                };

                $scope.cardVoiceRole = {
                    'bottomAction': 'Revoca Ruolo',
                    'titleCard1': 'shortDescription',
                    'membership': 'Ruoli associati',
                    'deleteEnable': $scope.controlProfile('PROFILE', 'D')
                };

                $scope.cardVoiceUnit = {
                    'bottomAction': 'Revoca Unità',
                    'titleCard1': 'name',
                    'membership': 'Unità Organizzative di appartenenza',
                    'deleteEnable': $scope.controlProfile('PROFILE', 'D')
                };
            } else {
                $scope.cardVoiceGroup = {
                    'bottomAction': 'Elimina Gruppo', 'rightTextActionActive': 'Utente Attivo',
                    'rightTextActionDisabled': 'Utente Disattivo', 'rightTextLinkActive': 'Disattiva',
                    'rightTextLinkDisabled': 'Attiva', 'titleCard1': 'name',
                    'membership': 'Gruppi di appartenenza', 'deleteEnable': $scope.controlProfile('PROFILE', 'D')
                };

                $scope.cardVoiceRole = {
                    'bottomAction': 'Revoca Ruolo', 'rightTextActionActive': 'Utente Attivo',
                    'rightTextActionDisabled': 'Utente Disattivo', 'rightTextLinkActive': 'Disattiva',
                    'rightTextLinkDisabled': 'Attiva', 'titleCard1': 'name',
                    'membership': 'Ruoli associati', 'deleteEnable': $scope.controlProfile('PROFILE', 'D')
                };

                $scope.cardVoiceUnit = {
                    'bottomAction': 'Revoca Unità',
                    'rightTextActionActive': 'Utente Attivo',
                    'rightTextActionDisabled': 'Utente Disattivo',
                    'rightTextLinkActive': 'Disattiva',
                    'rightTextLinkDisabled': 'Attiva',
                    'titleCard1': 'name',
                    'membership': 'Unità Organizzative di appartenenza',
                    'deleteEnable': $scope.controlProfile('PROFILE', 'D')
                };
            }
            $scope.userDetailsInit();

        } else {
            $state.go('root.elencouser');
        }



        $scope.eliminaCardGroup = function(card){
            $scope.loaderModal();
            $scope.spinnerCard = true;
            var item =[$scope.userdetail.username];

            $log.info(item);
            RestService.unsetgroupuser(card.name, item)
                .then(function(response){
                    $scope.loaderModal(response.data.code, response.data.description);
                    $scope.userDetailsInit();
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.loaderModal("KO", "Card Non Eliminata");
                    $scope.spinnerCard = false;
                });
        };
        $scope.eliminaCardRole = function(card){
            $scope.loaderModal();
            $scope.spinnerCard = true;
            var item =[card.name];

            $log.info(item);
            RestService.unsetroleuser($scope.userdetail.username, item)
                .then(function(response){
                    $scope.loaderModal(response.data.code, response.data.description);
                    $scope.userDetailsInit();
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.loaderModal("KO", "Card Non Eliminata");
                    $scope.spinnerCard = false;
                });
        };

        $scope.eliminaCardUnit = function(card){
            $scope.loaderModal();
            $scope.spinnerCard = true;

            var user =[$scope.userdetail.username];

            RestService.unsetunituser(card.name, user)
                .then(function(response){
                    $scope.loaderModal(response.data.code, response.data.description);
                    $scope.userDetailsInit();
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.loaderModal("KO", "Card Non Eliminata");
                    $scope.spinnerCard = false;
                });
        };

        $scope.editaUserCard = function(item){
            $scope.loaderModal();
            $scope.spinnerCard = true;
            $log.info(item);
            RestService.enableuser(item.username)
                .then(function(response){
                    $scope.loaderModal(response.data.code, response.data.description);
                    $scope.userDetailsInit();
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.loaderModal("KO", "Utente Non Modificato ");
                    $scope.spinnerCard = false;
                });
        };

        var addGroupsModal = function(body){
            modalService.showModal({}, {
                headerText: "Aggiungi gruppo",
                contentType: "seleziona un gruppo ",
                bodyText: "",
                scope: $scope,
                type: "addTable",
                data: body,
                callbackFunction: 'addGroupToUser'
            });
        };
        $scope.addGroupToUser = function(item){
            $scope.loaderModal();
            $scope.spinnerCard = true;
            var user = [$scope.userdetail.username];

            $log.info(item.name);
            $scope.spinnerCard = true;
            RestService.setgroupuser(item.name, user)
                .then(function(response){
                    $scope.loaderModal(response.data.code, response.data.description);
                    $scope.userDetailsInit();
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.spinnerCard = false;
                    $scope.loaderModal("KO", "Gruppo Non Aggiunto");
                });
        };
        var addRolesModal = function(body){
            modalService.showModal({}, {
                headerText: "Aggiungi Ruolo",
                contentType: "seleziona un ruolo ",
                bodyText: "",
                scope: $scope,
                type: "addTable",
                voiceView: 'shortDescription',
                data: body,
                callbackFunction: 'addRoleToUser'
            });
        };
        $scope.addRoleToUser = function(item){
            $scope.loaderModal();
            $scope.spinnerCard = true;
            var role =[item.name];

            $scope.spinnerCard = true;
            RestService.setroleuser($scope.userdetail.username, role)
                .then(function(response){
                    $scope.loaderModal(response.data.code, response.data.description);
                    $scope.userDetailsInit();
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.spinnerCard = false;
                    $scope.loaderModal("KO", "Ruolo Non Aggiunto");
                });
        };

        var addUnitsModal = function(body){
            modalService.showModal({}, {
                headerText: "Aggiungi Unità Organizzativa",
                contentType: "seleziona un unità organizzativa ",
                bodyText: "",
                scope: $scope,
                type: "addTable",
                data: body,
                callbackFunction: 'addUnitToUser'
            });
        };
        $scope.addUnitToUser = function(item){
            $scope.loaderModal();
            $scope.spinnerCard = true;
            var search = $filter('filter')($scope.allUnits, {'name':item.name});
            var user = [$scope.userdetail.username];

            $scope.spinnerCard = true;
            RestService.setunituser(search[0].name, user)
                .then(function(response){
                    $scope.loaderModal(response.data.code, response.data.description);
                    $scope.userDetailsInit();
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.spinnerCard = false;
                    $scope.loaderModal("KO", "Unità Organizzativa Non Aggiunta");
                });
        };

    }]);