import Sequelize from 'sequelize';
import config from '../../../db.config.json';
import album from './album';
import artist from './artist';
import song from './song';

const env = process.env.NODE_ENV || 'dev';
const { user, password, database } = config[env];

const db = {};

const sequelize = new Sequelize(database, user, password, config[env]);

db.Album = album(sequelize, Sequelize.DataTypes);
db.Artist = artist(sequelize, Sequelize.DataTypes);
db.Song = song(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
