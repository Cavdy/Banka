"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _debug = _interopRequireDefault(require("debug"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swagger = _interopRequireDefault(require("../swagger"));

var _register = _interopRequireDefault(require("./routes/register"));

var _createStaffs = _interopRequireDefault(require("./routes/createStaffs"));

var _login = _interopRequireDefault(require("./routes/login"));

var _createAccount = _interopRequireDefault(require("./routes/createAccount"));

var _transaction = _interopRequireDefault(require("./routes/transaction"));

var _users = _interopRequireDefault(require("./routes/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// instantiate expressjs
var app = (0, _express["default"])();
var PORT = process.env.PORT || 5900;
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
})); // swagger

app.use('/api-docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swagger["default"]));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}); // Index Route

app.get('/', function (req, res) {
  res.send('welcome to Banka API');
});

var checkToken = function checkToken(req, res, next) {
  var header = req.headers.authorization;

  if (typeof header !== 'undefined') {
    var bearer = header.split(' ');
    var token = bearer[1];
    req.token = token;
    next();
  } else {
    // If header is undefined return Forbidden (403)
    res.sendStatus(403);
  }
}; // creating the api version route


app.use('/api/auth/signup', _register["default"]);
app.use('/api/auth/signin', _login["default"]);
app.use('/api/auth/addstaff', checkToken, _createStaffs["default"]);
app.use('/api/v1/accounts', checkToken, _createAccount["default"]);
app.use('/api/v1/transactions', checkToken, _transaction["default"]);
app.use('/api/v1/users', checkToken, _users["default"]); // listening to our port

app.listen(PORT, function () {
  (0, _debug["default"])('server')("server running on port: ".concat(PORT));
});
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=app.js.map