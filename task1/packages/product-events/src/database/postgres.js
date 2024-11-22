import { DataSource } from "typeorm";

import { PG_CONNECTION_STRING } from "../config/env.js";
import { DbProductEventModel } from "./models.js";

export const pgDataSource = new DataSource({
  type: "postgres",
  url: PG_CONNECTION_STRING,
  synchronize: true,
  logging: true,
  entities: [DbProductEventModel],
  subscribers: [],
  migrations: [],
});

export const initializePostgresDataSource = async () => {
  pgDataSource
    .initialize()
    .then(() => {
      console.log("Postgres data source initialized successfully");
    })
    .catch((error) => {
      console.error("Error initializing postgres data source");
      console.error(error);
    });
};
