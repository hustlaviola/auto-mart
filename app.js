import express from 'express';

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to Auto-Mart',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));

export default app;
