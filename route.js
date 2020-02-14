nsaApp.config([ '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('root', {
            abstract : true,
            params : "",
            views : {
                'header' : {
                    templateUrl : 'views/common/header.html'
                },
                'sidebar' : {
                    templateUrl : 'views/common/sidebar.html'
                },
                'footer' : {
                    templateUrl : 'views/common/footer.html'
                }
            }
        })
        .state('root.login', {
            url : "/login",
            views : {
                'sidebar@' : {
                    templateUrl : 'views/common/sidebar.html'
                },
                'body@' : {
                    templateUrl : 'views/common/login/body.html',
                    controller : 'login'
                }
            }
        })
        .state('root.application', {
            url : "/application/{tab}",
            params: {
                'tab': 'application'
            },
            views : {
                'body@' : {
                    templateUrl : 'views/profile/application/body.html',
                    controller : 'application'
                }
            }
        })
        .state('root.application.detailapp', {
            url : "/detailapp/{name}",
            params: "",
            views : {
                'body@' : {
                    templateUrl : 'views/profile/detailapp/body.html',
                    controller : 'detailapp'
                }
            }
        })
        .state('root.elencouser', {
            url : "/elencouser/{tab}",
            params: {
                'tab': 'users'
            },
            views : {
                'body@' : {
                    templateUrl : 'views/profile/elencouser/body.html',
                    controller : 'elencouser'
                }
            }
        })
        .state('root.elencouser.detailuser', {
        url : "/detailuser/{username}",
            params: "",
        views : {
            'body@' : {
                templateUrl : 'views/profile/detailuser/body.html',
                controller : 'detailuser'
            }
        }
        })
        .state('root.elencouser.detailrole', {
        url : "/detailrole/{name}",
            params: "",
        views : {
            'body@' : {
                templateUrl : 'views/profile/detailrole/body.html',
                controller : 'detailrole'
            }
        }
        })
        .state('root.elencouser.detailunit', {
        url : "/detailunit/{id}",
            params: "",
        views : {
            'body@' : {
                templateUrl : 'views/profile/detailunit/body.html',
                controller : 'detailunit'
            }
        }
        })
        .state('root.elencouser.detailgroup', {
        url : "/detailgroup/{name}",
            params: "",
        views : {
            'body@' : {
                templateUrl : 'views/profile/detailgroup/body.html',
                controller : 'detailgroup'
            }
        }
        })
        .state('root.workingprogres', {
        url : "/workingprogres/{tab}",
        params: {
            'tab': 'ordersinline'
        },
        views : {
            'header@' : {
                templateUrl : 'views/common/header-search.html'
            },
            'body@' : {
                templateUrl : 'views/process/workinprogres/body.html',
                controller : 'workingprogres'
            }
        }
    })
        .state('root.workingprogres.working', {
        url : "/working",
        params: {
            'order': ''
        },
        views : {
            'header@' : {
                templateUrl : 'views/common/header.html'
            },
            'body@' : {
                templateUrl : 'views/process/working/body.html',
                controller : 'working'
            }
        }
    });
}]);
