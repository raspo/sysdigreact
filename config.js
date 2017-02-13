module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  wsServer: process.env.WSHOST || 'localhost',
  wsPort: process.env.WSPORT || '3030'
});
