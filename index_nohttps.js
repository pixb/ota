var C = console;
C.log("========");

// var optional = require("optional");

var HTTP = require("http");

var CONFIG = require("./js/config.js");
var ERRORS = require("./node/errors.js");

var HOST = null;
var PORT = 1337;

/**
 * !!!: return false to denial serve
 */
var servlets = [
    require("./node/plist.js"),
    require("./node/file.js")
];


HTTP.createServer(function (req, res) {
    var info = CONFIG.info(req, res);
    C.log(info + "req: " + req.url + " from: " + info.remoteAddress);
    
    for (var i = 0; i < servlets.length; i++) {
        var servlet = servlets[i];
        servlet.canServe = servlet.canServe || function(req, res, info) {
            return true;
        }
        
        if (servlet.canServe(req, res, info) && servlet.serve) {
            C.log(info + "servlet: " + servlet.serve.name);
            servlet.serve(req, res, info);
            return;
        }
    }
    
    ERRORS["404"](req, res, info);
}).listen(PORT || 1337, HOST);

C.log("Server running " + (HOST || "*") + ":" + (PORT || 1337));

