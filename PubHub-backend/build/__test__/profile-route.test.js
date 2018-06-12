'use strict';

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _server = require('../lib/server');

var _profileMock = require('./lib/profile-mock');

var _userMock = require('./lib/user-mock');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiUrl = 'http://localhost:' + process.env.PORT;

beforeAll(_server.startServer);
afterAll(_server.stopServer);
afterEach(_profileMock.removeProfilesProm);

describe('profile-route.js', function () {
  test('should return array of all usernames and status 200', function () {
    var testToken = void 0;
    return (0, _userMock.createUserMockProm)().then(function (mockUser) {
      testToken = mockUser.token;
      return (0, _profileMock.createManyProfilesProm)(10).then(function () {
        return _superagent2.default.get(apiUrl + '/profiles').set('Authorization', 'Bearer ' + testToken);
      });
    }).then(function (res) {
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(10);
    });
  });
  test('should return 401 on bad token', function () {
    return (0, _profileMock.createManyProfilesProm)(10).then(function () {
      return _superagent2.default.get(apiUrl + '/profiles').set('Authorization', 'Bearer BADTOKEN');
    }).then(Promise.reject).catch(function (err) {
      return expect(err.status).toBe(401);
    });
  });
});