var express = require('express');
var app = express();
app.set('port', process.env.PORT || 8080);
app.enable('trust proxy');
app.use(function (req, res) {
    var obj = {};
    obj['IP address'] = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 
        req.socket.remoteAddress || req.ip;
    obj.language = req.headers['accept-language'].split(',')[0];
    obj['operating system'] = req.headers['user-agent'].split(/[\(\)]/)[1];
    res.send(JSON.stringify(obj));
});
app.listen(app.get('port'), function () {
    console.log('Server is listening on port', app.get('port'));
});
