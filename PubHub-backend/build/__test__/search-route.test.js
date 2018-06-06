'use strict';

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _server = require('../lib/server');

var _crawl = require('../model/crawl');

var _crawl2 = _interopRequireDefault(_crawl);

var _stop = require('../model/stop');

var _stop2 = _interopRequireDefault(_stop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiUrl = 'http://localhost:' + process.env.PORT;

beforeAll(_server.startServer);
afterAll(function () {
  _stop2.default.remove({});
  _crawl2.default.remove({});
  (0, _server.stopServer)();
});

describe('testing search functionality', function () {
  test('should return crawl with 4 stops and a route id', function () {
    return _superagent2.default.get(apiUrl + '/search/47.6182477/-122.35406/3/4').then(function (res) {
      expect(res.status).toEqual(200);
      expect(res.body).toHaveLength(5);
    });
  });
  test('should return 404 if necessary parameters are missing', function () {
    return _superagent2.default.get(apiUrl + '/search/6/7/1').then(Promise.reject).catch(function (err) {
      expect(err.status).toEqual(404);
    });
  });
  test('should return 400 if max price is greater than 4', function () {
    return _superagent2.default.get(apiUrl + '/search/47.6182477/-122.35406/8/4').then(Promise.reject).catch(function (err) {
      expect(err.status).toEqual(400);
    });
  });
  test('should return 400 if max stops is out of range', function () {
    return _superagent2.default.get(apiUrl + '/search/47.6182477/-122.35406/3/1').then(Promise.reject).catch(function (err) {
      expect(err.status).toEqual(400);
    });
  });
});