import merge from 'lodash.merge';
import baseConfig from './config';

/**
 * This function return a session id middleware.
 * The session id is placed at req.sessionID
 * @param {config} options configuration object.
 * @returns an express session ID middleware.
 */
function sessionId(options = {}) {
  const config = merge({}, baseConfig, options);
  const cookieName = config.name;
  if (typeof config.genId !== 'function') {
    throw new Error('genId must be a function');
  }
  return (req, res, next) => {
    if (typeof req.cookies === 'undefined') {
      return next(Error('cookie parser must be set before sessionId'));
    }
    let sessionCookie = req.cookies[cookieName] || req.signedCookies[cookieName];
    if (!sessionCookie) {
      sessionCookie = config.genId();
    }
    res.cookie(cookieName, sessionCookie, { ...config.cookie, maxAge: config.idleTime });
    req.sessionID = sessionCookie;
    return next();
  };
}

export default sessionId;
