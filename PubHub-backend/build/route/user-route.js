'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _bodyParser = require('body-parser');

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _basicAuthMiddleware = require('../lib/basic-auth-middleware');

var _basicAuthMiddleware2 = _interopRequireDefault(_basicAuthMiddleware);

var _user = require('../model/user');

var _user2 = _interopRequireDefault(_user);

var _logger = require('../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _profile = require('../model/profile');

var _profile2 = _interopRequireDefault(_profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRouter = new _express.Router();
var jsonParser = (0, _bodyParser.json)();

userRouter.post('/signup', jsonParser, function (request, response, next) {
  return _user2.default.create(request.body.username, request.body.password, request.body.email).then(function (user) {
    delete request.body.password;
    _logger2.default.log(_logger2.default.INFO, 'USER - creating a TOKEN HERE');
    new _profile2.default({ username: request.body.username, user: user._id }).save();
    return user.createTokenProm();
  }).then(function (token) {
    response.cookie('token', token, { maxAge: 900000 });
    _logger2.default.log(_logger2.default.INFO, 'USER - 200 code and a Token');
    response.send(token);
  })
  // .then((token) => {
  //
  //   response.send(token);
  //   logger.log(logger.INFO, `${token}`);
  // })
  .catch(next);
});

userRouter.get('/login', _basicAuthMiddleware2.default, function (request, response, next) {
  if (!request.user) {
    return next(new _httpErrors2.default(404, 'ERROR user not found'));
  }
  return request.user.createTokenProm().then(function (token) {
    return response.json({ token: token });
  }).catch(next);
});

exports.default = userRouter;