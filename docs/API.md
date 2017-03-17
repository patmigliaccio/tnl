<a name="module_tnl"></a>

## tnl

* [tnl](#module_tnl)
    * _static_
        * [.createServer(options, cb)](#module_tnl.createServer) ⇒ <code>HttpServer</code>
        * [.createTunnel(options, cb)](#module_tnl.createTunnel) ⇒ <code>ngrok</code>
        * [.kill()](#module_tnl.kill)
    * _inner_
        * [~Options](#module_tnl..Options) : <code>Object</code>
        * [~ServerCallback](#module_tnl..ServerCallback) : <code>function</code>
        * [~TunnelCallback](#module_tnl..TunnelCallback) : <code>function</code>

<a name="module_tnl.createServer"></a>

### tnl.createServer(options, cb) ⇒ <code>HttpServer</code>
Starts a local server using http-server.

**Kind**: static method of <code>[tnl](#module_tnl)</code>  
**Returns**: <code>HttpServer</code> - Instance of HttpServer  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Options</code> | Configuration options for http-server |
| cb | <code>ServerCallback</code> | Callback function |

<a name="module_tnl.createTunnel"></a>

### tnl.createTunnel(options, cb) ⇒ <code>ngrok</code>
Starts a secure tunnel to a server using ngrok.

**Kind**: static method of <code>[tnl](#module_tnl)</code>  
**Returns**: <code>ngrok</code> - Instance of ngrok  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Options</code> | Configuration options for ngrok |
| cb | <code>TunnelCallback</code> | Callback function |

<a name="module_tnl.kill"></a>

### tnl.kill()
Stops tunnel and server processes.

**Kind**: static method of <code>[tnl](#module_tnl)</code>  
<a name="module_tnl..Options"></a>

### tnl~Options : <code>Object</code>
Settings for configuring HttpServer and ngrok.

**Kind**: inner typedef of <code>[tnl](#module_tnl)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| port | <code>number</code> | Port to use (defaults to `8080`) |
| host | <code>string</code> | Address to use (defaults to `'0.0.0.0'`) |
| ssl | <code>boolean</code> | Enable https |
| root | <code>string</code> | Path to local folder (defaults to ./public if the folder exists, and ./ otherwise) |
| cache | <code>number</code> | Set cache time (in seconds) for cache-control max-age header, e.g. -c10 for 10 seconds (defaults to `3600`). To disable caching, use -c-1 |
| showDir | <code>boolean</code> | Show directory listings (defaults to `true`) |
| autoIndex | <code>boolean</code> | Display autoIndex (defaults to `true`) |
| gzip | <code>boolean</code> | Serves `file.js.gz` in place of `file.js` if gzipped version exists |
| robots | <code>boolean</code> | Provide a /robots.txt (whose content is `User-agent: *\nDisallow: /`) |
| ext | <code>string</code> | Default file extension if none supplied (defaults to `'html'`) |
| proxy | <code>string</code> | Proxies all requests which can't be resolved locally to the given url |
| open | <code>boolean</code> | Opens ngrok url in browser immmediatley |
| ngrokUrl | <code>string</code> | Public url create from ngrok, added to [Options](Options) in [TunnelCallback](TunnelCallback) |

<a name="module_tnl..ServerCallback"></a>

### tnl~ServerCallback : <code>function</code>
Callback for processing after server is established.

**Kind**: inner typedef of <code>[tnl](#module_tnl)</code>  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Options</code> | Configuration options for http-server |

<a name="module_tnl..TunnelCallback"></a>

### tnl~TunnelCallback : <code>function</code>
Callback for processing after tunnel is established.

**Kind**: inner typedef of <code>[tnl](#module_tnl)</code>  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Options</code> | Configuration options for ngrok |

