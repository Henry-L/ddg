(function() {
    'use strict';

    angular
        .module('form.generator.service', [])
        .factory('generatorService', GeneratorService);

    GeneratorService.$inject = [];

    function GeneratorService() {

        var possibleOptions = [
            {name: 'width', type: 'number', default: 100},
            {name: 'height', type: 'number', default: 100},
            {name: 'radius', type: 'number', default: 30},
            {name: 'label', type: 'checkbox', default: true}
        ];

        // declare public API
        var service = {
            getOptions: function(graphType) {
                var type = graphType + 'Chart';
                return _.filter(possibleOptions, function(o) {
                    return Object.keys(dc[type]()).indexOf(o.name) > -1
                })
            },
            generateGraph: function(config) {
                console.log(config.graphType + 'Chart')
                var graph = dc[config.graphType + 'Chart']("#graphic_0");

                d3.csv('data/test.csv', function(data) {

                    var ndx = crossfilter(data);
                    //$scope.graphics.push(counter);
                    //counter += 1;
                    //
                    var countByX = ndx.dimension(function (d) {
                        return d[config.x];
                    }), countByXGroup = countByX.group().reduceSum(function (d) {
                        return d[config.y]
                    });

                    graph
                        .width(config.width)
                        .height(config.height)
                        .dimension(countByX)
                        .group(countByXGroup);

                    dc.renderAll();
                });



            }
        };

        return service;

    }
}());
