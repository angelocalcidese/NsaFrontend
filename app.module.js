var config = {};
// Import variables if present (from config.js)
if(window){
    Object.assign(config, window.__config);
}

var nsaApp = angular.module('nsaApp',['ngAnimate', 'ngSanitize', "ui.router", "ui.bootstrap", 'angularUtils.directives.dirPagination']);

// Register environment in AngularJS as constant
nsaApp.constant('__config', config);


/* Internal Modules */
//var commonModule = angular.module('common', [ 'ui.router']);

nsaApp.run([ '$rootScope', '$state', '$log', function($rootScope, $state,  $log) {
    $log.info('app bootstrap...');
}]);
