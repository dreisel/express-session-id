# express-session-id

[![Generated with nod](https://img.shields.io/badge/generator-nod-2196F3.svg?style=flat-square)](https://github.com/diegohaz/nod)
[![NPM version](https://img.shields.io/npm/v/express-session-id.svg?style=flat-square)](https://npmjs.org/package/express-session-id)
[![Build Status](https://img.shields.io/travis/reisel/express-session-id/master.svg?style=flat-square)](https://travis-ci.org/reisel/express-session-id) [![Coverage Status](https://img.shields.io/codecov/c/github/reisel/express-session-id/master.svg?style=flat-square)](https://codecov.io/gh/reisel/express-session-id/branch/master)

An express middleware for session ID

## Install

    $ npm install --save express-session-id

## Usage

```js
import sessionId from 'express-session-id';
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser('my secret key'));
app.use(sessionId({
  idleTime: 10 * 1000 * 60, // 10 minutes
  cookie: {
    signed: true
  }
}))

app.get('/', (req, res) => {
  console.log(req.sessionID);
  /*
    Rest of the code
  */
});
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [config](#config)
-   [sessionId](#sessionid)

### config

**Properties**

-   `idleTime` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** max IdleTime
-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Name of the cookie.
-   `genId` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** function to generate id's
-   `cookie` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** cookies configurations

### sessionId

This function return a session id middleware.
The session id is placed at req.sessionID

**Parameters**

-   `options` **[config](#config)** configuration object. (optional, default `{}`)

Returns **any** an express session ID middleware.

## License

MIT © [Daniel Reisel](https://github.com/dreisel)
