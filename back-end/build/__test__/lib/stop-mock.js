'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeStopMockProm = exports.createStopMockProm = undefined;

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _stop = require('../../model/stop');

var _stop2 = _interopRequireDefault(_stop);

var _crawlMock = require('./crawl-mock');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createStopMockProm = function createStopMockProm() {
  var mock = {};
  return (0, _crawlMock.createCrawlMockProm)().then(function (mockObject) {
    mock.user = mockObject.user;
    mock.profile = mockObject.profile;
    mock.crawl = mockObject.crawl;
    return new _stop2.default({
      crawl: mockObject.crawl._id,
      locationName: _faker2.default.lorem.words(3),
      latitude: _faker2.default.random.number(),
      longitude: _faker2.default.random.number(),
      address: _faker2.default.random.words(5)
    }).save();
  }).then(function (newStop) {
    mock.stop = newStop;
    return mock;
  });
};

var removeStopMockProm = function removeStopMockProm() {
  return Promise.all([_stop2.default.remove({}), (0, _crawlMock.removeCrawlMockProm)()]);
};

exports.createStopMockProm = createStopMockProm;
exports.removeStopMockProm = removeStopMockProm;