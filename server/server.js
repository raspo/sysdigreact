/* eslint no-var:0 global-require:0 */

const Express = require('express');
const path = require('path');
const http = require('http');
const favicon = require('serve-favicon');

const config = require('../config');

const app = new Express();
const server = new http.Server(app);

app.use(Express.static(path.join(__dirname, '..', 'public')));
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

if (__DEVELOPMENT__) {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webPackConfig = require('../webpack/webpack.config.dev');
  const compiler = webpack(webPackConfig);

  app.use(webpackDevMiddleware(compiler, {
    contentBase: `http://${config.host}:${config.port}`,
    noInfo: true,
    quiet: false,
    hot: true,
    inline: true,
    lazy: false,
    stats: { colors: true },
    publicPath: webPackConfig.output.publicPath,
  }));

  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    heartbeat: 10 * 1000,
  }));
}

app.use((req, res) => {
  res.render('index.html');
});

if (!config.port) {
  console.error('==> ERROR: No PORT environment variable has been specified');
  process.exit(0);
}

server.listen(config.port, (err) => {
  if (err) { console.error(err); }
  console.log('----- + -----');
  console.info('==> main server is running on port %s.', config.port);
});
