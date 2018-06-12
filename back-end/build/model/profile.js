'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var profileSchema = _mongoose2.default.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  crawls: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'crawl'
  }]
});

exports.default = _mongoose2.default.model('profile', profileSchema);