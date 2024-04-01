import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import { setupMiddlewares } from './middlewares';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Setup middlewares
setupMiddlewares(app);

// Setup routes
app.use('/', routes);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
