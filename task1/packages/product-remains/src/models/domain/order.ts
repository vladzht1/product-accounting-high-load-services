import { Entity, OneToMany } from "typeorm";

import { BaseEntity } from "./base-entity";
import { OrderProduct } from "./order-product";

@Entity({ name: "order" })
export class Order extends BaseEntity<number> {
  @OneToMany(() => OrderProduct, (product) => product.order)
  public products!: OrderProduct[];

  public constructor() {
    super(0);
  }

  public addProduct(product: OrderProduct) {
    this.products.push(product);
  }
}
