var tnl = require('..'),
    request = require('request');

var port = 8080;

before(function(done) {
    tnl.silence();
    done();
});

after(function(done) {
    tnl.kill();
    done();
});

describe('create local http server', function() {
    var server;

    before(function(done) {
        tnl.createServer(null, function() {
            done();
        });
    });

    describe('making request to local server', function() {
        var response;

        before(function(done) {
            request.get('http://127.0.0.1:' + port, function(err, res) {
                response = res;
                done(err);
            });
        });

        it('should return 200 success status code', function() {
            assert.equal(response.statusCode, 200);
        });
    });
});

describe('create public tunnel', function() {
    var tunnel,
        publicUrl;

    before(function(done) {
        tnl.createTunnel(null, function(options) {
            publicUrl = options.publicUrl;
            done();
        });
    });

    describe('making request to public url', function() {
        var response;

        before(function(done) {
            request.get(publicUrl, function(err, res) {
                response = res;
                done(err);
            });
        });

        it('should return 200 success status code', function() {
            assert.equal(response.statusCode, 200);
        });
    });
});