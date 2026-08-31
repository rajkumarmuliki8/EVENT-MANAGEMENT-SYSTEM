require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/db');
require('./models'); // register associations

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');
    app.listen(PORT, () => {
      console.log(`Evently backend running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err.message);
    process.exit(1);
  }
}

start();
