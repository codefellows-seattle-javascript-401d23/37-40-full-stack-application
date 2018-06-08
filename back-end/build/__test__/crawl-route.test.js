'use strict';

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _crawlMock = require('./lib/crawl-mock');

var _server = require('../lib/server');

var _profile = require('../model/profile');

var _profile2 = _interopRequireDefault(_profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiUrl = 'http://localhost:' + process.env.PORT;

beforeAll(_server.startServer);
afterEach(_crawlMock.removeCrawlMockProm);
afterAll(_server.stopServer);

describe('crawl-route.js tests', function () {
  describe('PUT - crawl-route adding a crawl to a profile', function () {
    test('test should return status 200', function () {
      var savedProfile = void 0;
      return (0, _crawlMock.createCrawlMockNoProfileUpdateProm)().then(function (mock) {
        savedProfile = mock.profile._id;
        return _superagent2.default.put(apiUrl + '/crawls/' + mock.profile.username + '/' + mock.crawl._id + '/test').set('Authorization', 'Bearer ' + mock.user.token);
      }).then(function (response) {
        expect(response.body.profile).toEqual(savedProfile.toString());
        expect(response.body.name).toEqual('test');
        expect(response.status).toEqual(200);
        return _profile2.default.findById(savedProfile.toString());
      }).then(function (profile) {
        expect(profile.crawls).toHaveLength(1);
      });
    });
    test('test should return status 401', function () {
      return (0, _crawlMock.createCrawlMockNoProfileUpdateProm)().then(function (mock) {
        return _superagent2.default.put(apiUrl + '/crawls/' + mock.profile.username + '/' + mock.crawl._id + '/test').set('Authorization', 'Bearer badID');
      }).then(Promise.reject).catch(function (error) {
        expect(error.status).toEqual(401);
      });
    });
    test('test should return status 404', function () {
      return (0, _crawlMock.createCrawlMockNoProfileUpdateProm)().then(function (mock) {
        return _superagent2.default.put(apiUrl + '/crawls/' + mock.profile.username + '/badID/test').set('Authorization', 'Bearer ' + mock.user.token);
      }).then(Promise.reject).catch(function (error) {
        expect(error.status).toEqual(404);
      });
    });
  });

  describe('PUT - targets a particular crawl and add votes', function () {
    test('test should return status 200', function () {
      return (0, _crawlMock.createCrawlMockProm)().then(function (mock) {
        return _superagent2.default.put(apiUrl + '/crawls/votes/' + mock.crawl._id).set('Authorization', 'Bearer ' + mock.user.token);
      }).then(function (response) {
        expect(response.body.votes).toEqual(1);
        expect(response.status).toEqual(200);
      });
    });
    test('test should return status 401', function () {
      return (0, _crawlMock.createCrawlMockProm)().then(function (mock) {
        return _superagent2.default.put(apiUrl + '/crawls/votes/' + mock.crawl._id).set('Authorization', 'Bearer badID');
      }).then(Promise.reject).catch(function (error) {
        expect(error.status).toEqual(401);
      });
    });
    test('test should return status 404', function () {
      return (0, _crawlMock.createCrawlMockProm)().then(function (mock) {
        return _superagent2.default.put(apiUrl + '/crawls/votes/badID').set('Authorization', 'Bearer ' + mock.user.token);
      }).then(Promise.reject).catch(function (error) {
        expect(error.status).toEqual(404);
      });
    });
  });

  describe('GET - retrieve a single crawl from a users profile', function () {
    test('test should return status 200', function () {
      var savedCrawl = void 0;
      return (0, _crawlMock.createCrawlMockProm)().then(function (mock) {
        savedCrawl = mock.crawl;
        return _superagent2.default.get(apiUrl + '/crawls/' + mock.profile.username + '/' + mock.crawl._id).set('Authorization', 'Bearer ' + mock.user.token);
      }).then(function (response) {
        expect(response.body._id).toEqual(savedCrawl._id.toString());
        expect(response.status).toEqual(200);
      });
    });
    test('should return status 400 if route is not on user\'s profile', function () {
      var wrongProfile = void 0;
      return (0, _crawlMock.createCrawlMockProm)().then(function (firstMock) {
        wrongProfile = firstMock.profile;
        return (0, _crawlMock.createCrawlMockProm)();
      }).then(function (secondMock) {
        return _superagent2.default.get(apiUrl + '/crawls/' + wrongProfile.username + '/' + secondMock.crawl._id).set('Authorization', 'Bearer ' + secondMock.user.token);
      }).then(Promise.reject).catch(function (err) {
        expect(err.status).toBe(400);
      });
    });
    test('test should return status 401', function () {
      return (0, _crawlMock.createCrawlMockProm)().then(function (mock) {
        return _superagent2.default.get(apiUrl + '/crawls/' + mock.profile.username + '/' + mock.crawl._id).set('Authorization', 'Bearer badID');
      }).then(Promise.reject).catch(function (error) {
        expect(error.status).toEqual(401);
      });
    });
    test('test should return status 404', function () {
      return (0, _crawlMock.createCrawlMockProm)().then(function (mock) {
        return _superagent2.default.get(apiUrl + '/crawls/' + mock.profile.username + '/badID').set('Authorization', 'Bearer ' + mock.user.token);
      }).then(Promise.reject).catch(function (error) {
        expect(error.status).toEqual(404);
      });
    });
  });

  describe('GET - retrieve all crawls from a users profile', function () {
    test('test should return status 200', function () {
      return (0, _crawlMock.createCrawlMockProm)().then(function (mock) {
        return _superagent2.default.get(apiUrl + '/crawls/' + mock.profile.username).set('Authorization', 'Bearer ' + mock.user.token);
      }).then(function (response) {
        expect(response.body).toHaveLength(1);
        expect(response.status).toEqual(200);
      });
    });
    test('GET all crawls test should return status 401', function () {
      return (0, _crawlMock.createCrawlMockProm)().then(function (mock) {
        return _superagent2.default.get(apiUrl + '/crawls/' + mock.profile.username).set('Authorization', 'Bearer badID');
      }).then(Promise.reject).catch(function (error) {
        expect(error.status).toEqual(401);
      });
    });
    test('GET all crawls test should return status 500', function () {
      return (0, _crawlMock.createCrawlMockProm)().then(function (mock) {
        return _superagent2.default.get(apiUrl + '/crawls/badID').set('Authorization', 'Bearer ' + mock.user.token);
      }).then(Promise.reject).catch(function (error) {
        expect(error.status).toEqual(500);
      });
    });
  });

  describe('GET - retrieve a single crawl\'s votes', function () {
    test('test should return status 200', function () {
      return (0, _crawlMock.createCrawlMockProm)().then(function (mock) {
        return _superagent2.default.get(apiUrl + '/crawls/' + mock.profile.username + '/' + mock.crawl._id).set('Authorization', 'Bearer ' + mock.user.token);
      }).then(function (response) {
        expect(response.body.votes).toEqual(0);
        expect(response.status).toEqual(200);
      });
    });
    test('Single crawl test should return status 404', function () {
      return (0, _crawlMock.createCrawlMockProm)().then(function (mock) {
        return _superagent2.default.get(apiUrl + '/crawls/' + mock.profile.username + '/badID').set('Authorization', 'Bearer ' + mock.user.token);
      }).then(Promise.reject).catch(function (error) {
        expect(error.status).toEqual(404);
      });
    });
    test('Single crawl test should return status 401', function () {
      return (0, _crawlMock.createCrawlMockProm)().then(function (mock) {
        return _superagent2.default.get(apiUrl + '/crawls/' + mock.profile.username + '/' + mock.crawl._id).set('Authorization', 'Bearer badID');
      }).then(Promise.reject).catch(function (error) {
        expect(error.status).toEqual(401);
      });
    });
  });

  describe('DELETE - deletes a single crawl from a users profile', function () {
    test('test should return status 204', function () {
      return (0, _crawlMock.createCrawlMockProm)().then(function (mock) {
        return _superagent2.default.del(apiUrl + '/crawls/' + mock.crawl._id).set('Authorization', 'Bearer ' + mock.user.token);
      }).then(function (response) {
        expect(response.status).toEqual(204);
      });
    });
    test('DEL test should return 404', function () {
      return (0, _crawlMock.createCrawlMockProm)().then(function (mock) {
        return _superagent2.default.del(apiUrl + '/crawls/badID').set('Authorization', 'Bearer ' + mock.user.token);
      }).then(Promise.reject).catch(function (error) {
        expect(error.status).toEqual(404);
      });
    });
    test('DEL should return status 401 ', function () {
      return (0, _crawlMock.createCrawlMockProm)().then(function (mock) {
        return _superagent2.default.del(apiUrl + '/crawls/' + mock.crawl._id).set('Authorization', 'Bearer badID');
      }).then(Promise.reject).catch(function (error) {
        expect(error.status).toEqual(401);
      });
    });
  });

  describe('GET - /crawls', function () {
    test('should return status 200 and array of all crawls in DB', function () {
      return (0, _crawlMock.createCrawlMockProm)().then(function (mock) {
        return _superagent2.default.get(apiUrl + '/crawls').set('Authorization', 'Bearer ' + mock.user.token);
      }).then(function (response) {
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
      });
    });
    test('should return status 401 and array of all crawls in DB', function () {
      return _superagent2.default.get(apiUrl + '/crawls').set('Authorization', 'Bearer BadID').then(Promise.reject).catch(function (error) {
        expect(error.status).toEqual(401);
      });
    });
  });

  describe('GET - a crawls total votes', function () {
    test('should return status 200 with sucess', function () {
      return (0, _crawlMock.createCrawlMockProm)().then(function (mock) {
        return _superagent2.default.get(apiUrl + '/crawls/votes/' + mock.crawl._id).set('Authorization', 'Bearer ' + mock.user.token);
      }).then(function (response) {
        expect(response.body).toEqual('Total votes: 0');
        expect(response.status).toBe(200);
      });
    });
    test('should return status 404', function () {
      return (0, _crawlMock.createCrawlMockProm)().then(function (mock) {
        return _superagent2.default.get(apiUrl + '/crawls/votes/badID').set('Authorization', 'Bearer ' + mock.user.token);
      }).then(Promise.reject).catch(function (error) {
        expect(error.status).toBe(404);
      });
    });
    test('should return status 401', function () {
      return (0, _crawlMock.createCrawlMockProm)().then(function (mock) {
        return _superagent2.default.get(apiUrl + '/crawls/votes/' + mock.crawl._id).set('Authorization', 'Bearer badID');
      }).then(Promise.reject).catch(function (error) {
        expect(error.status).toBe(401);
      });
    });
  });
});