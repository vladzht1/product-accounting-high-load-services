import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { UserCreateDto } from './dtos/user.create.dto';
import { UserService } from './user.service';

@Controller("api/users")
export class UserController {
  public constructor(private readonly userService: UserService) { }

  @Get()
  public findAll(
    @Query("page") page: string,
    @Query("limit") limit: string,
  ) {
    return this.userService.findAll({ page: parseInt(page), limit: parseInt(limit) });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public createUser(@Body() userDto: UserCreateDto) {
    return this.userService.createUser(userDto);
  }

  @Post("random")
  @HttpCode(HttpStatus.CREATED)
  public createRandomUsers(@Query("amount") amount: number) {
    return this.userService.createRandomUsers(amount);
  }

  @Post("/resolve")
  public resolveUsersProblems() {
    return this.userService.resolveUsersProblems();
  }
}
