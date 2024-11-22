import { DataSource } from "typeorm";

import { PG_CONNECTION_STRING } from "@/config/env";
import { Order } from "@/models/domain/order";
import { OrderProduct } from "@/models/domain/order-product";
import { Product } from "@/models/domain/product";
import { Shop } from "@/models/domain/shop";
import { ShopProduct } from "@/models/domain/shop-product";

export const pgDataSource = new DataSource({
  type: "postgres",
  url: PG_CONNECTION_STRING,
  synchronize: true,
  logging: true,
  entities: [OrderProduct, Order, Product, ShopProduct, Shop],
  subscribers: [],
  migrations: [],
})

export const initializePostgresDataSource = async () => {
  pgDataSource.initialize()
    .then(() => {
      console.log("Postgres data source initialized successfully")
    })
    .catch((error) => {
      console.error("Error initializing postgres data source");
      console.error(error);
    });
}
