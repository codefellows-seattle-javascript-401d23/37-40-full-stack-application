'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var HttpError = require('http-errors');

require('dotenv').config();
var GraphHopperRouting = require('graphhopper-js-api-client/src/GraphHopperRouting');
var GHInput = require('graphhopper-js-api-client/src/GHInput');

var findOptimalPath = function findOptimalPath(paths) {
  var options = {
    key: process.env.GH_API_KEY,
    optimize: true,
    instructions: false,
    vehicle: 'foot'
  };
  var ghRouting = new GraphHopperRouting(options);
  paths.forEach(function (path) {
    var lat = path.geometry.location.lat;
    var lng = path.geometry.location.lng;

    return ghRouting.addPoint(new GHInput(lat, lng));
  });
  return ghRouting.doRequest().then(function (json) {
    return json.paths[0].points_order;
  }).catch(function (err) {
    throw new HttpError(400, 'PATHFINDER - Error ' + err);
  });
};

exports.default = findOptimalPath;