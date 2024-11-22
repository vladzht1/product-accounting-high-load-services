import "reflect-metadata";

import moduleAlias from "module-alias";

moduleAlias.addAlias("@", getDirname());

import bodyParser from "body-parser";
import express from "express";

import { productEventController } from "./config/components.js";
import { SERVER_HOST, SERVER_PORT } from "./config/env.js";
import { getChannel, queues } from "./config/rabbitmq.js";
import { initializePostgresDataSource } from "./database/postgres.js";
import { errorHandler } from "./routers/error-handler.js";
import { rootRouter } from "./routers/index.js";
import { getDirname } from "./utils/system.js";
import { isValidAction } from "./utils/validators.js";

const app = express();

app.use(bodyParser.json());
app.use(rootRouter);
app.use(errorHandler);

const runHttpServer = async () => {
  await initializePostgresDataSource();

  app.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`ProductEvents server started: http://${SERVER_HOST}:${SERVER_PORT}`);
  });
};

const runAmqpConnection = async () => {
  const channel = await getChannel();

  await channel.assertQueue(queues.productEvents);

  channel.consume(queues.productEvents, async (message) => {
    if (!message) {
      return;
    }

    const { productId, shopId, plu, type } = JSON.parse(message.content.toString());

    const productIdAsNumber = parseInt(String(productId));
    const shopIdAsNumber = parseInt(String(shopId));
    const pluAsNumber = parseInt(String(plu));

    if (
      !productId ||
      !shopId ||
      !plu ||
      !type ||
      isNaN(productIdAsNumber) ||
      isNaN(shopIdAsNumber) ||
      isNaN(pluAsNumber) ||
      isValidAction(type) === false
    ) {
      console.error("Invalid event data:", JSON.parse(message.content.toString()));
      return;
    }

    /** @type {import("./types/index.js").ProductEventCreateDto} */
    const eventData = {
      productId: productIdAsNumber,
      shopId: shopIdAsNumber,
      plu: pluAsNumber,
      action: type,
    };

    console.log("Received event:", eventData);

    await productEventController.addEvent(eventData);
  });

  console.log("ProductEvent service is waiting for events...");
};

runHttpServer();
runAmqpConnection();
