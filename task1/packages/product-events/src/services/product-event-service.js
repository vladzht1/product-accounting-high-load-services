import { createPage, normalizePageable, Result } from "shared";
import { ProductEvent } from "../models/domain/product-event.js";

/**
 * @typedef {import("../repositories/product-event-repository.js").ProductEventRepository} ProductEventRepositoryT
 */

export class ProductEventService {
  /** @type {ProductEventRepositoryT} */
  _productEventRepository;

  /**
   * @param {ProductEventRepositoryT} productEventRepository
   */
  constructor(productEventRepository) {
    this._productEventRepository = productEventRepository;
  }

  /**
   * @param {import("../types/index.js").EventFilters} filters
   * @param {import("shared").Pageable} [pagination]
   * @returns {Promise<import("shared").Page<ProductEvent>>}
   */
  async findAll(filters, pagination) {
    const normalizedPagination = normalizePageable(pagination ?? undefined);
    const normalizedFilters = this._normalizeFilters(filters);

    const data = await this._productEventRepository.findAll(normalizedFilters, normalizedPagination);
    return createPage(data, normalizedPagination, await this._productEventRepository.count(normalizedFilters));
  }

  /**
   * @param {import("../types/index.js").ProductEventCreateDto} eventData
   * @returns {Promise<Result<ProductEvent>>}
   */
  async addEvent(eventData) {
    const event = new ProductEvent(eventData.productId, eventData.shopId, eventData.plu, eventData.action);
    return Result.createOk(await this._productEventRepository.push(event));
  }

  /**
   * @param {import("../types/index.js").EventFilters} filters
   */
  _normalizeFilters(filters) {
    return {
      ...(filters.plu ? { plu: filters.plu } : {}),
      ...(filters.shopId ? { shopId: filters.shopId } : {}),
      ...(filters.action ? { action: filters.action } : {}),
      ...((filters.dateFrom || filters.dateTo) && {
        createdAt: {
          ...(filters.dateFrom ? { min: filters.dateFrom } : {}),
          ...(filters.dateTo ? { max: filters.dateTo } : {}),
        },
      }),
    };
  }
}
