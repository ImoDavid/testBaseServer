import express from 'express';
import bodyParser from 'body-parser';
import taskRoutes from './routes/taskRoute.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger-output.json' assert { type: 'json' };
import cors from 'cors';
dotenv.config();
import connectToDB from './database/connect.js';
import loggerMiddleware from './middleware/logger.js';

const app = express();
const PORT = process.env.PORT || 3000;

//express session is needed for passport to work

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use('/api', taskRoutes);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.set('trust proxy', 1);

app.use('*', (req, res) => {
  console.log('Route not found');
  res.status(404).json(new NotFound('Requested resource not found'));
});

//middlewares
app.use(loggerMiddleware);

const startServer = async () => {
  await connectToDB(process.env.MONGODB_URI);
  console.log(`CONNECTED TO DATABASE SUCCESSFULLY.`);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.Press Ctrl+C to terminate.`);
  });
};

startServer();
export default app;
