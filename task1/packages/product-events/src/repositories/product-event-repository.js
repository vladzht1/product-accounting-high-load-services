import "../types/index.js";

import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";

import { prepareFiltersForTypeORM } from "shared";
import { pgDataSource } from "../database/postgres.js";
import { ProductEvent } from "../models/domain/product-event.js";

export class ProductEventRepository {
  /** @type {Repository<ProductEvent>} */
  _ormRepository;

  constructor() {
    this._ormRepository = pgDataSource.getRepository(ProductEvent);
  }

  /**
   * @param {any} filters
   * @param {import("shared").Pageable} pagination
   * @returns {Promise<ProductEvent[]>}
   */
  async findAll(filters, pagination) {
    const { filters: normalizedFilters } = prepareFiltersForTypeORM(
      filters,
      {
        moreThanOrEqual: MoreThanOrEqual,
        lessThanOrEqual: LessThanOrEqual,
        between: Between,
      },
      {
        unwrapId: false,
      }
    );

    return await this._ormRepository.find({
      where: normalizedFilters,
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit,
    });
  }

  /**
   * @param {import("../types/index.js").EventFilters} filters
   * @returns {Promise<number>}
   */
  async count(filters) {
    const { filters: normalizedFilters } = prepareFiltersForTypeORM(
      filters,
      {
        moreThanOrEqual: MoreThanOrEqual,
        lessThanOrEqual: LessThanOrEqual,
        between: Between,
      },
      {
        unwrapId: false,
      }
    );

    return await this._ormRepository.count({
      where: normalizedFilters,
    });
  }

  /**
   * @param {ProductEvent} event
   * @returns {Promise<ProductEvent>}
   */
  async push(event) {
    return await this._ormRepository.save(event);
  }
}
