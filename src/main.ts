import express from 'express';
import { appConfig } from '../appConfig';

const app = express();
app.use(express.json());

const PORT = appConfig.server.port;

app.get('/', (req, res) => {
  res.send('Server McD Tubes Berhasil Jalan! 🍔');
});

app.listen(PORT, () => {
  console.log(`Server nyala di http://localhost:${PORT}`);
});