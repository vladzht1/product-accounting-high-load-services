
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "first_name", type: "varchar" })
  public firstName: string;

  @Column({ name: "last_name", type: "varchar" })
  public lastName: string;

  @Column({ name: "age", type: "integer" })
  public age: number;

  @Column({ name: "gender", type: "varchar" })
  public gender: Gender;

  @Column({ name: "has_problems", type: "boolean" })
  public hasProblems: boolean;

  public constructor(firstName: string, lastName: string, age: number, gender: Gender, hasProblems: boolean) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
    this.hasProblems = hasProblems;
  }
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
}
