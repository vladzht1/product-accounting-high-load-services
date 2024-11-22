import "reflect-metadata";

import moduleAlias from "module-alias";

moduleAlias.addAlias("@", __dirname);
moduleAlias();

import bodyParser from "body-parser";
import express from "express";

import { SERVER_HOST, SERVER_PORT } from "./config/env";
import { initializePostgresDataSource } from "./database/postgres";
import { rootRouter } from "./routers";
import { errorHandler } from "./routers/error-handler";

const app = express();

app.use(bodyParser.json());
app.use(rootRouter);
app.use(errorHandler);

const run = async () => {
  await initializePostgresDataSource();

  app.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`ProductRemains server started: http://${SERVER_HOST}:${SERVER_PORT}`);
  });
}

run();
