import signale from 'signale';
import server from './config/express';
import { connect, MODE_TEST } from './config/database';
import models from './models';

const port = process.env.PORT || 8080;

connect(MODE_TEST, async (err) => {
  if (err) {
    signale.info('Unable to connect to MySQL.');

    process.exit(1);
  } else {
    signale.info('Connected to MySQL.');

    await models.sequelize.sync({ alter: true });

    server.listen(port, () => {
      signale.info(`Server is running on http://localhost:${port}/api/v1`);
    });
  }
});
