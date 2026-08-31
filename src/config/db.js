const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

// SQLite -- a single local file, no separate database server required.
// The file is created automatically the first time you run `npm run db:sync`.
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', '..', 'evently.sqlite'),
  logging: false,
});

module.exports = sequelize;
