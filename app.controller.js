/*-----------------------------------
| Manager Controller
------------------------------------*/
nsaApp.controller('nsaController',
    ['$scope',
        '$rootScope',
        '$location',
        '$document',
        '$anchorScroll',
        '$transitions',
        '$timeout',
        '$state',
        '$stateParams',
        '$log',
        'RestService',
        '$filter',
        'modalService',
    function ($scope,
              $rootScope,
              $location,
              $document,
              $anchorScroll,
              $transitions,
              $timeout,
              $state,
              $stateParams,
              $log,
              RestService,
              $filter,
              modalService
              ) {

        /**
         * Mock Pacchi
         * @type {string}
         */
        $scope.dataStep = {'step': [
            {'nome': 'creazione_distinta', 'title':'Creazione distinta', 'model': 'distinta', 'description': '', 'data': {"primocodice":"OGG12345678012345678"}, 'utente': '', 'step': []},
            {'nome': 'dettaglio_ordine', 'title':'Dettaglio Ordine', 'model': 'dettaglio', 'description': '', 'data': {"pesatura":"1"}, 'utente': '', 'step': [
                {'nome': 'dettaglio_ordine_uno', 'title':'Dettagli Ordine Figlio', 'model': 'dettaglio', 'description': '', 'data': {"pesatura":"1"}, 'utente': '', 'step': []},
                {'nome': 'dettaglio_ordine_uno', 'title':'Dettagli Ordine Figlio', 'model': 'dettaglio', 'description': '', 'data': {"pesatura":"1"}, 'utente': '', 'step': []},
                {'nome': 'dettaglio_ordine_uno', 'title':'Dettagli Ordine Figlio', 'model': 'dettaglio', 'description': '', 'data': {"pesatura":"1"}, 'utente': '', 'step': []},
                {'nome': 'dettaglio_ordine_uno', 'title':'Dettagli Ordine Figlio', 'model': 'dettaglio', 'description': '', 'data': {"pesatura":"1"}, 'utente': '', 'step': []},
                {'nome': 'servizi_aggiuntivi','title':'Servizi Aggiuntivi', 'model': 'aggiuntivi', 'description': '', 'data': {"pesatura":"1"}, 'utente': '', 'step': []}
            ]},
            {'nome': 'verifica_omologazione','title':'Verifica Omologazione', 'model': 'verifica','description': '', 'data': {"pesatura":"1"}, 'utente': '', 'step': []},
            {'nome': 'allestimento_fornitura','title':'Allestimento e Fornitura', 'model': 'allestimento', 'description': '', 'data': {"pesatura":"1"}, 'utente': '', 'step': []},
            {'nome': 'finalizzazione','title':'Finalizzazione', 'model': 'finalizza', 'description': '', 'data': {}, 'utente': '', 'step': []}
        ]};

        $scope.application = "NSA";
        $scope.sender ="";
        $scope.stepperView = false;
        // $scope.utente = "";
        var permessiPage =[{'dad': 'PROFILE', 'pageName' :'elencouser', 'homepage': true},
                           {'dad': 'PROFILE', 'pageName' :'detailuser'},
                           {'dad': 'PROFILE', 'pageName' :'detailgroup'},
                           {'dad': 'PROFILE','pageName' :'detailrole'},
                           {'dad': 'PROFILE','pageName' :'detailunit'},
                           {'dad': 'APPLICATION','pageName' :'application', 'homepage': true},
                           {'dad': 'APPLICATION','pageName' :'detailapp'},
                           {'dad': 'ACCEPTANCE', 'pageName' :'workingprogres', 'homepage': true},
                           {'dad': 'ACCEPTANCE', 'pageName' :'workingprogres'},
                           {'dad': 'ACCEPTANCE', 'pageName' :'ordersandreservations'}];

        $scope.controlloClick = function(event){
            // controllo menu sidebar
            var sidebar = document.querySelector('#js-nsa-sidebar');
            var isClickInside = sidebar.contains(event.target);
            // event.preventDefault();
            if (!isClickInside) {
                $scope.closeMenu();
            }

            // controllo chiusura modale
            // var modal = document.querySelector('.modal-content');
            // var button = event.toElement;
            // var btn = document.querySelector('.btn');
            // var noBtn = btn.contains(event.target);
            // if(modal && (modal.innerText !== 'Attendere ...') && (!noBtn)) {
            //     var isClickInsideModal = modal.contains(event.target);
            //     if (!isClickInsideModal) {
            //         $rootScope.externalCloseModal();
            //     }
            // }
        };
        /**
         * Definizione Ruoli Utente
         * @type {Array}
         */
        var chooseRole = function(roles, app){
            $scope.rolesList = [];
            // $scope.ruoli = [];
            angular.forEach(roles.roles, function(value) {
                value.app = app;
                var role = "";
                if(roles.userDefaultData.role && (roles.userDefaultData.role.id === value.id)) {
                    role = {'name' : value.shortDescription, 'default': true, 'voice': value};
                } else {
                    role = {'name' : value.shortDescription, 'voice': value};
                }

                $scope.rolesList.push(role);
            });

            modalService.showModal({}, {
                headerText: "Seleziona un Ruolo",
                contentType: "seleziona un ruolo ",
                bodyText: "",
                scope: $scope,
                type: "addTableItem",
                data: $scope.rolesList,
                default: true,
                callbackFunction: 'choosedRole'
            });

        };
        $scope.setDefault = function(app, type, element, username, code){
            //Valori Ammessi CODE
            //RS = Role Set - RU = Role Unset
            //US = Organizational Unit Set - UU = Organizational Unit Unset
            //BS = Both Set - BU = Both Unset

            RestService.setdefault(app, type, element, username, code)
                .then(function(response){
                $log.info('Default: ' + response.description);
                })
                .catch(function(error){
                    $log.info('Default: ' + error.description);
                });
        };

        $scope.choosedRole = function(role){
            // $log.info(role);

            $scope.loaderModal();
             // var choosed = $filter('filter')($scope.rolesList, {'name':role.name});
            if(role.default){
                $scope.setDefault($scope.application, 'role', role.default.voice.name, $scope.auth.user.username, 'RS');
            }

            if(role.value.voice){
                $scope.auth.roles = [role.value.voice];
                sessionStorage.user = JSON.stringify($scope.auth);
                sessionStorage.app = $scope.nomeApp;
                if($scope.auth.roles[0].permission && $scope.auth.roles[0].permission.grantedFunctionality){
                    $scope.controlloUnit($scope.auth, $scope.sender);
                    $scope.sendToHomepageUser($scope.auth.roles[0].permission.grantedFunctionality);
                } else {
                    $log.info('Ruolo senza permessi');
                    $scope.loaderModal('KO', 'Ruolo Senza permessi');
                    $scope.sender = "";
                    $scope.logOut();
                }

            }
        };
        $scope.sendToHomepageUser = function(profile_ext){
            var profile = '';
            var searchHome = '';
            var destination = '';
            if(profile_ext && profile_ext.length){
                 profile = profile_ext[0].split('_')[0];
                 searchHome = $filter('filter')(permessiPage, {'dad': profile, 'homepage': true});
                 destination = 'root.' + searchHome[0].pageName;
                // definisciRuoli(profile_ext, searchHome[0].pageName);
                 $state.go(destination);
                 $scope.loaderModal('OK', 'Utente Loggato');
            } else if($scope.operatore && $scope.operatore.roles[0].permission.grantedFunctionality){
                // $log.info($scope.operatore.permission.grantedFunctionality);
                profile = $scope.operatore.roles[0].permission.grantedFunctionality[0].split('_')[0];
                searchHome = $filter('filter')(permessiPage, {'dad': profile, 'homepage': true});
                destination = 'root.' + searchHome[0].pageName;
                // $scope.loaderModal('OK', 'Nuovo ruolo assegnato');
                $state.go(destination);
            } else {
                $log.info('nessun profilo trovato');
                $scope.loaderModal('KO', 'Errore: Utente NON Loggato');
                $scope.logOut();
            }

        };
        var chooseUnit = function(unit){
            $scope.unitsList = [];
            // $scope.ruoli = [];
            angular.forEach(unit.organizationUnits, function(value) {
                // value.app = app;
                var unitElement = "";
                if(unit.userDefaultData.organizationalUnit && (unit.userDefaultData.organizationalUnit.id === value.id)) {
                    unitElement = {'name' : value.name, 'default': true, 'voice': value};
                } else {
                    unitElement = {'name' : value.name, 'voice': value};
                }

                $scope.unitsList.push(unitElement);
            });

            modalService.showModal({}, {
                headerText: "Seleziona l'Unità Organizzativa",
                contentType: "",
                bodyText: "",
                scope: $scope,
                type: "addTableItem",
                data: $scope.unitsList,
                default: true,
                callbackFunction: 'choosedUnits'
            });

            $scope.choosedUnits = function(element){
                $scope.loaderModal();
                $scope.operatore.user.zona =  $scope.auth.user.zona = element.value.voice.name;
                sessionStorage.user = JSON.stringify($scope.auth);
                $scope.sender = "";
                $scope.loaderModal('OK', 'Unità organizzativa modificata');
                if(element.default){
                    $scope.setDefault($scope.application, 'organizationalUnit', element.default.voice.name, $scope.auth.user.username, 'US');
                }
            };
        };

        $scope.controlloUnit = function(user, sender){
        var searchUnit = "";
        var senderVoice = sender || $scope.sender;
        // SE C'è IL DEFAULT SETTO L'UNITà ORGANIZZATIVA COME L'UNICA ESISTENTE
            if(!senderVoice && user.userDefaultData.organizationalUnit){
                searchUnit = $filter('filter')(user.organizationUnits, {'name':$scope.auth.userDefaultData.organizationalUnit.name});
                user.organizationUnits = [];
                user.organizationUnits.push(searchUnit[0]);
            }
            //SE VIENE CHIAMATA DAL SIDEBAR PER IL RUOLO NON VIENE CONTROLLATA
            if(senderVoice === 'role' && $scope.operatore){
                searchUnit = $filter('filter')(user.organizationUnits, {'name':$scope.operatore.user.zona});
                user.organizationUnits = searchUnit;
                $scope.sender = "";
            }
            // SE SONO PIù UNITAà ORGANIZZATIVE MANDO AL SERVIZIO CON LA MODALE
            if(user.organizationUnits.length === 1){
                $scope.auth.user.zona = user.organizationUnits[0].name;
                sessionStorage.user = JSON.stringify($scope.auth);
                $scope.sender = "";
            } else if(user.organizationUnits.length > 1){
                chooseUnit(user);
            }else {
                $log.info('Nessuna Unità Organizzativa Presente');
            }
            // $log.info(user);
        };
        $scope.loggaUtente = function(app, nomeapp, sender){
            $scope.loaderModal();
            $scope.spinOn = true;
            // var username = utente.username || utente;
            var nameApp = nomeapp || app.value.name;
            var username = "";
            if(nomeapp){
                 username = app;
            } else {
                 username = app.value.voice.username;
            }

            RestService.userprofile(username, nameApp)
                .then(function(response){
                    $scope.auth = response.data.userData;
                    if($scope.auth && $scope.auth.user.active){

                        if(sender === 'cmp' && $scope.auth.organizationUnits.length > 1){
                            $scope.auth.roles = $scope.operatore.roles;
                            $scope.controlloUnit($scope.auth, sender);
                            $scope.loaderModal('OK', 'CMP trovata', 1);
                        } else if(sender !== 'cmp'){
                            var search = "";
                            if($scope.auth.userDefaultData.role && !sender){
                                search = $filter('filter')($scope.auth.roles, {'id':$scope.auth.userDefaultData.role.id});
                                var roleDiscarded = $scope.auth.roles;
                                $scope.auth.roles = search;
                            }

                            if($scope.auth.roles.length > 1 && $scope.auth.user.applicationActive){
                                $scope.loaderModal('OK', 'più ruoli trovati', 1);
                                $scope.sender = sender;
                                chooseRole($scope.auth, nameApp);
                                $scope.nomeApp = nameApp;
                            } else if($scope.auth.roles.length === 1 && $scope.auth.user.applicationActive){
                                sessionStorage.user = JSON.stringify($scope.auth);
                                sessionStorage.app = nameApp;
                                $scope.nomeApp = nameApp;
                                if($scope.auth.roles[0].permission && $scope.auth.roles[0].permission.grantedFunctionality){
                                    $scope.controlloUnit($scope.auth, sender);
                                    if(!sender) {
                                        $scope.sendToHomepageUser($scope.auth.roles[0].permission.grantedFunctionality);
                                    } else {
                                        $scope.loaderModal('OK', 'Hai un solo ruolo associato');
                                    }
                                } else if(!$scope.auth.roles[0].permission && (roleDiscarded.length > 1)) {
                                    $scope.auth.roles = roleDiscarded;
                                    $scope.loaderModal('OK', 'Hai più ruoli trovati', 1);
                                    $scope.sender = sender;
                                    chooseRole($scope.auth, nameApp);
                                    $scope.nomeApp = nameApp;
                                } else {
                                    $log.info("utente senza permessi!");
                                    $scope.loaderModal('KO', 'Utente senza permessi');
                                }

                            } else {
                                $scope.loaderModal();
                                $state.go('root.login');
                                $scope.loaderModal('KO', 'Utente senza ruoli o NON attivo per questa applicazione');
                            }
                        } else {
                            $scope.loaderModal('OK', 'Hai UNA sola o NESSUNA unità organizzativa assegnata');
                        }
                    } else {
                        $scope.loaderModal('KO', 'Utente NON Attivo');
                        $state.go('root.login');
                    }

                    // $log.info(response);
                    $scope.spinOn = false;
                })
                .catch(function(error){
                    $log.info(error);
                    $scope.spinOn = false;
                });
        };
        $rootScope.closeLoader = {};
        var definisciRuoli = function(ruoli, page){
            angular.forEach(ruoli, function(value) {
                var splitroles = value.split('_')[1];
                $scope.ruoli[value.split('_')[0]] = splitroles.split('');
            });
            // $log.info($scope.ruoli);
            serchPermission(page);
            };

        var serchPermission = function(page){
            var search = $filter('filter')(permessiPage, {'pageName':page});
            // $log.info(search);
            // var okView = false;
            if(search.length){
                angular.forEach(search, function(value, key) {
                    // $log.info($scope.ruoli[value.dad]);
                    if($scope.ruoli[value.dad]){
                        $log.info("OK : puoi accedere a questa pagina: " + value.pageName);
                    } else {
                        $log.info("KO : NON puoi accedere a questa pagina" + value.pageName);
                        $scope.sendToHomepageUser();
                    }
                });
            } else {
                $log.info("Errore permission");
                $scope.sendToHomepageUser();
            }

        };
    $scope.controlloUtente = function(page) {
        if(!sessionStorage.user || sessionStorage.user === 'undefined'){
            $scope.logOut();
         } else {
            $scope.operatore = JSON.parse(sessionStorage.user);
            $scope.nomeApp = sessionStorage.app;

            if($scope.operatore.roles.length && $scope.operatore.roles[0].permission.grantedFunctionality){
                // $log.info($scope.operatore.roles[0].permission.grantedFunctionality);
                var ruoloSessione = $scope.operatore.roles[0].permission.grantedFunctionality;
                if($scope.ruoli && $scope.ruoli[ruoloSessione[0].split('_')[0]]){
                    $log.info("ruoli definiti");
                     serchPermission(page);
                } else {
                    $scope.ruoli = [];
                    definisciRuoli($scope.operatore.roles[0].permission.grantedFunctionality, page);
                }

            } else {
                //$scope.logOut();
            }
        }
    };
    $scope.logOut = function(){
        delete sessionStorage.user;
        delete sessionStorage.app;
        $scope.operatore = "";
        $scope.ruoli = "";
        $scope.sender = "";
         $scope.rolesList = "";
        $scope.stepperView = false;
        //da eliminare
        $state.go('root.login');
           };
    $scope.title="";
    $scope.apriMenu = false;
    $scope.typeMenu = "";
    $scope.today = new Date();
    $scope.spinOn = "";
        /**
         * Map data
         * @type {{1: string, 2: string, 3: string, 4: string, 5: string, 6: string, 7: string, 8: string, 9: string, 10: string, 11: string, 12: string}}
         */
    var mese = {'1':'Gennaio', '2':'Febbraio', '3':'Marzo', '4':'Aprile', '5':'Maggio', '6':'Giugno', '7':'Luglio', '8':'Agosto', '9':'Settembre', '10':'Ottobre', '11':'Novembre', '12':'Dicembre'};
    var giorni = {'Monday':'Lunedì', 'Tuesday':'Martedì', 'Wednesday':'Mercoledì', 'Thursday':'Giovedì', 'Friday':'Venerdì', 'Saturday ':'Sabato', 'Sunday':'Domenica'};
    $scope.esponiData = giorni[$filter('date')($scope.today, "EEEE")] + ' ' + $filter('date')($scope.today, "d") + ' ' + mese[$filter('date')($scope.today, "M")] + ' ' + $filter('date')($scope.today, "yyyy");
        /**
         * Logica Sidebar
         * @param type
         */
        $scope.typeMenu ="";

        $scope.controlloMenu = function(type){
        if(type && (type !== $scope.typeMenu)) {
            $scope.apriMenu = true;
            $scope.typeMenu = type;
        } else {
            $scope.apriMenu = false;
            $scope.typeMenu = "";
        }

    };

    $scope.messageResponseController = function(code, message){
        $scope.viewMessage = code;
        $scope.messageResponse = message;
        if(code && message){
            $timeout($scope.messageResponseController, 10000);
        }
    };
    $scope.closeMenu = function(){
        $scope.apriMenu = false;
        $scope.typeMenu = "";
    };
    $scope.goTo = function(destination){
        $scope.stepperView = false;
        $scope.azzeraSearch();
        $state.go(destination);
        $scope.closeMenu();
    };
    $scope.loaderModal = function(code, message, temp){
        if(temp){
            $rootScope.closeLoader = {'message': message, 'code': code, 'time': temp}
        } else if(code && message) {
            $rootScope.closeLoader = {'message': message, 'code': code};
        } else {
            $rootScope.closeLoader = {};
            modalService.showModal({}, {
                headerText: "",
                contentType: "",
                bodyText: "Attendere ...",
                scope: $scope,
                closeLoader: $rootScope.closeLoader,
                type: 'loader'
            });
        }
    };
        $scope.cleanList = function(listnew, listaout){
            var list = [];
            angular.forEach(listnew, function(value1) {
                var ins = true;
                angular.forEach(listaout, function(value2) {
                    if(value1.name === value2.name){
                        ins = false;
                    }
                });
                if(ins) {
                    list.push(value1);
                }

            });
            // $log.info(list);
            return list;
        };

        // $scope.loaderModal();
         $scope.controlProfile= function(profilo, grant){
            //$log.info($scope.ruoli[profilo]);
            var auth = false;
            if($scope.ruoli && $scope.ruoli[profilo] && $scope.ruoli[profilo].length){
                angular.forEach($scope.ruoli[profilo], function(value) {
                    if(value === grant){
                        auth = true;
                    }
                });
            }
            return auth;
        };
       var UnitsDropDownSearch = function(){
            var cerca = "";
            var title = "Cerca Unità territoriale";
            RestService.dropdownunits()
                .then(function(response){
                     var unitsDropdown= response.data.dropdownData.dropDownData;

                        cerca = [{"label":"Nome Unità", "model":"name", "type":"text", "required":false, "disabledMod": true},
                            {"label":"Unità Padre", "model":"parentId", "type":"option", "option": unitsDropdown, "required":false, "disabledMod": false, "open": false},
                            {"label":"Tipo", "model":"type", "type":"text", "required":false, "disabledMod": false, "maxlength" : '30'}
                        ];
                    filterCard(cerca, title);

                })
                .catch(function(error){
                    $log.info(error);
                });

        };
        var GroupsDropDown = function(){
            var cerca = "";
            var title = "Cerca Gruppo";
            RestService.dropdowngroups()
                .then(function(response){
                     var groupsDropdown= response.data.dropdownData.dropDownData;

                        cerca = [{"label":"Nome Gruppo", "model":"name", "type":"text", "required":false, "disabledMod": true},
                            {"label":"Gruppo Padre", "model":"parentId", "type":"option", "option": groupsDropdown, "required":false, "disabledMod": false, "open": false},
                            {"label":"Tipo", "model":"type", "type":"text", "required":false, "disabledMod": false, "maxlength" : '30'}
                        ];
                    filterCard(cerca, title);
                })
                .catch(function(error){
                    $log.info(error);
                });

        };
        /*
        Funzione per i filtri
         */
         var filterCard = function(campimodale, intestamodale){

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
        $scope.azzeraSearch = function(){
            $scope.searchActive = false;
            delete $scope.searchElement ;
        };
        $scope.filtroDetail = function(tab){
            var cerca = "";
            var title = "";
            if(tab === 'users'){
                cerca = [{"label":"Nome Utente", "model":"username", "type":"text", "required":false, "disabledMod": false},
                    {"label":"Email", "model":"email", "type":"text", "required":false, "disabledMod": false},
                    {"label":"Nome", "model":"name", "type":"text", "required":false, "disabledMod": false},
                    {"label":"Cognome", "model":"surname", "type":"text", "required":false, "disabledMod": false},
                    {"label":"Attivo", "model":"applicationActive", "type":"radiobutton2", "required":false, "disabledMod": false}
                ];
                title = "Cerca Utenti";
                filterCard(cerca, title);
            } else if(tab === 'groups'){
                GroupsDropDown();
            } else if(tab === 'units'){
                UnitsDropDownSearch();
            } else if(tab === 'roles'){
                cerca = [{"label":"Nome Ruolo", "model":"shortDescription", "type":"text", "required":false, "disabledMod": false, "maxlength" : '30'}
                ];
                title = "Cerca Ruoli";
                filterCard(cerca, title);
            }

        };
        /**
         * Navigazione Stepper Sidebar
         * @param step
         */
        $scope.stepCircle = [];
        $scope.resetBall = function(step, substep, init){
            if(!init){
                $scope.apriMenu = true;
                $scope.typeMenu = 'orders';
            }
            if(!angular.equals({},$scope.dataStep.step[step].data) || init){
                for(var a=0; a < $scope.dataStep.step.length; a++){
                    if((a === step) && substep === undefined){
                        $scope.stepCircle[a] = true;
                    } else if((a === step) && (substep !== '') && (substep >= 0)){
                                if(!$scope.stepCircle[a].length){
                                    $scope.stepCircle[a] = [];
                                }
                        var count = $scope.dataStep.step[a].step.length;
                        for(var b=0; b < count; b++) {
                            if((b === substep) && !angular.equals({},$scope.dataStep.step[a].step[b].data)){
                                $scope.stepCircle[a][b] = true;
                            } else if(!angular.equals({},$scope.dataStep.step[step].step[substep].data)&& (b > substep || b < substep)){
                                $scope.stepCircle[a][b] = false;
                            }
                        }
                    } else $scope.stepCircle[a] = !!((a === step) && init);
                }
            }

        $log.info($scope.stepCircle);

        };
        $scope.stepperViewElement = function(){
            $scope.stepperView = true;
        };
}]);