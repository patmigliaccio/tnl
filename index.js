#!/usr/bin/env node --harmony

'use strict';

const ngrok = require('ngrok'),
    httpServer = require('http-server'),
    os = require('os'),
    colors = require('colors');

const ifaces = os.networkInterfaces(),
    noop = function() {};

let log = console.log;

/**
 * @module tnl
 */

/**
 * Settings for configuring HttpServer and ngrok.
 * @typedef {Object} Options
 * @property {number} port - Port to use (defaults to `8080`)
 * @property {string} host - Address to use (defaults to `'0.0.0.0'`)
 * @property {boolean} ssl - Enable https
 * @property {string} root - Path to local folder (defaults to ./public if the folder exists, and ./ otherwise)
 * @property {number} cache - Set cache time (in seconds) for cache-control max-age header, e.g. -c10 for 10 seconds (defaults to `3600`). To disable caching, use -c-1
 * @property {boolean} showDir - Show directory listings (defaults to `true`)
 * @property {boolean} autoIndex - Display autoIndex (defaults to `true`)
 * @property {boolean} gzip - Serves `file.js.gz` in place of `file.js` if gzipped version exists
 * @property {boolean} robots - Provide a /robots.txt (whose content is `User-agent: *\nDisallow: /`)
 * @property {string} ext - Default file extension if none supplied (defaults to `'html'`)
 * @property {string} proxy - Proxies all requests which can't be resolved locally to the given url
 * @property {boolean} open - Opens ngrok url in browser immmediatley
 * @property {string} publicUrl - Public url created from ngrok, added to {@link Options} in {@link TunnelCallback}
 */

/**
 * Starts a local server using http-server.
 * 
 * @static
 * @param {Options} options Configuration options for http-server
 * @param {ServerCallback} cb - Callback function
 * @returns {HttpServer} Instance of HttpServer
 */
function createServer(options, cb) {
    let port = options.port || 8080,
        host = options.host,
        ssl = options.ssl;

    let server = httpServer.createServer(options);
    server.listen(port, host, () => {
        let canonicalHost = host === '0.0.0.0' ? '127.0.0.1' : host,
            protocol = ssl ? 'https://' : 'http://';

        log(['Starting up http-server, serving '.yellow,
            server.root.cyan,
            ssl ? (' through'.yellow + ' https'.cyan) : '',
            '\nAvailable on:'.yellow
        ].join(''));

        if (host && host !== '0.0.0.0') {
            log(('  ' + protocol + canonicalHost + ':' + port.toString()).green);
        } else {
            Object.keys(ifaces).forEach(dev => {
                ifaces[dev].forEach(details => {
                    if (details.family === 'IPv4') {
                        log(('  ' + protocol + details.address + ':' + port.toString()).green);

                        if (details.address === '127.0.0.1') {
                            log(('  ' + protocol + 'localhost:' + port.toString()).green);
                        }
                    }
                });
            });
        }

        if (typeof proxy === 'string') {
            log('Unhandled requests will be served from: ' + proxy);
        }

        if (typeof cb === "function") cb(options);
    });

    return server;
}

/**
 * Callback for processing after server is established.
 *
 * @callback ServerCallback
 * @param {Options} options - Configuration options for http-server
 */

/**
 * Starts a secure tunnel to a server using ngrok.
 * 
 * @static
 * @param {Options} options - Configuration options for ngrok
 * @param {TunnelCallback} cb - Callback function
 * @returns {ngrok} Instance of ngrok
 */
function createTunnel(options, cb) {
    let opts = {
        addr: options.port || 8080
    };

    ngrok.connect(opts, (err, url) => {
        if (err) {
            throw err;
        }

        log([
            'Starting up ngrok, exposing on port '.yellow + opts.addr.toString().cyan,
            '  ' + url.green
        ].join('\n'));

        options.publicUrl = url;

        if (typeof cb === "function") cb(options, url);
    });

    return ngrok;
}

/**
 * Callback for processing after tunnel is established.
 *
 * @callback TunnelCallback
 * @param {Options} options - Configuration options for ngrok
 * @param {string} url - Public ngrok url that server is forwarded to
 */

/**
 * Stops tunnel and server processes.
 * 
 * @static
 */
function kill() {
    log('ngrok stopped.'.red);
    ngrok.kill();
    log('http-server stopped.'.red);
    process.exit();
}

/**
 * Suppresses logging by setting 'log' function to 'noop' (no operation)
 * 
 * @static
 * @param {boolean} silent - *Optional* `false` turns logging back on (defaults to `true`)
 */
function silence(silent) {
    if (silent !== false) {
        log = noop;
    } else {
        log = console.log;
    }
}

module.exports = exports = {
    createServer: createServer,
    createTunnel: createTunnel,
    kill: kill,
    silence: silence
};