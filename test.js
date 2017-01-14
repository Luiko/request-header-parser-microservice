var test = require('tape');
var http = require('http');
var os = require('os');
var getIP = require('external-ip');
test('request test', function (t) {
    t.plan(3);
    var request = http.request( {
        hostname: 'localhost',
        port: 8080,
        method: 'GET'
    }, function (res) {
        res.setEncoding('utf8');
        var data = "";
        res.on('data', function (chunk) {
            data +="chunk";
        });
        res.on('end', function () {
            var obj = JSON.parse(data);            
            t.equal(os.type, obj['operating system']);
            t.equal('en', obj.language);
            getIP(function (err, ip) {
                if (err) return console.error(err);
                t.equal(ip, obj['IP address']);
            });
        });
        res.on('error', function (err) {
            console.error(err);
        });
    });
    request.on('error', function (err) {
        console.error(err);
    });
    request.end();
});