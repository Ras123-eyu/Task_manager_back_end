import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { errorHandler, routeNotFound } from "./middleware/errorMiddleware.js";
import routes from "./routes/index.js";
import fs from "fs";
import yaml from "js-yaml";
import swaggerUi from "swagger-ui-express";
import dbConnection from "./utils/connectDB.js";

dotenv.config();

dbConnection();

const port = process.env.PORT || 5000;

const app = express();

app.use(
   origin: 'https://task-manager-front-end-7brl.vercel.app' 
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

try {
  const yamlText = fs.readFileSync(
    new URL("./swagger.yaml", import.meta.url),
    "utf8"
  );
  const swaggerDocument = yaml.load(yamlText);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (err) {
  console.error("Failed to load swagger.yaml:", err.message);
}

app.use("/api", routes);

app.use(routeNotFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on ${port}`));
