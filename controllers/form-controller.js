(function() {
    'use strict';

    angular
        .module('form.form.controller', [])
        .controller('formController', FormController);

    FormController.$inject = ['$scope', '$state'];

    function FormController($scope, $state) {

        $scope.source = 'test-data';
        $scope.params = {};
        $scope.graphics = [0,1,2,3];
        var counter = 0;

        $scope.graphTypes = ['Pie', 'Bar'];

        $scope.getData = function() {
            d3.csv('data/test.csv', function(data) {
                $scope.ndx = crossfilter(data);
            });
        };

        $scope.getData();


        $scope.testData = function() {

            //$scope.graphics.push(counter);
            var pieYear = dc.rowChart("#graphic_" + counter);
            counter += 1;

            var countByX = $scope.ndx.dimension(function (d) {
                return d[$scope.params.x];
            }), countByXGroup = countByX.group().reduceSum(function (d) {
                return d[$scope.params.y]
            });

            pieYear
                .width(1000)
                .height(500)
                //.radius(150)
                .dimension(countByX)
                .group(countByXGroup);

            dc.renderAll();

        }


    }

}());
