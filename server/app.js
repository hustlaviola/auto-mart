import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import userRoute from './routes/userRoute';
import ErrorHandler from './utils/ErrorHandler';
import carRoute from './routes/carRoute';
import orderRoute from './routes/orderRoute';
import flagRoute from './routes/flagRoute';

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', userRoute);
app.use('/api/v1', carRoute);
app.use('/api/v1', orderRoute);
app.use('/api/v1', flagRoute);

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to Auto-Mart',
  });
});
app.all('/*', (req, res) => ErrorHandler.routeError(res));

const { PORT } = process.env;
app.listen(PORT, () => console.log(`listening on ${PORT}`));

export default app;
