'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _crawl = require('../model/crawl');

var _crawl2 = _interopRequireDefault(_crawl);

var _logger = require('../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _profile = require('../model/profile');

var _profile2 = _interopRequireDefault(_profile);

var _bearerAuthMiddleware = require('../lib/bearer-auth-middleware');

var _bearerAuthMiddleware2 = _interopRequireDefault(_bearerAuthMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crawlRouter = new _express.Router();

crawlRouter.get('/crawls', _bearerAuthMiddleware2.default, function (request, response, next) {
  return _crawl2.default.find().then(function (crawls) {
    var crawlInfo = [];
    crawls.forEach(function (crawl) {
      return crawlInfo.push({ name: crawl.name, id: crawl._id });
    });
    return response.json(crawlInfo);
  }).catch(next);
});

crawlRouter.put('/crawls/votes/:id', _bearerAuthMiddleware2.default, function (request, response, next) {
  var votesCounter = void 0;
  return _crawl2.default.findById(request.params.id).then(function (crawl) {
    votesCounter = crawl.votes += 1;
    var options = { runValidators: true, new: true };
    return _crawl2.default.findByIdAndUpdate(request.params.id, { votes: votesCounter }, options);
  }).then(function (updatedCrawl) {
    _logger2.default.log(_logger2.default.INFO, 'updated Crawl ' + updatedCrawl);
    return response.json(updatedCrawl);
  }).catch(next);
});

crawlRouter.get('/crawls/votes/:id', _bearerAuthMiddleware2.default, function (request, response, next) {
  return _crawl2.default.findById(request.params.id).then(function (crawl) {
    return response.json('Total votes: ' + crawl.votes);
  }).catch(next);
});

crawlRouter.get('/crawls/:username', _bearerAuthMiddleware2.default, function (request, response, next) {
  return _profile2.default.findOne({ username: request.params.username }).then(function (profile) {
    return _crawl2.default.find({ profile: profile._id });
  }).then(function (foundCrawls) {
    var crawls = [];
    _logger2.default.log(_logger2.default.INFO, 'Found crawl: ' + foundCrawls);
    foundCrawls.forEach(function (crawl) {
      return crawls.push({ name: crawl.name, id: crawl._id });
    });
    return response.json(crawls);
  }).catch(next);
});

crawlRouter.delete('/crawls/:id', _bearerAuthMiddleware2.default, function (request, response, next) {
  return _crawl2.default.findById(request.params.id).then(function (crawl) {
    return crawl.remove();
  }).then(function () {
    _logger2.default.log(_logger2.default.INFO, 'successful DELETE should return 204 here');
    return response.sendStatus(204);
  }).catch(next);
});

crawlRouter.put('/crawls/:username/:id/:name', _bearerAuthMiddleware2.default, function (request, response, next) {
  return _profile2.default.findOne({ username: request.params.username }).then(function (profile) {
    profile.crawls.push(request.params.id);
    return profile.save();
  }).then(function (updatedProfile) {
    var options = { runValidators: true, new: true };
    return _crawl2.default.findByIdAndUpdate(request.params.id, { profile: updatedProfile._id, name: request.params.name }, options);
  }).then(function (updatedCrawl) {
    _logger2.default.log(_logger2.default.INFO, 'Updated crawl: ' + updatedCrawl);
    return response.json(updatedCrawl);
  }).catch(next);
});

crawlRouter.get('/crawls/:username/:id', _bearerAuthMiddleware2.default, function (request, response, next) {
  var profile = void 0;
  return _profile2.default.findOne({ username: request.params.username }).then(function (returnedProfile) {
    profile = returnedProfile;
    return _crawl2.default.findById(request.params.id);
  }).then(function (foundCrawl) {
    if (profile.crawls.indexOf(foundCrawl._id) < 0) {
      return next(new _httpErrors2.default(400, 'ERROR no crawl associated with user'));
    }
    _logger2.default.log(_logger2.default.INFO, 'Found crawl: ' + foundCrawl);
    return response.json(foundCrawl);
  }).catch(next);
});

exports.default = crawlRouter;