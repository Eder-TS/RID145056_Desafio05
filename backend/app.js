import express from 'express';
import router from './src/routes/livroRoutes.js';
import 'dotenv/config';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.use(router);

app.use((req, res) => {
  res.status(404).send({
    mensagem: `Rota ${req.method} ${req.originalUrl} não encontrada.`,
  });
});

app.listen(3000, () => {
  console.log(`Servidor rodando na porta 3000.`);
});
