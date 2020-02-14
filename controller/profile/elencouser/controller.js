nsaApp.controller('elencouser', ['$scope', '$rootScope', '$log', 'modalService', 'RestService', '$state', '$filter',
    function ($scope, $rootScope, $log, modalService, RestService, $state, $filter) {
    $scope.tabSelected = $state.params.tab;

        /**
         * controllo Utente deve essere centralizzato
         */
    $scope.controlloUtente('elencouser');

    $scope.tipologia= "tabellaclassica";
    $scope.tabActive= "users";
        /**
         * Mapping Modali
         * @type {[null,null,null,null,null,null,null,null]}
         */
    $scope.headerTableUsers = [{"key": "username", "value": "Nome Utente", "type": "text"},
                            {"key": "name", "value": "Nome", "type": "text"},
                            {"key": "surname", "value": "Cognome", "type": "text"},
                            {"key": "email", "value": "Email", "type": "text"},
                            {"key": "applicationActive", "value": "Attivo", "type": "valid"}];


    $scope.headerTableGroups = [];
    $scope.headerTableRoles = [{"key": "shortDescription", "value": "Nome Ruolo", "type": "text"},
                               {"key": "description", "value": "Descrizione", "type": "text"}
                            ];

    $scope.modalFormUser = [{"label":"Nome Utente", "model":"username", "type":"text", "required":true, "disabledMod": true},
                        {"label":"Email", "model":"email", "type":"email", "required":true, "disabledMod": false},
                        {"label":"Nome", "model":"name", "type":"text", "required":true, "disabledMod": false},
                        {"label":"Cognome", "model":"surname", "type":"text", "required":true, "disabledMod": false},
                        {"label":"Attivo", "model":"applicationActive", "type":"radiobutton2", "required":true, "disabledMod": false}
                        ];
    $scope.modalFormUserSearch = [{"label":"Nome Utente", "model":"username", "type":"text", "required":false, "disabledMod": false},
                        {"label":"Email", "model":"email", "type":"text", "required":false, "disabledMod": false},
                        {"label":"Nome", "model":"name", "type":"text", "required":false, "disabledMod": false},
                        {"label":"Cognome", "model":"surname", "type":"text", "required":false, "disabledMod": false},
                        {"label":"Attivo", "model":"applicationActive", "type":"radiobutton2", "required":false, "disabledMod": false}
                        ];
    $scope.modalFormGroup = [];
    $scope.modalFormRole = [{"label":"Nome Ruolo", "model":"shortDescription", "type":"text", "required":true, "disabledMod": false, "maxlength" : '30'},
                            {"label":"Descrizione", "model":"description", "type":"textarea",  "required":true, "disabledMod": false, "maxlength" : '255'}
                        ];
    $scope.modalFormRoleSearch = [{"label":"Nome Ruolo", "model":"shortDescription", "type":"text", "required":false, "disabledMod": false, "maxlength" : '30'}
                        ];


        if($scope.controlProfile('PROFILE', 'U')){
            $scope.headerTableUsers.push({"key": "detail", "value": "", "type": "edit", "title": "Modifica Utente"}
                );

            $scope.headerTableRoles.push({"key": "detail", "value": "", "type": "edit", "title": "Modifica Ruolo"});
        }
        if($scope.controlProfile('PROFILE', 'R')){
            $scope.headerTableUsers.push({"key": "edit", "value": "", "type": "detail", "title": "Dettaglio Utente"});
            $scope.headerTableRoles.push({"key": "edit", "value": "", "type": "detail", "title": "Dettaglio Ruolo"});
        }
        $log.info("pagina Lista USER");
        // $scope.title= "Homepage";


        /**
         * Modale modifica USER
         * @param body
         */
        $scope.editUser = function(body){
            $log.info($scope.operatore);
            if($scope.operatore && ($scope.operatore.user.username === body.username)){
                $scope.modalFormUser[4] = {"label":"Attivo", "model":"applicationActive", "type":"radiobutton2", "required":true, "disabledMod": true};
            }
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
            RestService.updateuserapp(item)
                .then(function(response){
                    $scope.loaderModal(response.data.code, response.data.description);
                    $scope.allUsers();
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.messageResponseController("KO", "Utente Non Modificato ");
                });
        };
        /**
         * Modifica Edita Gruppo
         * @param body
         */
        $scope.editGroup = function( body){
            modalService.showModal({}, {
                headerText: "Modifica Gruppo",
                contentType: "",
                bodyText: "",
                scope: $scope,
                type: "insert",
                input: $scope.modalFormGroup,
                data: body,
                callbackFunction: 'editaGroup'
            });
        };
        $scope.editaGroup = function(item){
            // $log.info(item);
            $scope.loaderModal();
            RestService.updategroup(item)
                .then(function(response){
                    $scope.loaderModal(response.data.code, response.data.description);

                    //$scope.messageResponseController(response.data.code, response.data.description);
                    $scope.allGroups();
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.messageResponseController("KO", "Gruppo Non Modificato ");
                });
        };
        /**
         * Modifica Edita Unità Organizzativa
         * @param body
         */
        $scope.editUnit = function( body){
            modalService.showModal({}, {
                headerText: "Modifica Unità Organizzativa",
                contentType: "",
                bodyText: "",
                scope: $scope,
                type: "insert",
                input: $scope.modalFormUnit,
                data: body,
                callbackFunction: 'editaUnit'
            });
        };
        $scope.editaUnit = function(item){
            // $log.info(item);
            $scope.loaderModal();
            RestService.updateunit(item)
                .then(function(response){
                    $scope.loaderModal(response.data.code, response.data.description);

                    //$scope.messageResponseController(response.data.code, response.data.description);
                    $scope.allUnits();
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.messageResponseController("KO", "Gruppo Non Modificato ");
                });
        };
        /**
         * Modifica Edita Ruolo
         * @param body
         */
        $scope.editRole = function(body){
            modalService.showModal({}, {
                headerText: "Modifica Ruolo",
                contentType: "",
                bodyText: "",
                scope: $scope,
                type: "insert",
                input: $scope.modalFormRole,
                data: body,
                callbackFunction: 'editaRole'
            });
        };
        $scope.editaRole = function(item){
            $scope.loaderModal();
            RestService.updaterole(item)
                .then(function(response){
                    $scope.loaderModal(response.data.code, response.data.description);
                    $scope.allRoles();
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.messageResponseController("KO", "Ruolo Non Modificato ");
                });
        };
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
            RestService.createuserapp(item)
                .then(function(response){
                    $scope.loaderModal(response.data.code, response.data.description);
                    $scope.allUsers();
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.messageResponseController("KO", "Utente Non Aggiunto ");
                });
        };
            /**
             * Modale creazione Gruppo
             */
            $scope.createGroupModal = function(){
                modalService.showModal({}, {
                    headerText: "Crea nuovo gruppo",
                    contentType: "",
                    bodyText: "",
                    scope: $scope,
                    type: "insert",
                    input: $scope.modalFormGroup,
                    callbackFunction: 'registraGroup'
                });
            };
            $scope.registraGroup = function(item){
                $scope.loaderModal();
                RestService.creategroup(item)
                    .then(function(response){
                        $scope.loaderModal(response.data.code, response.data.description);
                        $scope.allGroups();
                    })
                    .catch(function(error){
                        $log.info(error);
                        $scope.messageResponseController("KO", "Gruppo Non Aggiunto ");
                    });
            };
            /**
             * Modale creazione unità Organizzativa
             */
            $scope.createUnitModal = function(){
                modalService.showModal({}, {
                    headerText: "Crea Nuova Unità Organizzativa",
                    contentType: "",
                    bodyText: "",
                    scope: $scope,
                    type: "insert",
                    input: $scope.modalFormUnit,
                    callbackFunction: 'registraUnit'
                });
            };
            $scope.registraUnit = function(item){
                $scope.loaderModal();
                RestService.createunit(item)
                    .then(function(response){
                        $scope.loaderModal(response.data.code, response.data.description);
                        $scope.allUnits();
                    })
                    .catch(function(error){
                        $log.info(error);
                        $scope.messageResponseController("KO", "Unità Organizzativa NON creata ");
                    });
            };
            /**
             * Modale Creazione Ruolo
             */
            $scope.createRoleModal = function(){
                modalService.showModal({}, {
                    headerText: "Create Ruolo",
                    contentType: "",
                    bodyText: "",
                    scope: $scope,
                    type: "insert",
                    input: $scope.modalFormRole,
                    callbackFunction: 'registraRole'
                });
            };
            $scope.registraRole = function(item){
                $scope.loaderModal();
                RestService.createrole(item)
                    .then(function(response){
                        $scope.loaderModal(response.data.code, response.data.description);
                        $scope.allRoles();
                    })
                    .catch(function(error){
                        $log.info(error);
                        $scope.messageResponseController("KO", "Gruppo Non Aggiunto ");
                    });
            };
        $scope.allUsers = function(){
            $scope.users = "";
            $scope.spinOn = true;
            RestService.allusers()
                .then(function(response){
                    $scope.users= response.data.userData.users;
                    $scope.spinOn = false;
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.spinOn = false;
                });

        };

        $scope.GroupsDropDown = function(){
            $scope.groups = "";
            $scope.spinOn2 = true;
            RestService.dropdowngroups()
                .then(function(response){
                    $scope.groupsDropdown= response.data.dropdownData.dropDownData;
                    $scope.headerTableGroups = [{"key": "type", "value": "Tipo", "type": "text", "maxlength" : '30'},
                                                {"key": "name", "value": "Nome Gruppo", "type": "text", "maxlength" : '30'},
                                                {"key": "description", "value": "Descrizione", "type": "text", "maxlength" : '255'},
                                                {"key": "parentId", "value": "Gruppo Padre", "type": "paring", "paringValue": $scope.groupsDropdown}
                    ];
                    if($scope.controlProfile('PROFILE', 'U')){
                        $scope.headerTableGroups.push({"key": "detail", "value": "", "type": "edit", "title": "Modifica Gruppo"});
                        $scope.modalFormGroup = [{"label":"Nome Gruppo", "model":"name", "type":"text", "required":true, "disabledMod": true},
                            {"label":"Gruppo Padre", "model":"parentId", "type":"option", "option": $scope.groupsDropdown, "required":false, "disabledMod": false, "open": false},
                            {"label":"Tipo", "model":"type", "type":"text", "required":false, "disabledMod": false, "maxlength" : '30'},
                            {"label":"Descrizione", "model":"description", "type":"textarea", "required":true, "disabledMod": false}
                        ];
                        $scope.modalFormGroupSearch = [{"label":"Nome Gruppo", "model":"name", "type":"text", "required":false, "disabledMod": true},
                            {"label":"Gruppo Padre", "model":"parentId", "type":"option", "option": $scope.groupsDropdown, "required":false, "disabledMod": false, "open": false},
                            {"label":"Tipo", "model":"type", "type":"text", "required":false, "disabledMod": false, "maxlength" : '30'}
                        ];
                    }
                    if($scope.controlProfile('PROFILE', 'R')){
                        $scope.headerTableGroups.push({"key": "edit", "value": "", "type": "detail", "title": "Associa Gruppo a Utenti"});
                    }
                    $scope.allGroups();
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.spinOn2 = false;
                });

        };
        $scope.UnitsDropDown = function(){
            $scope.units = "";
            $scope.spinOn4 = true;
            RestService.dropdownunits()
                .then(function(response){
                    $scope.unitsDropdown= response.data.dropdownData.dropDownData;
                    $scope.headerTableUnits = [{"key": "type", "value": "Tipo", "type": "text", "maxlength" : '30'},
                        {"key": "name", "value": "Nome Unità ", "type": "text", "maxlength" : '30'},
                        {"key": "description", "value": "Descrizione", "type": "text", "maxlength" : '255'},
                        {"key": "parentId", "value": "Unità Padre", "type": "paring", "paringValue": $scope.unitsDropdown}
                    ];
                    if($scope.controlProfile('PROFILE', 'U')){
                        // $scope.headerTableUnits.push({"key": "detail", "value": "", "type": "edit", "title": "Modifica Unità Organizzativa"});
                    $scope.modalFormUnit = [{"label":"Nome Unità", "model":"name", "type":"text", "required":true, "disabledMod": true},
                        {"label":"Unità Padre", "model":"parentId", "type":"option", "option": $scope.unitsDropdown, "required":false, "disabledMod": false, "open": false},
                        {"label":"Tipo", "model":"type", "type":"text", "required":false, "disabledMod": false, "maxlength" : '30'},
                        {"label":"Descrizione", "model":"description", "type":"textarea", "required":true, "disabledMod": false}
                    ];
                    $scope.modalFormUnitSearch = [{"label":"Nome Unità", "model":"name", "type":"text", "required":false, "disabledMod": true},
                        {"label":"Unità Padre", "model":"parentId", "type":"option", "option": $scope.unitsDropdown, "required":false, "disabledMod": false, "open": false},
                        {"label":"Tipo", "model":"type", "type":"text", "required":false, "disabledMod": false, "maxlength" : '30'}
                    ];
                    }
                    if($scope.controlProfile('PROFILE', 'R')){
                        $scope.headerTableUnits.push({"key": "edit", "value": "", "type": "detail", "title": "Modifica Unità Territoriale"});
                    }
                    $scope.allUnits();
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.spinOn2 = false;
                });

        };
        $scope.allGroups = function(){

            RestService.allgroups()
                .then(function(response){
                    $scope.groups= response.data.groupData.groups;
                    $scope.spinOn2 = false;
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.spinOn2 = false;
                });

        };
        $scope.allRoles = function(){
            $scope.roles = "";
            $scope.spinOn3 = true;
            RestService.allroles()
                .then(function(response){
                    $scope.roles= response.data.roleData.roles;
                    $scope.spinOn3 = false;
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.spinOn3 = false;
                });

        };
        $scope.allUnits = function(){
            $scope.units = "";
            $scope.spinOn4 = true;
            RestService.allunits()
                .then(function(response){
                    $scope.units= response.data.organizationUnitData.organizationUnits;
                    $scope.spinOn4 = false;
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.spinOn4 = false;
                });

        };
        $scope.Init = function(){
            $scope.allUsers();
            $scope.GroupsDropDown();
            $scope.UnitsDropDown();
            $scope.allRoles();
            $scope.searchActive = false;
        };
        $scope.Init();

        $scope.changeTab = function(tab){
            $scope.tabActive = tab;
            $state.params.tab = tab;
            $state.go('root.elencouser', {tab: tab});
        };
        if($state.params.tab){
            $scope.changeTab($state.params.tab);
        } else {
            $state.params.tab = 'users';
            $scope.changeTab('users');
        }

        $scope.detailUser = function(user){
           $state.go('root.elencouser.detailuser', {username: user.username});
        };
        $scope.detailGroup = function(group){
           $state.go('root.elencouser.detailgroup', {name: group.name});
        };
        $scope.detailRole = function(role){
           $state.go('root.elencouser.detailrole', {name: role.name});
        };
        $scope.detailUnit = function(unit){
           $state.go('root.elencouser.detailunit', {id: unit.id});
        };

        /*
        Funzione per i filtri
         */
        $scope.filterTable = function(tab){
            var intestamodale = "";
            var campimodale = "";
            if(tab === 'users'){
                 intestamodale = "Cerca Utente";
                 campimodale = $scope.modalFormUserSearch;
            } else if(tab === 'groups'){
                 intestamodale = "Cerca Gruppo";
                 campimodale = $scope.modalFormGroupSearch;
            } else if(tab === 'units'){
                intestamodale = "Cerca Unità Territoriale";
                campimodale = $scope.modalFormUnitSearch;
            } else if(tab === 'roles'){
                intestamodale = "Cerca Utente";
                campimodale = $scope.modalFormRoleSearch;
            }
            modalService.showModal({}, {
                headerText: intestamodale,
                contentType: "",
                bodyText: "",
                scope: $scope,
                type: "insert",
                buttonOk: "Cerca",
                input: campimodale,
                callbackFunction: 'filterTableCallBack'
            });
        };
        $scope.filterTableCallBack = function(search){
            $scope.searchActive = true;
            $scope.searchElement = search;
        };
    }]);