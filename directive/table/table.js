nsaApp.controller('nsaTableController', ['$scope','$log', 'modalService',
    function ($scope, $log, modalService) {

    $scope.pesaturaCont = function(item){
        return item.statoAccettazione === 'IN PESATURA';
    };
    $scope.anomalieContN = function(item){
       return (item.statoAccettazione !== 'IN PESATURA') && (item.numAnomalieAperte > 0) && (item.bloccataDaAnomalia === 'N');
    };
    $scope.anomalieContY = function(item){
       return (item.statoAccettazione !== 'IN PESATURA') && (item.numAnomalieAperte > 0) && (item.bloccataDaAnomalia === 'Y');
    };
    $scope.anomalieContZero = function(item){
       return (item.statoAccettazione !== 'IN PESATURA') && (item.numAnomalieAperte === 0);
    };

        function createPage(num){
            var item = [];
            for(var a=0; a < num; a++){
                if($scope.dati[a]){
                    item[a] = $scope.dati[a];
                    $scope.pagetrue = a;
                } else {
                    item[a] = {};
                }
            }
            $scope.dati = item;
            $log.info($scope.dati);
            // $scope.pagetrue = countItem / 10;
            $log.info('pagine piene: ' + Math.ceil($scope.pagetrue));
        }
        function overOneUndredItem(){
            return !!($scope.numberItems && ($scope.numberItems > 100));
        }

        $scope.$watch("dati", function(newValue) {
            $scope.disclaimer = false;
           if(newValue && overOneUndredItem() && !$scope.stopPropagation){
               createPage($scope.numberItems);
               $scope.stopPropagation = true;
           }
        });
        function countItemPlus(start){
            if(($scope.numberItems - start) > 100){
                return start + 99;
            } else {
                return  start + ($scope.numberItems - start);
            }
        }
        $scope.pageChangeHandler = function(newpage){
            var start = '';
            var finish = '';
              if(overOneUndredItem() && !$scope.dati[newpage * 10 - 9].idAccettazione){
                  // chiamo il servizio per QUESTA PAGINA
                  start = newpage * 10 - 9;
                  finish = countItemPlus(start);
                  $scope.callElement($scope.dati ,start, finish);
              } else if(overOneUndredItem() && !$scope.dati[newpage * 10 + 1].idAccettazione){
                  // chiamo il servizio per PAGINA SUCCESSIVA
                  start = newpage * 10 + 1;
                 finish = countItemPlus(start);
                 $scope.callElement($scope.dati ,start, finish);
             }
           // $log.info($scope.numberItems);
        };
    // Codice Tabella
        $scope.disclaimer = false;
        $scope.form = {};
        $scope.currentPage = 1;
        $scope.sort = function(keyname){
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        };
        $scope.disclaimerFun = function(item){
            $scope.disclaimer = !$scope.disclaimer;
            $scope.detail = item;
        };
        $scope.openMenu = [];
        $scope.modenabled = function(index, dati){
            for(var a = 0; a <= dati.length; a++) if (a === index) {
                $scope.openMenu[a] = !$scope.openMenu[a];
            } else {
                $scope.openMenu[a] = false;
            }
        };
        /**
         * Modale registrazione user
         */
        $scope.detailView = function(title, body){
            modalService.showModal({}, {
                headerText: "Dettaglio",
                contentType: "",
                bodyText: "",
                scope: $scope,
                type: "detail",
                input: title,
                data: body
            });
        };

    }]).directive('nsaTable', function() {
    return {
        restrict: 'E',
        scope: {
            dati: '=',
            customHeader: '=',
            showSpinner: '=',
            tipologia: '=',
            detailViews: '=',
            functionEdit: '=',
            functionDetail: '=',
            voiceNoElement: '=',
            search: '=',
            detailObj: '=',
            searchElement: '=',
            tableName:'=',
            numberItems:'=',
            callElement:'='
        },
        replace: true,
        controller: 'nsaTableController',
        templateUrl: 'views/directive/table.html'
    }
});