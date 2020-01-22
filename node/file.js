var optional = require("optional");

var FS = require("fs");

var C = console;

var MIME = require("MIME");
var CONFIG = require("../js/config.js");
var ERRORS = require("./errors.js");

module.exports = {
    
    /*
    canServe: function(req, res, info) {
        return true;
    }, */
    
    serve: function file(req, res, info) {
        var file = CONFIG.WEB + info.path;
        FS.readFile(file, function(error, data) {
            if (error) {
                C.error(info + "[ERROR] can not read file: " + file + " error: " + error);
                ERRORS["404"](req, res, info);
            }
            
            var headers = {};
            var dot = ".";
            var lastIndex = file.lastIndexOf(dot);
            if (lastIndex >= 0) {
                var fileExtension = file.substring(lastIndex + dot.length);
		C.log("===========fileExtension:",fileExtension);
                if(fileExtension == "apk"){
                    headers["Content-Type"]="application/vnd.android.package-archive";
                }else if(fileExtension == "ipa"){
                    headers["Content-Type"]="application/vnd.iphone";
                }else if(fileExtension == "ico"){
                    headers["Content-Type"]="image/vnd.microsoft.icon";
                }else{
                    headers["Content-Type"] = MIME[fileExtension];
                }
                C.log(info + "res: " + file + " [" + (MIME[fileExtension] || "unknown") + "]");
            }
            res.writeHead(200, headers);
            
            res.end(data);
        });
    }
};

