import express from 'express';
import router from './server/routes/router';

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);

app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to Auto-Mart',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));

export default app;
