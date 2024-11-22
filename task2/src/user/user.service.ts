import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { createPage, normalizePageable, Page, Pageable } from "../misc/pagination";
import { UserCreateDto } from "./dtos/user.create.dto";
import { UserDto } from "./dtos/user.dto";
import { Gender, User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  public constructor(private readonly userRepository: UserRepository) { }

  public async findAll(pagination?: Pageable): Promise<Page<UserDto>> {
    const { page, limit } = normalizePageable(pagination);

    const result = await this.userRepository.findAll({ page, limit });

    return createPage(
      result.map(user => this.mapToDto(user)),
      { page, limit },
      await this.userRepository.count(),
    )
  }

  public async createUser(userDto: UserCreateDto): Promise<UserDto> {
    const user = new User(userDto.firstName, userDto.lastName, userDto.age, userDto.gender, userDto.hasProblems);
    return this.mapToDto(await this.userRepository.save(user));
  }

  public async createRandomUsers(amount: number): Promise<any> {
    if (amount <= 0) {
      throw new Error("Amount must be greater than zero");
    }

    let createdUsers = 0;

    for (let i = 0; i < amount; i++) {
      const user = new User(
        faker.person.firstName(),
        faker.person.lastName(),
        faker.number.int({ min: 5, max: 80 }),
        Math.random() < 0.5 ? Gender.MALE : Gender.FEMALE,
        Math.random() < 0.5
      );

      await this.userRepository.save(user);
      createdUsers++;

      if (createdUsers % 1000 === 0 || createdUsers === amount) {
        console.log("Created and saved users:", createdUsers);
      }
    }

    return {
      created: createdUsers
    }
  }

  public async resolveUsersProblems(): Promise<{ success: boolean, problemsResolved: number }> {
    const value = await this.userRepository.count({
      hasProblems: true
    });

    await this.userRepository.update(
      {
        hasProblems: true
      },
      {
        hasProblems: false
      }
    );

    return {
      success: true,
      problemsResolved: value
    }
  }

  private mapToDto(user: User): UserDto {
    return new UserDto(
      user.id,
      user.firstName,
      user.lastName,
      user.age,
      user.gender,
      user.hasProblems
    );
  }
}
