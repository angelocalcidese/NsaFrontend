nsaApp.controller('login', ['$scope', '$log', 'modalService', 'RestService', '$state', '$rootScope',
    function ($scope, $log, modalService, RestService, $state, $rootScope) {
    $scope.tipologia= "tabellaclassica";
    $scope.tabActive= "users";
        /**
         * Mapping Modali
         * @type {[null,null,null,null,null,null,null,null]}
         */
    $scope.headerTableUsers = [{"key": "id", "value": "Tipo", "type": "id"},
                            {"key": "username", "value": "Nome Utente", "type": "text"},
                            {"key": "edit", "value": "", "type": "detail", "title": "Modifica Utente"}
                            ];


        $scope.utSel ="";
        $log.info("pagina Login");
        $scope.userLogin = function(){
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
        if(sessionStorage.user){
            $scope.sendToHomepageUser();
        } else {
            $scope.userLogin();
        }
        $scope.chooseApp = function(opt){

                // $scope.utente = opt.name;
                $scope.spinOn = true;
                RestService.allapps()
                    .then(function(response){
                       var applications = response.data.applicationData.applications;
                        $scope.spinOn = false;

                        $scope.appsList = [];
                        angular.forEach(applications, function(value) {
                            value.username = opt.username;
                            var role = {'name' : value.name, 'voice': value};
                            $scope.appsList.push(role);
                        });

                        modalService.showModal({}, {
                            headerText: "Seleziona un Applicazione",
                            contentType: "seleziona un applicazione ",
                            bodyText: "",
                            scope: $scope,
                            type: "addTableItem",
                            data: $scope.appsList,
                            callbackFunction: 'loggaUtente'
                        });
                    })
                    .catch(function(error){
                        $log.info(error);
                        $scope.spinOn = false;
                    });

            };

    }]);