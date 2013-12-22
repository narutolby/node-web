
var _c = require("./settings").controller;
var server = require("./" + _c + "/server");
var router = require("./" + _c +"/routes");
server.start(router.route);

