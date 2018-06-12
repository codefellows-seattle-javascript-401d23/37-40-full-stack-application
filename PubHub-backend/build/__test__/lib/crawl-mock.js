'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCrawlMockNoProfileUpdateProm = exports.removeCrawlMockProm = exports.createCrawlMockProm = undefined;

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _crawl = require('../../model/crawl');

var _crawl2 = _interopRequireDefault(_crawl);

var _profile = require('../../model/profile');

var _profile2 = _interopRequireDefault(_profile);

var _userMock = require('./user-mock');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createCrawlMockProm = function createCrawlMockProm() {
  var mock = {};
  return (0, _userMock.createUserMockProm)().then(function (userMock) {
    mock.user = userMock;
    return new _profile2.default({ username: userMock.user.username, user: userMock.user._id }).save();
  }).then(function (profile) {
    mock.profile = profile;
    return new _crawl2.default({ name: _faker2.default.lorem.words(2), profile: profile._id }).save();
  }).then(function (crawl) {
    mock.crawl = crawl;
    return _profile2.default.findById(mock.profile._id);
  }).then(function (profileToUpdate) {
    profileToUpdate.crawls.push(mock.crawl._id);
    return profileToUpdate.save();
  }).then(function (updatedProfile) {
    mock.profile = updatedProfile;
    return mock;
  });
};

var createCrawlMockNoProfileUpdateProm = function createCrawlMockNoProfileUpdateProm() {
  var mock = {};
  return (0, _userMock.createUserMockProm)().then(function (userMock) {
    mock.user = userMock;
    return new _profile2.default({ username: userMock.user.username, user: userMock.user._id }).save();
  }).then(function (profile) {
    mock.profile = profile;
    return new _crawl2.default({ name: _faker2.default.lorem.words(2), profile: profile._id }).save();
  }).then(function (crawl) {
    mock.crawl = crawl;
    return mock;
  });
};

var removeCrawlMockProm = function removeCrawlMockProm() {
  return Promise.all([_crawl2.default.remove({}), (0, _userMock.removeUserMockProm)()]);
};

exports.createCrawlMockProm = createCrawlMockProm;
exports.removeCrawlMockProm = removeCrawlMockProm;
exports.createCrawlMockNoProfileUpdateProm = createCrawlMockNoProfileUpdateProm;