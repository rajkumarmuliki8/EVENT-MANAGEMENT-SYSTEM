// Run with: npm run db:sync
// Creates/updates all tables based on the Sequelize models.
require('dotenv').config();
const sequelize = require('./db');
require('../models'); // registers all models + associations

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Failed to sync database:', err);
    process.exit(1);
  }
})();
