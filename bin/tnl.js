#!/usr/bin/env node --harmony

'use strict';

const tnl = require('../index.js'),
    argv = require('optimist').boolean('cors').argv,
    portfinder = require('portfinder'),
    version = require('../package').version;

if (argv.v) return console.log(version);

let options = {
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
    open: argv.o
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

if (!options.port) {
    portfinder.basePort = 8080;
    portfinder.getPort((err, port) => {
        if (err) {
            throw err;
        }
        options.port = port;
        tnl.createServer(options, tnl.createTunnel);
    });
} else {
    tnl.createServer(options, tnl.createTunnel);
}

if (process.platform === 'win32') {
    require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    }).on('SIGINT', () => {
        process.emit('SIGINT');
    });
}

process.on('SIGINT', tnl.kill);
process.on('SIGTERM', tnl.kill);