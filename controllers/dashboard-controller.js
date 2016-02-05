(function() {
    'use strict';

    angular
        .module('form.dashboard.controller', [])
        .controller('dashboardController', DashboardController);

    DashboardController.$inject = ['$scope', '$state', 'generatorService'];

    function DashboardController($scope, $state, generatorService) {

        $scope.graphs = generatorService.getGraphList();

        console.log($scope.graphs);

        d3.csv('data/test.csv', function (data) {
            var ndx = crossfilter(data);

            $scope.graphs.forEach(function(graph) {
                graph.ndx = ndx;
                generatorService.generateGraph(graph, graph.id)
            })

        });

        $scope.deleteGraph = function(graph) {
            generatorService.removeGraph(graph.id);
            $scope.graphs = generatorService.getGraphList();
        };
    }

}());
