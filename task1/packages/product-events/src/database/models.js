import { EntitySchema } from "typeorm";

import { ProductEvent } from "../models/domain/product-event.js";

/** @type {EntitySchema<ProductEvent>} */
export const DbProductEventModel = new EntitySchema({
  name: "ProductEvent",
  tableName: "product_events",
  target: ProductEvent,
  columns: {
    id: {
      primary: true,
      type: "integer",
      generated: true,
    },
    productId: {
      name: "product_id",
      type: "integer",
    },
    shopId: {
      name: "shop_id",
      type: "integer",
    },
    plu: {
      name: "product_plu",
      type: "integer",
    },
    action: {
      name: "action",
      type: "varchar",
    },
    createdAt: {
      name: "created_at",
      type: "timestamp with time zone",
    },
  },
});
