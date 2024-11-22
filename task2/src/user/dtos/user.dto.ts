import { Gender } from "../user.entity";

export class UserDto {
  public id: number;
  public firstName: string;
  public lastName: string;
  public age: number;
  public gender: Gender;
  public hasProblems: boolean;

  public constructor(id: number, firstName: string, lastName: string, age: number, gender: Gender, hasProblems: boolean) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
    this.hasProblems = hasProblems;
  }
}
