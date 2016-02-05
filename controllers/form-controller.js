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
        $scope.params.id = $state.params.id;
        $scope.graphTypes = ['Pie', 'Row'];

        $scope.generate = function() {
            d3.csv('data/test.csv', function (data) {
                $scope.params.ndx = crossfilter(data);
                $scope.params.id = $scope.params.id || Math.floor(Math.random() * (99999999 - 10000000) + 10000000);
                generatorService.generateGraph($scope.params, 'container');
                if($scope.toDash) {
                    $state.go('main.dashboard')
                }
            });
        };


        if ($state.params.id) {
            var graph = generatorService.getGraph($state.params.id);
            $scope.params.graphType = graph.graphType;
            $scope.params.name = graph.name;
            $scope.params.x = graph.x;
            $scope.params.y = graph.y;
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
