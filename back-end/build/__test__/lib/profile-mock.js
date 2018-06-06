'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeProfilesProm = exports.createManyProfilesProm = undefined;

var _userMock = require('./user-mock');

var _profile = require('../../model/profile');

var _profile2 = _interopRequireDefault(_profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createMockProfileProm = function createMockProfileProm() {
  return (0, _userMock.createUserMockProm)().then(function (mockUser) {
    return new _profile2.default({ username: mockUser.user.username, user: mockUser.user._id }).save();
  });
};

var createManyProfilesProm = function createManyProfilesProm(length) {
  return Promise.all(new Array(length).fill(0).map(function () {
    return createMockProfileProm();
  }));
};

var removeProfilesProm = function removeProfilesProm() {
  return Promise.all([_profile2.default.remove({}), (0, _userMock.removeUserMockProm)()]);
};

exports.createManyProfilesProm = createManyProfilesProm;
exports.removeProfilesProm = removeProfilesProm;