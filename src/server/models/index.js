import Sequelize from 'sequelize';
import path from 'path';
import fs from 'fs';
import config from '../../../db.config.json';

const basename = path.basename(__filename);

const env = process.env.NODE_ENV || 'dev';
const { user, password, database } = config[env];

const db = {};

const sequelize = new Sequelize(database, user, password, config);

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
