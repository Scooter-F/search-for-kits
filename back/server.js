import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';
const port = 3001;


main().catch((err) => console.log(err));

async function main() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/api", routes);

  app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
  });
}