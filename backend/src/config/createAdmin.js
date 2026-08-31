// Creates (or updates) an admin user. Run with: npm run create-admin
// Uses env vars if set, otherwise falls back to sensible defaults.
require('dotenv').config();
const bcrypt = require('bcryptjs');
const sequelize = require('./db');
const { User } = require('../models');

const NAME = process.env.ADMIN_NAME || 'Admin';
const EMAIL = process.env.ADMIN_EMAIL || 'admin@evently.com';
const PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

(async () => {
  try {
    await sequelize.sync(); // make sure tables exist
    const passwordHash = await bcrypt.hash(PASSWORD, 10);

    const [user, created] = await User.findOrCreate({
      where: { email: EMAIL },
      defaults: { name: NAME, passwordHash, role: 'admin' },
    });

    if (!created) {
      user.passwordHash = passwordHash;
      user.role = 'admin';
      await user.save();
      console.log(`Updated existing user to admin: ${EMAIL}`);
    } else {
      console.log(`Created admin user: ${EMAIL}`);
    }
    console.log(`Log in with: ${EMAIL} / ${PASSWORD}`);
    process.exit(0);
  } catch (err) {
    console.error('Failed to create admin:', err);
    process.exit(1);
  }
})();
