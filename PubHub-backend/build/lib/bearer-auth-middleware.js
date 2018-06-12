'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _user = require('../model/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var promisify = function promisify(callback) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
      callback.apply(undefined, args.concat([function (error, data) {
        if (error) return reject(error);
        return resolve(data);
      }]));
    });
  };
};

exports.default = function (req, res, next) {
  if (!req.headers.authorization) return next(new _httpErrors2.default(400, 'BEAR AUTH: Invalid Request'));
  var token = req.headers.authorization.split(' ')[1];
  if (!token) return next(new _httpErrors2.default(400, 'BEAR AUTH: Invalid Request'));
  return promisify(_jsonwebtoken2.default.verify)(token, process.env.SECRET).then(function (decryptedData) {
    return _user2.default.findOne({ tokenSeed: decryptedData.tokenSeed });
  }).then(function (user) {
    if (!user) return next(new _httpErrors2.default(400, 'BEAR AUTH: Invalid Request'));
    req.user = user;
    return next();
  }).catch(next);
};