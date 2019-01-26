const express = require('express');
const cookieParser = require('cookie-parser');
const cookie = require('cookie');
const request = require('supertest');
const _ = require('lodash');
const uuid = require('uuid/v4');
const sessionId = require('../src');

const genIdMock = jest.fn();
const idleTime = 5 * 1000 * 60;
genIdMock.mockImplementation(uuid);

describe('config', () => {
  test('should throw invalid session id generator', () => {
    const badConfig = {
      genId: 1,
    };
    expect(() => sessionId(badConfig)).toThrow('genId must be a function');
  });
});
test('Cant run without cookie parser', async () => {
  const app = express();
  app.use(sessionId());
  const resp = await request(app).get('/');
  expect(resp.status).toEqual(500);
});
describe('sessionId', () => {
  let app;
  beforeEach(() => {
    app = express();
    app.use(cookieParser());
    app.use(
      sessionId({
        name: 'session_id',
        genId: genIdMock,
        idleTime,
      }),
    );
    app.get('/', (req, res) => {
      res.json({ status: 'success' });
    });
  });
  test('generates a new session', async () => {
    const response = await request(app).get('/');
    const sessionCookie = _.get(response, 'headers[set-cookie]', [])
      .map(cookie.parse)
      .find(x => x.session_id);
    expect(genIdMock).toHaveBeenCalledTimes(1);
    expect(sessionCookie).toBeDefined();
  });
  test('touch an existing session', async () => {
    const response = await request(app)
      .get('/')
      .set('Cookie', ['session_id=testing123']);
    const sessionCookie = _.get(response, 'headers[set-cookie]', [])
      .map(cookie.parse)
      .find(x => x.session_id);
    expect(Number.parseInt(sessionCookie['Max-Age'], 10) * 1000).toBe(idleTime);
    expect(sessionCookie.session_id).toBe('testing123');
  });
  test('test signed cookies', async () => {
    app = express();
    app.use(cookieParser('secret_key!'));
    app.use(
      sessionId({
        cookie: {
          signed: true,
        },
      }),
    );
    app.get('/session', (req, res) => {
      res.json({ sessionID: req.sessionID });
    });

    let response = await request(app).get('/session');
    const cookies = [null, null];
    const sessionIDs = [null, null];
    cookies[0] = _.get(response, 'headers[set-cookie]', []).find(x => x.substring(0, 4) === 's_id');
    sessionIDs[0] = _.get(response, 'body.sessionID');
    response = await request(app)
      .get('/session')
      .set('Cookie', [cookies[0]]);
    cookies[1] = _.get(response, 'headers[set-cookie]', []).find(x => x.substring(0, 4) === 's_id');
    sessionIDs[1] = _.get(response, 'body.sessionID');
    expect(sessionIDs[0]).toBeDefined();
    expect(sessionIDs[1]).toBeDefined();
    expect(sessionIDs[0]).toBe(sessionIDs[1]);
  });
});
