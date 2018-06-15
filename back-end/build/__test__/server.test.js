'use strict';

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _server = require('../lib/server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

beforeAll(_server.startServer);
afterAll(_server.stopServer);

var apiUrl = 'http://localhost:' + process.env.PORT;

describe('testing / route', function () {
  test('testing successful cowsay', function () {
    return _superagent2.default.get(apiUrl).then(function (response) {
      expect(response.status).toBe(200);
    });
  });
});

describe('testing /team', function () {
  test('testing successful team response', function () {
    return _superagent2.default.get(apiUrl + '/team').then(function (response) {
      expect(response.status).toBe(200);
    });
  });
});