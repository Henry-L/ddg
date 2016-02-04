(function() {
    'use strict';

    angular.module('form', [

//directive

//controller
        'form.form.controller',
        'form.dashboard.controller',

//service
        'form.generator.service',

//components
        'ui.router',
        'angular-cache'
    ]);
}());
