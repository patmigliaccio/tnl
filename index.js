#!/usr/bin/env node --harmony

'use strict';

const 	ngrok		= require('ngrok'),
		httpServer 	= require('http-server'),
		opener     	= require('opener'),
		os			= require('os'),
		colors		= require('colors');

const ifaces = os.networkInterfaces();

/**
 * Callback for processing after server is established.
 *
 * @callback serverCallback
 * @param {object} options - Configuration options for http-server
 */

/**
 * Starts a local server using http-server.
 * 
 * @param {object} options Configuration options for http-server
 * @param {serverCallback} cb - Callback function
 */
function createServer(options, cb){
	let port = options.port || 8080,
		host = options.host,
		ssl = options.ssl;

	let server = httpServer.createServer(options);
  	server.listen(port, host, () => {
		let canonicalHost = host === '0.0.0.0' ? '127.0.0.1' : host,
			protocol      = ssl ? 'https://' : 'http://';

		console.log(['Starting up http-server, serving '.yellow,
			server.root.cyan,
			ssl ? (' through'.yellow + ' https'.cyan) : '',
			'\nAvailable on:'.yellow
		].join(''));

		if (host && host !== '0.0.0.0') {
			console.log(('  ' + protocol + canonicalHost + ':' + port.toString()).green);
		} else {
			Object.keys(ifaces).forEach(dev => {
				ifaces[dev].forEach(details => {
					if (details.family === 'IPv4') {
						console.log(('  ' + protocol + details.address + ':' + port.toString()).green);

						if (details.address === '127.0.0.1') {
							console.log(('  ' + protocol + 'localhost:' + port.toString()).green);
						}
					}
				});
			});
		}

		if (typeof proxy === 'string') {
			console.log('Unhandled requests will be served from: ' + proxy);
		}

		if (typeof cb === "function") cb(options);
  	});
}

/**
 * Callback for processing after tunnel is established.
 *
 * @callback tunnelCallback
 * @param {object} options - Configuration options for ngrok
 */

/**
 * Starts a secure tunnel to a server using ngrok.
 * 
 * @param {object} options - Configuration options for ngrok
 * @param {tunnelCallback} cb - Callback function
 */
function createTunnel(options, cb) {
	let opts = {
		addr: options.port || 8080
	};

	ngrok.connect(opts, (err, url) => {
		if (err) { throw err; }

		console.log([
			'Starting up ngrok, exposing on port '.yellow + opts.addr.toString().cyan,
			'  ' + url.green
		].join('\n'));

		console.log('Hit CTRL-C to stop the server and tunnel');
		if (options.open) {
			opener(url, {
				command: options.open !== true ? options.open : null
			});
		}

		options.ngrokUrl = url;

		if (typeof cb === "function") cb(options);
	});
}

/**
 * Stops tunnel and server processes.
 * 
 */
function kill(){
	console.log('ngrok stopped.'.red);
	ngrok.kill();
	console.log('http-server stopped.'.red);
	process.exit();
}

module.exports = {
	createServer: createServer,
	createTunnel: createTunnel,
	kill: kill
};