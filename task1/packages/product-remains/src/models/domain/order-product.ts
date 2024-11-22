import { Column, Entity, ManyToOne } from "typeorm";

import { BaseEntity } from "./base-entity";
import { Order } from "./order";
import { Product } from "./product";

@Entity({ name: "order_product" })
export class OrderProduct extends BaseEntity<number> {
  @ManyToOne(() => Order, (order) => order.products, { eager: true })
  public order: Order;

  @ManyToOne(() => Product, { eager: true })
  public product: Product;

  @Column({ name: "product_amount", type: "integer" })
  public amount: number;

  public constructor(order: Order, product: Product, amount: number) {
    super(0);

    this.order = order;
    this.product = product;
    this.amount = amount;
  }
}
