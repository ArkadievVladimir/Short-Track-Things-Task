import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { ThingsApi } from './routes/thing';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { validationID } from './utils/validationID';

const PORT = process.env.PORT || 3000;
const URL = '/api/v2/things';
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

app.get(URL, ThingsApi.show);
app.post(URL, ThingsApi.create);
app.put(`${URL}/:id`, validationID, ThingsApi.update);
app.delete(`${URL}/:id`, validationID, ThingsApi.delete);

app.all('*', (_, res: express.Response): void => {
  res.sendStatus(404);
});

app.listen(PORT, (): void => {
  console.log(`Server listening on port ${PORT}`);
});

mongoose.connect(process.env.MONGO_CONNECTION || 'mongodb://127.0.0.1:27017/things-mongo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
