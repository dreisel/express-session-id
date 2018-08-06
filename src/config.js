import uuidv4 from 'uuid/v4';

const config = {
  idleTime: process.env.SESSION_ID_IDLE_TIME || 30 * 1000 * 60,
  name: process.env.SESSION_ID_NAME || 's_id',
  genId: uuidv4,
  // cookie options.
  cookie: {},
};

export default config;
