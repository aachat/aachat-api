const Koa = require('koa'),
  app = new Koa(),
  models = require('./lib/models'),
  sequelize = models.sequelize,
  RestQl = require('koa-restql'),
  restql = new RestQl(sequelize.models),
  convert = require('koa-convert');

// Convert generators implementation of restql to async
app.use(convert(restql.routes()));

module.exports = app;

