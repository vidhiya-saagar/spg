const knex = require('knex');
const knexConfig = require('../../knexfile');

const environment = process.env.NODE_ENV || 'development';
const connectionConfig = knexConfig[environment];

const db = knex(connectionConfig);

module.exports = db;
