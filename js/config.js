var URL = require("url");

// info.ID
var ID = 0;

var numToString = function(num, length, prefix) {
    num = (num || 0) + "";
    prefix = prefix || "0";
    while(num.length < length) {
        num = prefix + num;
    }
    return num;
};
var timestamp = function() {
    var date = new Date();
    var dateString = [numToString(date.getFullYear(), 4), numToString(date.getMonth(), 2), numToString(date.getDate(), 2)].join("-");
    var timeString = [numToString(date.getHours(), 2), numToString(date.getMinutes(), 2), numToString(date.getSeconds(), 2)].join(":");
    return dateString + " " + timeString + "." + numToString(date.getMilliseconds(), 3);
};
        
module.exports = {
    WEB: "web",
    
    plistTMPL: "/ota/sh/template-ota.plist",
    
    info: function(req, res) {
        // info.path
        var path = URL.parse(req.url).pathname;
        
        var slash = "/";
        var dot = ".";
        var lastIndex = - 1;
        
        lastIndex = path.lastIndexOf(slash);
        if (lastIndex >= 0 && lastIndex === path.length - slash.length) {
            path += "index.html"
        }
        
        lastIndex = path.lastIndexOf(slash);
        // info.dir
        var dir = (lastIndex >= 0) ? path.substring(0, lastIndex + slash.length) : slash;
        // info.file
        var file = (lastIndex >= 0) ? path.substring(lastIndex + slash.length) : path;
        
        lastIndex = file.lastIndexOf(dot);
        // info.fileName
        var fileName = (lastIndex >= 0) ? file.substring(0, lastIndex) : file;
        // info.fileSuffix
        var fileSuffix = (lastIndex >= 0) ? file.substring(lastIndex + dot.length) : "";
        
        // info.remoteAddress
        var remoteAddress = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        
        return {
            id:             ID++,
            path:           path,
            dir:            dir,
            file:           file,
            fileName:       fileName,
            fileSuffix:     fileSuffix,
            remoteAddress:  remoteAddress,
            toString:       function logPrefix() {
                return timestamp() + " " + numToString(this.id, 8, " ") + " ";
            }
        };
    }
};

