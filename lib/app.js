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
                template: '<div ui-view></div>'
            })
            .state('main.form', {
                url: '/form',
                controller: 'formController',
                templateUrl: 'views/container-view.html'
            });

    }

    function appRun() {
       console.log('start')
    }

}());
