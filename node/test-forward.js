module.exports = function(req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("forward forward.node to forward.js");
};

