const path = require( 'path' );
const compression = require('compression');
const express = require('express');

// Dev middlewars
const addDevMiddlewares = (app, webpackConfig) => {
  const webpack = require( 'webpack' );
  const webpackDevMiddleware = require( 'webpack-dev-middleware' );
  const webpackHotMiddleware = require( 'webpack-hot-middleware' );
  const compiler = webpack( webpackConfig );

  const middleware = webpackDevMiddleware( compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  });

  app.use( middleware );
  app.use( webpackHotMiddleware( compiler ) );

  const fs = middleware.fileSystem;

  app.get( '*', ( req, res ) => {
    fs.readFile( path.join( compiler.outputPath, 'index.html' ), ( err, file ) => {
      if ( err ) {
        res.sendStatus( 404 );
      } else {
        const indexHTML = file.toString();
        res.send( indexHTML );
      }
    });
  });
};

// Production middlewares
const addProdMiddlewares = (app) => {
  const fs = require('fs');
  const publicPath = '/';
  const outputPath = path.resolve(process.cwd(), 'dist');

  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  app.use(compression());
  app.use(publicPath, express.static(outputPath));

  app.get('*', (req, res) => {
    fs.readFile(path.resolve(outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        const indexHtml = file.toString();
        res.send(indexHtml);
      }
    });
  });
};

module.exports = ( app ) => {
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    addProdMiddlewares(app);
  } else {
    const webpackConfig = require('../../internals/webpack/webpack.config.dev.js');
    addDevMiddlewares( app, webpackConfig );
  }

  return app;
};
