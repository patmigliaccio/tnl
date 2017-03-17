## Functions

<dl>
<dt><a href="#createServer">createServer(options, cb)</a></dt>
<dd><p>Starts a local server using http-server.</p>
</dd>
<dt><a href="#createTunnel">createTunnel(options, cb)</a></dt>
<dd><p>Starts a secure tunnel to a server using ngrok.</p>
</dd>
<dt><a href="#kill">kill()</a></dt>
<dd><p>Stops tunnel and server processes.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#serverCallback">serverCallback</a> : <code>function</code></dt>
<dd><p>Callback for processing after server is established.</p>
</dd>
<dt><a href="#tunnelCallback">tunnelCallback</a> : <code>function</code></dt>
<dd><p>Callback for processing after tunnel is established.</p>
</dd>
</dl>

<a name="createServer"></a>

## createServer(options, cb)
Starts a local server using http-server.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Configuration options for http-server |
| cb | <code>[serverCallback](#serverCallback)</code> | Callback function |

<a name="createTunnel"></a>

## createTunnel(options, cb)
Starts a secure tunnel to a server using ngrok.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Configuration options for ngrok |
| cb | <code>[tunnelCallback](#tunnelCallback)</code> | Callback function |

<a name="kill"></a>

## kill()
Stops tunnel and server processes.

**Kind**: global function  
<a name="serverCallback"></a>

## serverCallback : <code>function</code>
Callback for processing after server is established.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Configuration options for http-server |

<a name="tunnelCallback"></a>

## tunnelCallback : <code>function</code>
Callback for processing after tunnel is established.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Configuration options for ngrok |

