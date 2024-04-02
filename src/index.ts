import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import { setupMiddlewares } from './middlewares';

dotenv.config();

const app = express();
const port = 3000;

setupMiddlewares(app);

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
