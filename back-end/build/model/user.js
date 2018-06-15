'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSchema = _mongoose2.default.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String
  },
  profile: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'profile'
  }
});

var TOKEN_SEED_SIZE = 128;
var HASH_SALT_ROUNDS = 8;

function verifyPasswordProm(password) {
  var _this = this;

  return _bcrypt2.default.compare(password, this.passwordHash).then(function (result) {
    if (!result) {
      throw new _httpErrors2.default(401, '___AUTH___ incorrect username or password');
    }
    return _this;
  });
}

function createTokenProm() {
  this.tokenSeed = _crypto2.default.randomBytes(TOKEN_SEED_SIZE).toString('hex');

  return this.save().then(function (user) {
    return _jsonwebtoken2.default.sign({ token: user.tokenSeed }, process.env.SECRET);
  });
}

userSchema.methods.verifyPasswordProm = verifyPasswordProm;
userSchema.methods.createTokenProm = createTokenProm;

var User = _mongoose2.default.model('user', userSchema);

User.create = function (username, password, email) {
  return _bcrypt2.default.hash(password, HASH_SALT_ROUNDS).then(function (passwordHash) {
    var tokenSeed = _crypto2.default.randomBytes(TOKEN_SEED_SIZE).toString('hex');
    return new User({
      username: username,
      passwordHash: passwordHash,
      email: email,
      tokenSeed: tokenSeed
    }).save();
  });
};

exports.default = User;