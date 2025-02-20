
import path from "node:path";
import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { ErrorHandler } from "./errors/error-handler.js";
import { NotFound } from "./errors/not-found.js";
import  routes from "./routes/index.js";

const app = express();

app.use(express.json());

app.use(cors());
app.options("*", cors());

const swaggerDocument = YAML.load(`${path.resolve("./")}/swagger.yaml`);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", routes);

app.use(NotFound);

app.use(ErrorHandler);

export default app;