import { Column, Entity, OneToMany } from "typeorm";

import { BaseEntity } from "./base-entity";
import { ShopProduct } from "./shop-product";

@Entity({ name: "shop" })
export class Shop extends BaseEntity<number> {
  @Column({ name: "shop_name" })
  public name: string;

  @OneToMany(() => ShopProduct, (product) => product.shop)
  public products!: ShopProduct[];

  public constructor(name: string) {
    super(0);

    this.name = name;
  }
}
