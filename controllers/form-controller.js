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
        $scope.graphTypes = ['Pie', 'Row'];

        $scope.generate = function() {
            d3.csv('data/test.csv', function (data) {
                $scope.params.ndx = crossfilter(data);
                generatorService.generateGraph($scope.params, 'container');
            });
            if($scope.toDash) {
                $state.go('main.dashboard')
            }
        };


        if ($state.params.name) {
            var graph = generatorService.getGraph($state.params.name);
            $scope.params.graphType = graph.graphType;
            $scope.params.name = graph.name;
            $scope.chartOptions = generatorService.getOptions(graph.graphType);
            $scope.chartOptions.forEach(function(opt) {
                $scope.params[opt.name] = graph[opt.name];
            });
            $scope.generate();
        }

        $scope.typeChange = function() {
            $scope.chartOptions = generatorService.getOptions($scope.params.graphType);
            $scope.chartOptions.forEach(function(opt) {
                $scope.params[opt.name] = opt.default;
            });
        };

    }

}());
