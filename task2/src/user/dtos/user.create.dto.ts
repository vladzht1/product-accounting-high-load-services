import { Gender } from "../user.entity";

export class UserCreateDto {
  public firstName: string;
  public lastName: string;
  public age: number;
  public gender: Gender;
  public hasProblems: boolean;

  public constructor(firstName: string, lastName: string, age: number, gender: Gender, hasProblems: boolean) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
    this.hasProblems = hasProblems;
  }
}
