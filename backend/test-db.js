import sequelize from './config/db.js';

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ DB connection successful');
  } catch (err) {
    console.error('❌ DB connection failed:', err);
  }
})();
