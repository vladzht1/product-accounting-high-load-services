import amqp from "amqplib";

import { RABBIT_MQ_HOST } from "@/config/env";

let channel: amqp.Channel | null = null;

export const getChannel = async () => {
  if (!channel) {
    const connection = await amqp.connect(`amqp://${RABBIT_MQ_HOST}`);
    channel = await connection.createChannel();
  }

  return channel;
};

export const queues = {
  productEvents: "product_events"
};
