import uuidv4 from 'uuid/v4';

/**
 * @namespace
 * @property {number}   idleTime            - max IdleTime
 * @property {string}   name                - Name of the cookie.
 * @property {function} genId               - function to generate id's
 * @property {object}   cookie              - cookies configurations
 */
const config = {
  idleTime: process.env.SESSION_ID_IDLE_TIME || 30 * 1000 * 60,
  name: process.env.SESSION_ID_NAME || 's_id',
  genId: uuidv4,
  // cookie options.
  cookie: {},
};

export default config;
