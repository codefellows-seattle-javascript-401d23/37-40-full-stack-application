'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopServer = exports.startServer = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _cowsay = require('cowsay');

var _cowsay2 = _interopRequireDefault(_cowsay);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _crawlRoute = require('../route/crawl-route');

var _crawlRoute2 = _interopRequireDefault(_crawlRoute);

var _stopRoute = require('../route/stop-route');

var _stopRoute2 = _interopRequireDefault(_stopRoute);

var _userRoute = require('../route/user-route');

var _userRoute2 = _interopRequireDefault(_userRoute);

var _searchRoute = require('../route/search-route');

var _searchRoute2 = _interopRequireDefault(_searchRoute);

var _profileRoute = require('../route/profile-route');

var _profileRoute2 = _interopRequireDefault(_profileRoute);

var _loggerMiddleware = require('./logger-middleware');

var _loggerMiddleware2 = _interopRequireDefault(_loggerMiddleware);

var _errorMiddleware = require('./error-middleware');

var _errorMiddleware2 = _interopRequireDefault(_errorMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MessagingResponse = require('twilio').twiml.MessagingResponse;

var app = (0, _express2.default)();
var server = null;

app.use((0, _cors2.default)({
  origin: 'http://localhost:8080',
  credentials: true
}));
app.use(_loggerMiddleware2.default);
app.use(_searchRoute2.default);
app.use(_stopRoute2.default);
app.use(_profileRoute2.default);
app.use(_userRoute2.default);
app.use(_crawlRoute2.default);
app.get('/', function (request, response) {
  var cowsayText = _cowsay2.default.think({ text: 'Bok bok!' });
  var cowPage = '<!DOCTYPE html><html><head><title>PubHub</title></head><body><h1>Welcome to PubHub!</h1><pre>' + cowsayText + '</pre></body></html>';
  response.send(cowPage);
});

app.post('/next-stop', function (request, response) {
  var twiml = new MessagingResponse();
  twiml.message('Welcome to PubHub. Please visit our website at https://pub-hub.herokuapp.com/');
  response.writeHead(200, { 'Content-Type': 'text/xml' });
  response.end(twiml.toString());
});
app.get('/team', function (req, res) {
  return res.sendFile('/src/data/team.txt', { root: '.' });
});
app.all('*', function (request, response) {
  _logger2.default.log(_logger2.default.INFO, 'Returning 404 from catch-all route');
  return response.sendStatus(404);
});
app.use(_errorMiddleware2.default);

var startServer = function startServer() {
  return _mongoose2.default.connect(process.env.MONGODB_URI).then(function () {
    server = app.listen(process.env.PORT, function () {
      _logger2.default.log(_logger2.default.INFO, 'Server is listening on port ' + process.env.PORT);
    });
  });
};

var stopServer = function stopServer() {
  return _mongoose2.default.disconnect().then(function () {
    server.close(function () {
      _logger2.default.log(_logger2.default.INFO, 'Server is off');
    });
  });
};

exports.startServer = startServer;
exports.stopServer = stopServer;