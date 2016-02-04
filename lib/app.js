(function() {
    'use strict';

    angular
        .module('form')
        .config(appConfig)
        .run(appRun);

    appConfig.$inject = [ '$urlRouterProvider', '$stateProvider'];
    appRun.$inject = [ ];

    function appConfig($urlRouterProvider, $stateProvider) {
        //$locationProvider.html5Mode(false);
        $urlRouterProvider.otherwise('/');

        // define application states
        $stateProvider
            .state('main', {
                abstract: true,
                templateUrl: 'views/main-view.html'
            })
            .state('main.dashboard', {
                url: '/',
                controller: 'dashboardController',
                templateUrl: 'views/dashboard-view.html'
            })
            .state('main.create', {
                url: '/create',
                controller: 'formController',
                templateUrl: 'views/container-view.html'
            })
            .state('main.edit', {
                url: '/edit/:name',
                controller: 'formController',
                templateUrl: 'views/container-view.html'
            });


    }

    function appRun() {
       console.log('start')
    }

}());
