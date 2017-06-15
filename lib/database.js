const Sequelize = require('sequelize');

const host = process.env.DB_HOST || '127.0.0.1',
  port = process.env.DB_PORT || '3306',
  user = process.env.DB_USER || 'root',
  password = process.env.DB_PASSWORD,
  database = process.env.DB_DEFAULT || 'aachat';

const conx = new Sequelize(database, user, password, {
  host,
  dialect: 'mysql',
  logging: console.log
});

module.exports = conx;


