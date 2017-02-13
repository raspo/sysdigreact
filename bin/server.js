/* eslint global-require:0 */

global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

require('../server/server');
