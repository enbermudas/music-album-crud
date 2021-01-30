import mysql from 'mysql2';
import signale from 'signale';
import { Sequelize } from 'sequelize';
import { dev } from '../../../db.config.json';

let sequelize = null;

const { user, password, database, host, port, dialect } = dev;

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
      dialect
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
      dialect
    });

    await sequelize.authenticate();
    signale.info('Connected to the DB.');
    done();
  } catch (error) {
    signale.error('Unable to connect to DB:', error);
  }
};
