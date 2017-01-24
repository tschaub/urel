# `urel`

[![Greenkeeper badge](https://badges.greenkeeper.io/tschaub/urel.svg)](https://greenkeeper.io/)

Get the relative URL between two root-relative URLs.

## Setup

If you use a module bundler like [Browserify](http://browserify.org/), you can install `urel` with `npm`.

In your project root:

    npm install urel --save

In one of your application modules:

```js
var relative = require('urel');
```

## Examples

See the [`test.js`](./test.js) module for more details on what to expect.  Here are a few examples.

```js
relative('/common/dir/foo.html', '/common/dir/bar.html'); // './bar.html'
relative('/common/dir/foo.html', '/common/bar.html');     // '../bar.html'
relative('/common/foo.html', '/common/dir/bar.html');     // './dir/bar.html'
```

Note that this module currently only works with root-relative URLs (e.g. `'/example/path.html'`) and not absolute URLs (e.g. `'http://example.com/example/path.html'`).  If you'd like to see it work with absolute URLs, please submit a pull request.

[![Build Status](https://travis-ci.org/tschaub/urel.svg?branch=master)](https://travis-ci.org/tschaub/urel)
