var express = require('express');
var app = express();
app.set('port', process.env.PORT || 8080);
app.enable('trust proxy');
app.use(function (req, res) {
    var obj = {};
    obj['IP address'] = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 
        req.socket.remoteAddress || req.ip;
    if (req.headers['accept-language']) {
        obj.language = req.headers['accept-language'].split(',')[0];
    }
    if (req.headers['user-agent']) {
        obj['operating system'] = req.headers['user-agent'].split(/[\(\)]/)[1];   
    }
    //res.writeHead(200, { 'Content-Type': 'application/json' });
    //res.end(JSON.stringify(obj));

    //res.setHeader('Content-Type', 'application/json');
    //res.send(JSON.stringify(obj));

    res.json(obj);
});
app.listen(app.get('port'), function () {
    console.log('Server is listening on port', app.get('port'));
});
