import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import routes from '../routes';

const app = express();

// Logger
app.use(
  morgan('dev', {
    skip: (req, res) => res.statusCode < 400 || process.env === 'test',
    stream: process.stderr
  })
);

app.use(
  morgan('dev', {
    skip: (req, res) => res.statusCode >= 400 || process.env === 'test',
    stream: process.stdout
  })
);

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/v1', routes);

export default app;
