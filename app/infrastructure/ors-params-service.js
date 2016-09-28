angular.module('orsApp.params-service', []).factory('orsParamsService', ['orsObjectsFactory', 'orsRequestService', function(orsObjectsFactory, orsRequestService) {
    let orsParamsService = {};
    orsParamsService.settings = {
        waypoints: [],
        profile: {
            options: {}
        }
    };
    orsParamsService.importSettings = (params) => {
        angular.forEach(params, function(value, key) {
            console.log(value, key);
            if (key == 'wps') {
                const wps = value.match(/[^,]+,[^,]+/g);
                let idx = 0,
                    waypoints = [];
                angular.forEach(wps, function(wp) {
                    wp = wp.split(",");
                    console.log(wp)
                    wp = orsObjectsFactory.createWaypoint('', new L.latLng([parseFloat(wp[0]), parseFloat(wp[1])]));
                    console.log(wp)
                    waypoints.push(wp);
                    orsRequestService.getAddress(wp._latlng, idx, true);
                    idx += 1;
                });
                orsParamsService.settings.waypoints = waypoints;
            }
            if (key == 'profile') {
                orsParamsService.settings.profile.type = value;
            }
            if (key == 'weight') {
                orsParamsService.settings.profile.options.weight = value;
            }
            if (key == 'maxspeed') {
                orsParamsService.settings.profile.options.maxspeed = value;
            }
            if (key == 'hgvweight') {
                orsParamsService.settings.profile.options.hgvWeight = value;
            }
            if (key == 'width') {
                orsParamsService.settings.profile.options.width = value;
            }
            if (key == 'height') {
                orsParamsService.settings.profile.options.height = value;
            }
            if (key == 'axleload') {
                orsParamsService.settings.profile.options.axleload = value;
            }
            if (key == 'length') {
                orsParamsService.settings.profile.options.length = value;
            }
            if (key == 'fitness') {
                orsParamsService.settings.profile.options.fitness = value;   
            }
            if (key == 'steepness') {
                orsParamsService.settings.profile.options.steepness = value;
            }
        });
        return orsParamsService.settings;
    };
    return orsParamsService;
}]);