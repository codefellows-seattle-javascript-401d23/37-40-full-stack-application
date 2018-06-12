'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeUserMockProm = exports.createUserMockProm = undefined;

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _user = require('../../model/user');

var _user2 = _interopRequireDefault(_user);

var _profile = require('../../model/profile');

var _profile2 = _interopRequireDefault(_profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createUserMockProm = function createUserMockProm() {
  var mock = {};
  mock.request = {
    username: _faker2.default.internet.userName(),
    email: _faker2.default.internet.email(),
    password: _faker2.default.lorem.words(2)
  };

  return _user2.default.create(mock.request.username, mock.request.password, mock.request.email).then(function (user) {
    mock.user = user;
    return user.createTokenProm();
  }).then(function (token) {
    mock.token = token;
    return _user2.default.findById(mock.user._id);
  }).then(function (user) {
    mock.user = user;
    return mock;
  });
};

var removeUserMockProm = function removeUserMockProm() {
  return Promise.all([_user2.default.remove({}), _profile2.default.remove({})]);
};

exports.createUserMockProm = createUserMockProm;
exports.removeUserMockProm = removeUserMockProm;