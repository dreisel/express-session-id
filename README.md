# express-session-id

[![Generated with nod](https://img.shields.io/badge/generator-nod-2196F3.svg?style=flat-square)](https://github.com/diegohaz/nod)
[![NPM version](https://img.shields.io/npm/v/express-session-id.svg?style=flat-square)](https://npmjs.org/package/express-session-id)
[![Build Status](https://img.shields.io/travis/dreisel/express-session-id/master.svg?style=flat-square)](https://travis-ci.org/dreisel/express-session-id) [![Coverage Status](https://img.shields.io/codecov/c/github/dreisel/express-session-id/master.svg?style=flat-square)](https://codecov.io/gh/dreisel/express-session-id/branch/master)

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

-   [sessionId](#sessionid)

### sessionId

This function return a session id middleware.
The session id is placed at req.sessionID

**Parameters**

-   `options` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**  (optional, default `{}`)
    -   `options.idleTime` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** max idle time before destroying a session. env: SESSION_ID_IDLE_TIME (optional, default `(30*1000*60)`)
    -   `options.name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Name of the cookie. env: SESSION_ID_NAME (optional, default `s_id`)
    -   `options.genId` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** function to generate id's. see [uuid/v4](https://www.npmjs.com/package/uuid) (optional, default `uuid/v4`)
    -   `options.cookie` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** config to pass to cookies. see [cookie](https://www.npmjs.com/package/cookie) (optional, default `{}`)

## License

MIT © [Daniel Reisel](https://github.com/dreisel)
