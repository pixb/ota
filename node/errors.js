// http://support.google.com/webmasters/bin/answer.py?hl=en&answer=40132
module.exports = {
    "404": function(req, res, info) {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end("404 - Not found: " + req.url);
    },
    "500": function(req, res, info) {
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.end("500 - Internal server error: " + req.url);
    }
};

