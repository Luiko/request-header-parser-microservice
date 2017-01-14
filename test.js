var test = require('tape');
var http = require('http');
var os = require('os');
var getIP = require('external-ip')();
test('request test', function (t) {
    t.plan(3);
    var request = http.request( {
        hostname: 'localhost',
        port: 8080,
        method: 'GET'
    }, function (res) {
        var data = "";
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            var obj = JSON.parse(data);            
            t.equal(obj['operating system'], os.type);
            t.equal(obj.language, 'en-US');
            getIP(function (err, ip) {
                if (err) return console.error(err);
                console.log(obj);
                t.equal(obj['IP address'], ip);
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