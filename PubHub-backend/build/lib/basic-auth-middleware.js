'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _user = require('../model/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res, next) {
  if (!req.headers.authorization) return next(new _httpErrors2.default(400, 'Invalid Request'));
  var base64AuthHeader = req.headers.authorization.split(' ')[1];
  if (!base64AuthHeader) return next(new _httpErrors2.default(400, 'Invalid Request'));
  var stringAuthHeader = Buffer.from(base64AuthHeader, 'base64').toString();

  var _stringAuthHeader$spl = stringAuthHeader.split(':'),
      _stringAuthHeader$spl2 = _slicedToArray(_stringAuthHeader$spl, 2),
      username = _stringAuthHeader$spl2[0],
      password = _stringAuthHeader$spl2[1];

  if (!username || !password) return next(new _httpErrors2.default(400, 'Invalid Request'));
  return _user2.default.findOne({ username: username }).then(function (user) {
    if (!user) return next(new _httpErrors2.default(400, 'Invalid Request'));
    return user.verifyPasswordProm(password).then(function (verifiedUser) {
      req.user = verifiedUser;
      return next();
    }).catch(next);
  });
};