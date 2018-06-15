'use strict';

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _stopMock = require('./lib/stop-mock');

var _server = require('../lib/server');

var _logger = require('../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _crawl = require('../model/crawl');

var _crawl2 = _interopRequireDefault(_crawl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiUrl = 'http://localhost:' + process.env.PORT;

beforeAll(_server.startServer);
afterAll(_server.stopServer);
afterEach(_stopMock.removeStopMockProm);

describe('stop-route.js', function () {
  describe('PUT', function () {
    test('should return status 200 and additional vote', function () {
      return (0, _stopMock.createStopMockProm)().then(function (mock) {
        return _superagent2.default.put(apiUrl + '/stops/votes/' + mock.stop._id).set('Authorization', 'Bearer ' + mock.user.token);
      }).then(function (response) {
        expect(response.body.votes).toEqual(1);
        expect(response.status).toEqual(200);
      });
    });
    test('should return status 401 for bad token', function () {
      return (0, _stopMock.createStopMockProm)().then(function (mock) {
        return _superagent2.default.put(apiUrl + '/stops/votes/' + mock.stop._id).set('Authorization', 'Bearer BADTOKEN');
      }).then(Promise.reject).catch(function (err) {
        return expect(err.status).toBe(401);
      });
    });
    test('should return status 404 for bad id', function () {
      return (0, _stopMock.createStopMockProm)().then(function (mock) {
        return _superagent2.default.put(apiUrl + '/stops/votes/BADID').set('Authorization', 'Bearer ' + mock.user.token);
      }).then(Promise.reject).catch(function (err) {
        return expect(err.status).toBe(404);
      });
    });
  });
  describe('DELETE', function () {
    test('should remove stop from crawl and return status 204', function () {
      var crawlIdToRemoveFrom = void 0;
      return (0, _stopMock.createStopMockProm)().then(function (mock) {
        crawlIdToRemoveFrom = mock.crawl._id;
        return _superagent2.default.del(apiUrl + '/stops/' + mock.stop._id).set('Authorization', 'Bearer ' + mock.user.token);
      }).then(function (response) {
        expect(response.status).toEqual(204);
        return _crawl2.default.findById(crawlIdToRemoveFrom);
      }).then(function (crawl) {
        _logger2.default.log(_logger2.default.INFO, 'crawl with removed stop ' + crawl);
        expect(crawl.stops).toHaveLength(0);
      });
    });
    test('should return status 401 for bad token', function () {
      return (0, _stopMock.createStopMockProm)().then(function (mock) {
        return _superagent2.default.del(apiUrl + '/stops/' + mock.stop._id).set('Authorization', 'Bearer BADTOKEN');
      }).then(Promise.reject).catch(function (err) {
        return expect(err.status).toBe(401);
      });
    });
    test('should return status 404 for bad id', function () {
      return (0, _stopMock.createStopMockProm)().then(function (mock) {
        return _superagent2.default.del(apiUrl + '/stops/BADID').set('Authorization', 'Bearer ' + mock.user.token);
      }).then(Promise.reject).catch(function (err) {
        return expect(err.status).toBe(404);
      });
    });
    test('should return status 400 if no token sent', function () {
      return (0, _stopMock.createStopMockProm)().then(function (mock) {
        return _superagent2.default.get(apiUrl + '/stops/votes/' + mock.stop._id).set('Authorization', 'Bearer');
      }).then(Promise.reject).catch(function (err) {
        return expect(err.status).toBe(400);
      });
    });
  });

  describe('GET VOTES', function () {
    test('should return status 200 and number of votes on stop', function () {
      return (0, _stopMock.createStopMockProm)().then(function (mock) {
        return _superagent2.default.get(apiUrl + '/stops/votes/' + mock.stop._id).set('Authorization', 'Bearer ' + mock.user.token);
      }).then(function (response) {
        expect(response.status).toBe(200);
        expect(response.body).toEqual('Total votes: 0');
      });
    });
    test('should return status 401 for bad token', function () {
      return (0, _stopMock.createStopMockProm)().then(function (mock) {
        return _superagent2.default.get(apiUrl + '/stops/votes/' + mock.stop._id).set('Authorization', 'Bearer BADTOKEN');
      }).then(Promise.reject).catch(function (err) {
        return expect(err.status).toBe(401);
      });
    });
    test('should return status 404 for bad id', function () {
      return (0, _stopMock.createStopMockProm)().then(function (mock) {
        return _superagent2.default.get(apiUrl + '/stops/votes/BADID').set('Authorization', 'Bearer ' + mock.user.token);
      }).then(Promise.reject).catch(function (err) {
        return expect(err.status).toBe(404);
      });
    });
    test('should return status 400 if no authorization sent', function () {
      return (0, _stopMock.createStopMockProm)().then(function (mock) {
        return _superagent2.default.get(apiUrl + '/stops/votes/' + mock.stop._id);
      }).then(Promise.reject).catch(function (err) {
        return expect(err.status).toBe(400);
      });
    });
  });
});