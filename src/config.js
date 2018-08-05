import uuidv4 from 'uuid/v4';

/*
 SessionId default configurations.
 @param idleTime session max idle time in millie seconds.
 @param name sessionId cookie name
 @param genId method to generating ID
 @param cookie cookie options to pass to cookie
 */
export default {
  idleTime: process.env.SESSION_ID_IDLE_TIME || 30 * 1000 * 60,
  name: process.env.SESSION_ID_NAME || 's_id',
  genId: uuidv4,
  // cookie options.
  cookie: {},
};
