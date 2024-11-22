import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Pageable } from "src/misc/pagination";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserRepository {
  public constructor(
    @InjectRepository(User)
    private readonly ormRepository: Repository<User>
  ) { }

  public async findAll(pagination: Pageable, filters?: Partial<User>) {
    const { page, limit } = pagination;

    return this.ormRepository.find({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
      order: {
        id: "ASC"
      }
    });
  }

  public async count(filters?: Partial<User>): Promise<number> {
    return this.ormRepository.countBy(filters);
  }

  public async save(entity: User): Promise<User> {
    return this.ormRepository.save(entity);
  }

  public async update(filters: Partial<User>, values: Partial<Omit<User, "id">>) {
    await this.ormRepository.update(filters, values);
  }
}
