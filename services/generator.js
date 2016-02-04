(function() {
    'use strict';

    angular
        .module('form.generator.service', [])
        .factory('generatorService', GeneratorService);

    GeneratorService.$inject = ['CacheFactory'];

    function GeneratorService(CacheFactory) {

        var service = {};

        var getCache = function() {
            if (!CacheFactory.get('graphCache')) {
                return new CacheFactory('graphCache', {
                    storageImpl: localStorage
                });
            } else {
                return CacheFactory.get('graphCache');
            }
        };

        var possibleOptions = [
            {name: 'width', type: 'number', default: 300},
            {name: 'height', type: 'number', default: 300},
            {name: 'radius', type: 'number', default: 30},
            {name: 'label', type: 'checkbox', default: true}
        ];

        // declare public API

        service.getOptions = function(graphType) {
            var type = graphType + 'Chart';
            return _.filter(possibleOptions, function(o) {
                return Object.keys(dc[type]()).indexOf(o.name) > -1
            })
        };

        service.generateGraph = function(config, index) {
            console.log(config);
            var graph = dc[config.graphType + 'Chart']("#graphic-" + index);

            var countByX = config.ndx.dimension(function (d) {
                return d[config.x];
            }), countByXGroup = countByX.group().reduceSum(function (d) {
                return d[config.y]
            });

            graph
                .width(config.width)
                .height(config.height)
                .dimension(countByX)
                .group(countByXGroup);

            graph.render();

            var cache = getCache();
            cache.put(config.name, config);

        };

        service.getGraphList = function() {
            return getCache().values();
        };

        service.getGraph = function(name) {
            return getCache().get(name);
        };

        service.removeGraph = function(name) {
            getCache().remove(name);
        };

        return service;

    }
}());
