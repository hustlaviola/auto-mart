import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import userRoute from './routes/userRoute';
import ErrorHandler from './utils/ErrorHandler';

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', userRoute);

app.all('/*', (req, res) => ErrorHandler.routeError(res));

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to Auto-Mart',
  });
});

const { PORT } = process.env;
app.listen(PORT, () => console.log(`listening on ${PORT}`));

export default app;
