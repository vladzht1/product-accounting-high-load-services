import { Column, Entity } from "typeorm";

import { BaseEntity } from "./base-entity";

@Entity({ name: "product" })
export class Product extends BaseEntity<number> {
  @Column({ name: "product_name" })
  public name: string;

  @Column({ name: "product_plu", type: "integer" })
  public plu: number;

  public constructor(name: string, plu: number) {
    super(0);

    this.name = name;
    this.plu = plu;
  }
}
