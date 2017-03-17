# tnl: simple secure tunnel to a local directory

`tnl` is a quick and easy way to create a public url with a secure tunnel to a local directory. Utilizing [ngrok](https://ngrok.com/) and [http-server](https://github.com/indexzero/http-server), within three characters you can have your directory forwarded to the outside. Excellent for testing on mobile as well as fast feedback from clients.

![tnl Example](img/example.gif)

## Installation

Using `npm`:

     npm install tnl -g

It is now installed globally and `tnl` can be used in any directory from the command line.

## Usage

     tnl [options]

By default `[options]` are *optional*. 
For example, to change the default port and open in a new browser window immediately:

    tnl -p 7001 -o


### Using locally

     node bin/tnl


## Available Options

See [Options](docs/API.md#Options).
For a complete list of *potential* options refer to `http-server`'s [avalable options](https://www.npmjs.com/package/http-server#available-options).

