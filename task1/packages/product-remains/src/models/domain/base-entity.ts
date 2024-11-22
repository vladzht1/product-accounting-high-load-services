import { PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseEntity<T> {
  @PrimaryGeneratedColumn()
  public id: T;

  public constructor(id: T) {
    this.id = id;
  }
}
