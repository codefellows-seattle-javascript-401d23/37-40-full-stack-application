'use strict';

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _server = require('../lib/server');

var _userMock = require('./lib/user-mock');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiURL = 'http://localhost:' + process.env.PORT;

describe('USER ROUTER', function () {
  beforeAll(_server.startServer);
  afterEach(_userMock.removeUserMockProm);
  afterAll(_server.stopServer);

  test('POST creating a user should respond with 200 and a token if there are no errors', function () {
    return _superagent2.default.post(apiURL + '/signup').send({
      username: 'bob',
      password: 'this is a secret',
      email: 'bob@gmail.com'
    }).then(function (response) {
      expect(response.status).toEqual(200);
      expect(response.body.token).toBeTruthy();
    });
  });
  test('POST /signup - an incomplete request should return a 400', function () {
    return _superagent2.default.post(apiURL + '/signup').send({
      username: 'blob',
      password: 'this is a secret thing',
      email: ''
    }).then(Promise.reject).catch(function (response) {
      expect(response.status).toEqual(400);
    });
  });
  test('POST /signup - should return 409 if duplicate key sent', function () {
    var duplicateUsername = void 0;
    return (0, _userMock.createUserMockProm)().then(function (mock) {
      duplicateUsername = mock.user.username;
      return _superagent2.default.post(apiURL + '/signup').send({
        username: duplicateUsername,
        password: 'password',
        email: 'email'
      });
    }).then(Promise.reject).catch(function (err) {
      return expect(err.status).toBe(409);
    });
  });
  describe('GET /login', function () {
    test('GET /login should get a 200 status code and a token if there are no errors', function () {
      return (0, _userMock.createUserMockProm)().then(function (mock) {
        return _superagent2.default.get(apiURL + '/login').auth(mock.request.username, mock.request.password);
      }).then(function (response) {
        expect(response.status).toEqual(200);
        expect(response.body.token).toBeTruthy();
      });
    });
    test('GET /login should get a 401 for unauthorized access', function () {
      return (0, _userMock.createUserMockProm)().then(function (mock) {
        return _superagent2.default.get(apiURL + '/login').auth(mock.request.username, 'seth"spassword');
      }).then(Promise.reject).catch(function (response) {
        expect(response.status).toEqual(401);
      });
    });
    test('GET /login should get a 400 if no authorization sent', function () {
      return (0, _userMock.createUserMockProm)().then(function () {
        return _superagent2.default.get(apiURL + '/login');
      }).then(Promise.reject).catch(function (response) {
        expect(response.status).toEqual(400);
      });
    });
    test('GET /login should get a 400 if incomplete authorization sent', function () {
      return (0, _userMock.createUserMockProm)().then(function () {
        return _superagent2.default.get(apiURL + '/login').auth('');
      }).then(Promise.reject).catch(function (response) {
        expect(response.status).toEqual(400);
      });
    });
  });
});