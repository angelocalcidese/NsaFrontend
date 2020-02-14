nsaApp.controller('detailgroup', ['$scope', '$log', '$state','RestService', 'modalService',
    function ($scope, $log, $state, RestService, modalService) {
        $scope.controlloUtente('detailgroup');

        $log.info("Dettaglio Gruppo");
        $scope.spinnerCard = false;
        $scope.tab="users";
        $scope.azzeraSearch();

        $scope.groupDetailsInit = function(){
            $scope.spinnerCard = true;
            RestService.groupdetails($state.params.name)
                .then(function(response){
                    $log.info(response);
                    $scope.groupdetail = response.data.groupData.group;
                    $scope.membersdetail = response.data.groupData.members;
                    $scope.rolesdetail = response.data.groupData.roles;
                    $scope.spinnerCard = false;
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.messageResponseController("KO", "Errore");
                    $scope.spinnerCard = false;
                });
        };
        if($state.params && $state.params.name) {
            $scope.cardDetailVoice = [{'itemTitle': 'Nome Gruppo', 'data': 'name'},
                {'itemTitle': 'Descrizione', 'data': 'description'}];
            $scope.cardVoiceGroup = {'bottomAction': 'Elimina Utente', 'deActive': true, 'titleCard1': 'username',
                                     'membership' :'Utenti associati', 'deleteEnable': $scope.controlProfile('PROFILE', 'D')};

            $scope.cardVoiceRole = {'bottomAction': 'Revoca Ruolo', 'titleCard1': 'shortDescription', 'deActive': true,
                                    'membership' :'Ruoli associati', 'deleteEnable': $scope.controlProfile('PROFILE', 'D')};

            $scope.groupDetailsInit();

        } else {
            $state.go('root.elencouser');
        }

        /**
         * Modale aggiungi user a gruppo
         */
        $scope.addUserToGroup = function (group){
            $log.info(group);
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
                        headerText: "Associa Utenti al gruppo",
                        contentType: "",
                        bodyText: "",
                        scope: $scope,
                        type: "addToTable",
                        elementAdd: listaddgroups,
                        elementAdded: '' ,
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
            RestService.setgroupuser($scope.groupdetail.name, listIns)
                .then(function(response){
                    $scope.loaderModal(response.data.code, response.data.description);
                    $scope.groupDetailsInit();
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.messageResponseController("KO", "Gruppo Non Aggiunto");
                });
        };

        $scope.eliminaCardMembers = function(card){
            $scope.loaderModal();
            $scope.spinnerCard = true;
            var item = [card.username];

            $log.info(item);
            RestService.unsetgroupuser($scope.groupdetail.name, item)
                .then(function(response){
                    $scope.loaderModal(response.data.code, response.data.description);
                    $scope.groupDetailsInit();
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.loaderModal("KO", "Card Non Eliminata");
                    $scope.spinnerCard = false;
                });
        };

        $scope.viewsRolesGroup = function(){
            $scope.spinnerCard = true;
            $scope.loaderModal();
            RestService.allroles()
                .then(function(response){
                    var listaddroles = $scope.cleanList(response.data.roleData.roles, $scope.rolesdetail);
                    if(listaddroles.length > 0) {
                        $scope.loaderModal('OK', 'OK', 1);
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
        var addRolesModal = function(body){
            modalService.showModal({}, {
                headerText: "Aggiungi Ruolo",
                contentType: "seleziona un ruolo ",
                bodyText: "",
                scope: $scope,
                type: "addTable",
                data: body,
                voiceView: 'shortDescription',
                callbackFunction: 'addRoleToUser'
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
                    $scope.groupDetailsInit();
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
                    $scope.groupDetailsInit();
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.loaderModal("KO", "Card Non Eliminata");
                    $scope.spinnerCard = false;
                });
        };
    }]);