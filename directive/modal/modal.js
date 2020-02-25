nsaApp.service('modalService', ['$uibModal', '$state', function ($uibModal, $state) {
    'use strict';
    // contentType  table_ro table read only table_sb  table single binding
    var modalDefaults = {
        backdrop: true,
        keyboard: true,
        modalFade: false,
        templateUrl: 'views/directive/modal.html'
    };

    var modalOptions = {
        actionButtonText: 'OK',
        headerText: 'Conferma operazione',
        bodyText: 'Sei sicuro?'
    };

    this.showModal = function (customModalDefaults, customModalOptions) {
        if (!customModalDefaults) {
            customModalDefaults = {};
        }
        customModalDefaults.backdrop = 'static';
        return this.show(customModalDefaults, customModalOptions);
    };

    this.show = function (customModalDefaults, customModalOptions) {
        //Create temp objects to work with since we're in a singleton service
        var tempModalDefaults = {};
        var tempModalOptions = {};

        //Map angular-ui modal custom defaults to modal defaults defined in service
        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

        //Map modal.html $scope custom properties to defaults defined in service
        angular.extend(tempModalOptions, modalOptions, customModalOptions);

        if (!tempModalDefaults.controller) {
            tempModalDefaults.controller = ['$scope', '$rootScope', '$uibModalInstance', '$log', '$filter', '$timeout', function ($scope, $rootScope, $uibModalInstance, $log, $filter, $timeout) {

                $scope.modalOptions = tempModalOptions;
                $scope.regex =  /^\d*$/;
                $scope.campiDiRicerca = [];
                $scope.formvalue = {};
                $scope.listSelected = [];
                $scope.checkedElement = function(element, numelem){
                    $scope.formvalue.modalOptions.input.default = '';
                    $scope.check = [];
                    for(var a=0; a <= numelem; a++){
                        $scope.check[a] = false;
                    }
                    $scope.check[element] = true;
                };
                $scope.checkDefault = function(element){
                    var elementChecked = $scope.formvalue.modalOptions.input.default;
                    if(elementChecked && (elementChecked.voice.id === element.voice.id)){
                        $scope.formvalue.modalOptions.input.default = "";
                    } else {
                        $scope.formvalue.modalOptions.input.default = element;
                    }

                };
                $rootScope.externalCloseModal = function(){
                    $scope.modalOptions.close();
                };
                if(customModalOptions.elementAdd && customModalOptions.elementAdded){
                    angular.forEach(customModalOptions.elementAdded, function(value) {
                        var elementFiltered = $filter('filter')(customModalOptions.elementAdd, {'id':value.id});
                        if(elementFiltered.length){
                            $scope.listSelected.push(elementFiltered[0]);
                        }
                    });
                }

                $scope.closeTimeOut = function(time){
                    if(time > 0){
                        $timeout($scope.modalOptions.close, time);
                    } else {
                        $scope.modalOptions.close();
                    }
                };
                $scope.addToList = function(element){
                    var searchEl = $filter('filter')($scope.listSelected, {'id':element.id});
                    var newList = [];
                    if(searchEl.length > 0){
                        // $scope.listSelected.splice($scope.listSelected.indexOf(searchEl[0].id), 1);
                        angular.forEach($scope.listSelected, function(value) {
                            if(value.id !== searchEl[0].id){
                                newList.push(value);
                            }
                        });
                        $scope.listSelected = newList;
                    } else {
                        $scope.listSelected.push(element);
                    }
                     //$log.info($scope.listSelected);
                };
                $scope.cercaCheck = function(id){
                        var elSearch =  $filter('filter')($scope.listSelected, {'id':id});

                        return elSearch.length > 0;

                };
                $scope.searchAdvance = function(){
                    if (customModalOptions.search) {
                        if (angular.isFunction(customModalOptions.scope[customModalOptions.search])) customModalOptions.scope[customModalOptions.search]($scope.campiDiRicerca.inputSearch);
                    }
                    $uibModalInstance.close();
                };
                $scope.closeSearch = function(){
                    if (customModalOptions.xback) {
                        if (angular.isFunction(customModalOptions.scope[customModalOptions.xback])) customModalOptions.scope[customModalOptions.xback]();
                    }
                    $uibModalInstance.close();
                };

                $scope.modalOptions.ok = function (result) {
                    if (customModalOptions.callbackFunction) {
                        if (angular.isFunction(customModalOptions.scope[customModalOptions.callbackFunction])) customModalOptions.scope[customModalOptions.callbackFunction](result);
                    }
                    $uibModalInstance.close(result);
                };
                $scope.modalOptions.close = function (result) {

                    if (customModalOptions.action && customModalOptions.action === 'go_home') {
                        $uibModalInstance.dismiss('cancel');
                        $state.go('root.homepage');
                    }
                    $uibModalInstance.dismiss('cancel');
                };
                $scope.modalOptions.selectItem = function (item) {
                    $scope.options = [];
                    $scope.options.push(item);
                    // $log.info($scope.options);
                };
                $scope.modalOptions.selectionItem = function (item) {
                    if (!$scope.modalOptions.disableAttributeKey || !item[$scope.modalOptions.disableAttributeKey]) {
                        $uibModalInstance.dismiss('cancel');
                        if (angular.isFunction(customModalOptions.scope[customModalOptions.callbackFunction])) customModalOptions.scope[customModalOptions.callbackFunction](item);
                        return (item);
                    }
                };
                // $log.info($scope.modalOptions);
            }];
        }


        return $uibModal.open(tempModalDefaults).result;
    };

   /* this.alertSearchError = function () {

        return this.showModal({},
            {
                headerText: "Errore",
                bodyText: "Non è stato possibile effettuare la ricerca. Prova più tardi.",
                actionButtonText: 'Chiudi',
                type: 'warning'
            });
    };
    this.alertOkMessage = function (message) {

        return this.showModal({},
            {
                headerText: "Avviso",
                bodyText: message,
                actionButtonText: 'Chiudi',
                type: 'warning'
            });
    };*/
}]);
