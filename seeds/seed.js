const sequelize = require('../config/connection');
const { Role } = require('../models');

const roleData = require('./roleData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

 await Role.bulkCreate(roleData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
