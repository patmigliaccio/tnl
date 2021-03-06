#!/usr/bin/env node

'use strict';

var tnl = require('../index.js'),
    argv = require('optimist').boolean('cors').argv,
    portfinder = require('portfinder'),
    opener = require('opener'),
    clipboardy = require('clipboardy'),
    colors = require('colors'),
    version = require('../package').version;

if (argv.v) return console.log(version);

var options = {
    port: argv.p || parseInt(process.env.PORT, 10),
    host: argv.a || '0.0.0.0',
    ssl: !!argv.S || !!argv.ssl,
    root: argv._[0],
    cache: argv.c,
    showDir: argv.d,
    autoIndex: argv.i,
    gzip: argv.g || argv.gzip,
    robots: argv.r || argv.robots,
    ext: argv.e || argv.ext,
    proxy: argv.P || argv.proxy,
    open: argv.o,
    ngrokCopy: argv.n || argv.ncopy
};

if (argv.cors) {
    options.cors = true;
    if (typeof argv.cors === 'string') {
        options.corsHeaders = argv.cors;
    }
}

if (options.ssl) {
    options.https = {
        cert: argv.C || argv.cert || 'cert.pem',
        key: argv.K || argv.key || 'key.pem'
    };
}

if (argv.s || argv.silent) {
    options.silent = true;
    tnl.silence();
}

if (!options.port) {
    portfinder.basePort = 8080;
    portfinder.getPort(function(err, port) {
        if (err) {
            throw err;
        }
        options.port = port;
        tnl.createServer(options, createTunnel);
    });
} else {
    tnl.createServer(options, createTunnel);
}

function createTunnel(options) {
    tnl.createTunnel(options, function(options, url) {
        if (options.ngrokCopy) {
            console.log('Copied the ngrok URL to clipboard.'.blue);
            clipboardy.writeSync(url);
        }
        
        if (options.open) {
            opener(url, {
                command: options.open !== true ? options.open : null
            });
        }

        if (!options.silent) console.log('Hit CTRL-C to stop the server and tunnel.');
    });
}

if (process.platform === 'win32') {
    require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    }).on('SIGINT', function() {
        process.emit('SIGINT');
    });
}

function kill() {
    tnl.kill();
    process.exit();
}

process.on('SIGINT', kill);
process.on('SIGTERM', kill);