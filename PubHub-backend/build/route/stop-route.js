'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _bearerAuthMiddleware = require('../lib/bearer-auth-middleware');

var _bearerAuthMiddleware2 = _interopRequireDefault(_bearerAuthMiddleware);

var _stop = require('../model/stop');

var _stop2 = _interopRequireDefault(_stop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stopRouter = new _express.Router();

stopRouter.put('/stops/votes/:id', _bearerAuthMiddleware2.default, function (request, response, next) {
  var voteTally = void 0;
  return _stop2.default.findById(request.params.id).then(function (stop) {
    voteTally = stop.votes += 1;
    var options = { runValidators: true, new: true };
    return _stop2.default.findByIdAndUpdate(request.params.id, { votes: voteTally }, options);
  }).then(function (updatedStop) {
    return response.json(updatedStop);
  }).catch(next);
});

stopRouter.delete('/stops/:id', _bearerAuthMiddleware2.default, function (request, response, next) {
  return _stop2.default.findById(request.params.id).then(function (stop) {
    return stop.remove();
  }).then(function () {
    return response.sendStatus(204);
  }).catch(next);
});

stopRouter.get('/stops/votes/:id', _bearerAuthMiddleware2.default, function (request, response, next) {
  return _stop2.default.findById(request.params.id).then(function (stop) {
    return response.json('Total votes: ' + stop.votes);
  }).catch(next);
});

exports.default = stopRouter;