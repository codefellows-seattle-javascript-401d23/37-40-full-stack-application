'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _express = require('express');

var _profile = require('../model/profile');

var _profile2 = _interopRequireDefault(_profile);

var _bearerAuthMiddleware = require('../lib/bearer-auth-middleware');

var _bearerAuthMiddleware2 = _interopRequireDefault(_bearerAuthMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var profileRouter = new _express.Router();

profileRouter.get('/profiles', _bearerAuthMiddleware2.default, function (request, response, next) {
  return _profile2.default.find().then(function (profiles) {
    var allUsers = [];
    profiles.forEach(function (profile) {
      return allUsers.push(profile.username);
    });
    return response.json(allUsers);
  }).catch(next);
});

profileRouter.get('/profiles/me', _bearerAuthMiddleware2.default, function (request, response, next) {
  return _profile2.default.findOne({ user: request.user._id }).then(function (profile) {
    if (!profile) return next(new _httpErrors2.default(404, 'ERROR user not found'));
    return response.json(profile);
  }).catch(next);
});

exports.default = profileRouter;