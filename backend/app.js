import express from 'express';
import router from './src/routes/bookRoutes.js';
import 'dotenv/config';

const app = express();

app.use(express.json());

app.use(router);

app.use((req, res) => {
  res.status(404).send({
    message: `Rota ${req.method} ${req.originalUrl} não encontrada.`,
  });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
