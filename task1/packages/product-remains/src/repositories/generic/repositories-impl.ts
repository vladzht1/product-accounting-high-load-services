import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";

import { BaseEntity } from "@/models/domain/base-entity";
import { Pageable, prepareFiltersForTypeORM } from "shared";
import { CreateRepository, DeleteRepository, ReadRepository, UpdateRepository } from "./repositories";

export abstract class GenericRepositoryImpl<T extends BaseEntity<K>, K> implements
  ReadRepository<T, K>,
  CreateRepository<T>,
  UpdateRepository<T>,
  DeleteRepository<T, K> {

  private ormRepository: Repository<T>;

  public constructor(ormRepository: Repository<T>) {
    this.ormRepository = ormRepository;
  }

  public findAll<F>(pagination: Pageable, rawFilters?: F): Promise<T[]> {
    const { page, limit } = pagination;

    const { filters, relations } = prepareFiltersForTypeORM(rawFilters || {}, {
      lessThanOrEqual: LessThanOrEqual,
      moreThanOrEqual: MoreThanOrEqual,
      between: Between
    }
    );

    console.log({ relations, filters });

    return this.ormRepository.find({
      relations,
      where: filters,
      skip: (page - 1) * limit,
      take: limit
    });
  }

  public findById(id: K): Promise<T | null> {
    return this.ormRepository.findOneBy({ id: id as any });
  }

  public count<F>(filters?: F): Promise<number> {
    const { filters: normalizedFilters } = prepareFiltersForTypeORM(filters || {}, {
      lessThanOrEqual: LessThanOrEqual,
      moreThanOrEqual: MoreThanOrEqual,
      between: Between
    });

    return this.ormRepository.countBy(normalizedFilters);
  }

  public async save(entity: T): Promise<T> {
    return this.ormRepository.save(entity);
  }

  public async update(entity: T): Promise<T> {
    await this.ormRepository.update(entity.id as any, entity as any);

    return entity;
  }

  public async delete(entity: T): Promise<void> {
    await this.ormRepository.delete(entity.id as any);
  }

  public async deleteById(id: K): Promise<void> {
    const entity = await this.findById(id);

    if (!entity) {
      return;
    }

    await this.delete(entity);
  }

  protected getOrmRepository(): Repository<T> {
    return this.ormRepository;
  }
}
