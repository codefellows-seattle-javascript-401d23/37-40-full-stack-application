'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _profile = require('./profile');

var _profile2 = _interopRequireDefault(_profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crawlSchema = _mongoose2.default.Schema({
  stops: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'stop'
  }],
  votes: {
    type: Number,
    default: 0
  },
  name: {
    type: String
  },
  profile: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'profile'
  }
});

function removePostHook(document, next) {
  _profile2.default.findById(document.profile).then(function (profileFound) {
    if (!profileFound) throw new _httpErrors2.default(500, 'Profile not found');
    profileFound.crawls = profileFound.crawls.filter(function (crawl) {
      return crawl._id.toString() !== document._id.toString();
    });
    profileFound.save();
  }).then(next).catch(next);
}

crawlSchema.post('remove', removePostHook);

exports.default = _mongoose2.default.model('crawl', crawlSchema);