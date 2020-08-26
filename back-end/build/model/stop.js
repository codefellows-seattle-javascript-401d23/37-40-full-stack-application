'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _crawl = require('./crawl');

var _crawl2 = _interopRequireDefault(_crawl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stopSchema = _mongoose2.default.Schema({
  crawl: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    required: true,
    ref: 'crawl'
  },
  locationName: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  votes: {
    type: Number,
    default: 0
  }
});

function savePreHook(done) {
  var _this = this;

  return _crawl2.default.findById(this.crawl).then(function (crawlFound) {
    if (!crawlFound) throw new _httpErrors2.default(404, 'Crawl not found');
    crawlFound.stops.push(_this._id);
    return crawlFound.save();
  }).then(function () {
    return done();
  }).catch(done);
}

function removePostHook(document, next) {
  _crawl2.default.findById(document.crawl).then(function (crawlFound) {
    if (!crawlFound) throw new _httpErrors2.default(500, 'Crawl not found');
    crawlFound.stops = crawlFound.stops.filter(function (stop) {
      return stop._id.toString() !== document._id.toString();
    });
    crawlFound.save();
  }).then(next).catch(next);
}

// event listeners
stopSchema.pre('save', savePreHook);
stopSchema.post('remove', removePostHook);

exports.default = _mongoose2.default.model('stop', stopSchema);