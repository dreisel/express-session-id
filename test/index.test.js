import express from 'express';
import cookieParser from 'cookie-parser';
import cookie from 'cookie';
import request from 'supertest';
import _ from 'lodash';
import uuid from 'uuid/v4';
import sessionId from '../src';

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
    app.use(cookieParser());
    const response = await request(app).get('/');
    const sessionCookie = _.get(response, 'res.headers[set-cookie]', [])
      .map(cookie.parse)
      .find(x => x.session_id);
    expect(genIdMock).toHaveBeenCalledTimes(1);
    expect(sessionCookie).toBeDefined();
  });
  test('touch an existing session', async () => {
    app.use(cookieParser());
    const response = await request(app)
      .get('/')
      .set('Cookie', ['session_id=testing123']);
    const sessionCookie = _.get(response, 'res.headers[set-cookie]', [])
      .map(cookie.parse)
      .find(x => x.session_id);
    expect(Number.parseInt(sessionCookie['Max-Age'], 10) * 1000).toBe(idleTime);
    expect(sessionCookie.session_id).toBe('testing123');
  });
});
