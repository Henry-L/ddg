(function() {
    'use strict';

    angular
        .module('form.form.controller', [])
        .controller('formController', FormController);

    FormController.$inject = ['$scope', '$state', 'generatorService'];

    function FormController($scope, $state, generatorService) {

        $scope.source = 'test-data';
        $scope.params = {};
        $scope.graphics = [0,1,2,3];
        var counter = 0;

        $scope.graphTypes = ['Pie', 'Row'];


        $scope.typeChange = function() {
            $scope.chartOptions = generatorService.getOptions($scope.params.graphType);
        };


        $scope.testData = function() {
            console.log($scope.params);
            generatorService.generateGraph($scope.params);
        }


    }

}());
