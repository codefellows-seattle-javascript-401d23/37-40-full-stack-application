'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _stop = require('../model/stop');

var _stop2 = _interopRequireDefault(_stop);

var _crawl = require('../model/crawl');

var _crawl2 = _interopRequireDefault(_crawl);

var _routing = require('../lib/routing');

var _routing2 = _interopRequireDefault(_routing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchRoute = new _express.Router();

searchRoute.get('/search/:latitude/:longitude/:price/:stops', function (req, res, next) {
  if (req.params.price > 4) return next(new _httpErrors2.default(400, 'Max price must be between 0-4'));
  if (req.params.stops > 6 || req.params.stops < 3) {
    return next(new _httpErrors2.default(400, 'Max stops must be between 3-6'));
  }
  var emptyCrawl = void 0;
  var stopInfo = [];
  var orderedStops = [];
  var stops = void 0;
  return _superagent2.default.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + req.params.latitude + ',' + req.params.longitude + '&price=' + req.params.price + '&rankby=distance&type=bar&keyword=pub&key=' + process.env.GOOGLE_API_KEY).then(function (searchResults) {
    stops = searchResults.body.results.slice(0, Number(req.params.stops));
    return (0, _routing2.default)(stops);
  }).then(function (returnedStops) {
    for (var i = 0; i < req.params.stops; i++) {
      orderedStops[i] = stops[returnedStops[i]];
    }
    return new _crawl2.default({}).save();
  }).then(function (crawl) {
    emptyCrawl = crawl;
    return Promise.all(orderedStops.map(function (location) {
      stopInfo.push({ name: location.name, address: location.vicinity });
      return new _stop2.default({
        crawl: emptyCrawl._id,
        latitude: location.geometry.location.lat,
        longitude: location.geometry.location.lng,
        locationName: location.name,
        address: location.vicinity
      }).save();
    }));
  }).then(function () {
    return _crawl2.default.findById(emptyCrawl._id).then(function (foundCrawl) {
      stopInfo.push({ crawlId: foundCrawl._id });
      return res.json(stopInfo);
    });
  }).catch(next);
});

exports.default = searchRoute;