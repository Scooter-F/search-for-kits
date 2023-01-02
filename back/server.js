import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
const port = 3001;

const swaggerSpec = swaggerJsdoc({
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Search For Kits API Docs",
      version: "1.0.0",
      description:
        "Search For Kits API Docs",
    }
  },
  swagger: "2.0",
  apis: ["./routes/search.js"]
});


main().catch((err) => console.log(err));

async function main() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/api', routes);
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
  });
}