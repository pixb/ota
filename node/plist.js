var optional = require("optional");

var FS = require("fs");

var C = console;

var CONFIG = require("../js/config.js");
var ERRORS = require("./errors.js");

module.exports = {
    
    canServe: function(req, res, info) {
        return info.fileSuffix === "plist";
    },
    
    serve: function plist(req, res, info) {
        // read plist
        var file = CONFIG.WEB + CONFIG.plistTMPL;
        FS.readFile(file, "utf8", function(error, text) {
            if (error) {
                C.error(info + "[ERROR] can not read file: " + file + " error: " + error);
                ERRORS["404"](req, res, info);
                return;
            }
            
            // read index
            var buildInfoFile = info.dir + "buildInfo-plist.js";
            for (var key in require.cache) {
                var lastIndex = key.lastIndexOf(buildInfoFile);
                C.log(info + "key: " + key);
                C.log(info + "buildInfoFile: " + buildInfoFile);
                C.log(info + "lastIndex: " + lastIndex);
                if (lastIndex >= 0 && lastIndex + buildInfoFile.length === key.length) {
                    C.log(info + "delete require.cache['" + key + "']")
                    delete require.cache[key];
                }
            }
            var buildIndex = optional("./" + CONFIG.WEB + buildInfoFile) || {};
            var buildInfo = buildIndex[info.fileName];
            if (!buildInfo) {
                C.error(info + "[ERROR] can not read file: " + buildInfoFile);
                ERRORS["404"](req, res, info);
                return;
            }
            
            text = text.replace(/\$\{ARCHIVE_NAME\}/g, buildInfo.appTitle);
            text = text.replace(/\$\{DESCRIPTION\}/g, buildInfo.appDescription);
            text = text.replace(/\$\{APP_VERSION\}/g, buildInfo.appVersion);
            text = text.replace(/\$\{APP_IDENTIFIER\}/g, buildInfo.appIdentifier);
            text = text.replace(/\$\{DEPLOY_IPA_URL\}/g, "http://" + req.headers.host + info.dir + info.fileName + ".ipa");
            
            res.end(text);
        });
    }
};

