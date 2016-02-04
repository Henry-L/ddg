(function() {
    'use strict';

    angular
        .module('form.form.controller', [])
        .controller('formController', FormController);

    FormController.$inject = ['$scope', '$state', 'generatorService'];

    function FormController($scope, $state, generatorService) {

        $scope.source = 'test-data';
        $scope.params = {
            x: 'site_name',
            y: 'demand_cost'
        };
        $scope.graphics = [0,1,2,3];
        var counter = 0;

        $scope.graphTypes = ['Pie', 'Row'];

        $scope.getData = function() {
            d3.csv('data/test.csv', function (data) {
                $scope.params.ndx = crossfilter(data);
            });
        };

        $scope.getData();



        $scope.typeChange = function() {
            $scope.chartOptions = generatorService.getOptions($scope.params.graphType);
            $scope.chartOptions.forEach(function(opt) {
                $scope.params[opt.name] = opt.default;
            })
        };


        $scope.generate = function() {
            console.log($scope.params);
            generatorService.generateGraph($scope.params, counter);
            counter += 1;

            //dc.renderAll();

        }

    }

}());
