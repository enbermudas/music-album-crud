import mysql from 'mysql2';
import signale from 'signale';
import { Sequelize } from 'sequelize';
import config from '../../../db.config.json';

const env = process.env.NODE_ENV || 'dev';
const { user, password, database, host, port, dialect, logging } = config[env];

let sequelize = null;

export const MODE_TEST = 'mode_test';

export const MODE_PRODUCTION = 'mode_production';

export const getSequelize = () => {
  return sequelize;
};

export const db = {
  get: () => {
    return mysql.createConnection({
      user,
      password,
      database,
      host,
      port,
      dialect,
      logging
    });
  }
};

export const connect = async (mode, done) => {
  try {
    sequelize = new Sequelize({
      username: user,
      password,
      database,
      host,
      port,
      dialect,
      logging
    });

    await sequelize.authenticate();

    signale.info('Connected to the DB.');
    done();
  } catch (error) {
    signale.error('Unable to connect to DB:', error);
  }
};
