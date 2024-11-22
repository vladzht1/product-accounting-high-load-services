import { Column, Entity, ManyToOne } from "typeorm";

import { BaseEntity } from "./base-entity";
import { Product } from "./product";
import { Shop } from "./shop";

@Entity({ name: "shop_product" })
export class ShopProduct extends BaseEntity<number> {
  @ManyToOne(() => Shop, (shop) => shop.products, { eager: true })
  public shop: Shop;

  @ManyToOne(() => Product, { eager: true })
  public product: Product;

  @Column({ name: "product_amount", type: "integer" })
  public amount: number;

  public constructor(shop: Shop, product: Product, amount: number) {
    super(0);

    this.shop = shop;
    this.product = product;
    this.amount = amount;
  }
}
