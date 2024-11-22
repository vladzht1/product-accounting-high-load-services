import "../types/index.js";

/**
 * @typedef {import("../services/product-event-service.js").ProductEventService} ProductEventServiceT
 */

export class ProductEventController {
  /** @type {ProductEventServiceT} */
  _productEventService;

  /**
   * @param {ProductEventServiceT} productEventService
   */
  constructor(productEventService) {
    this._productEventService = productEventService;
  }

  /**
   * @param {import("../types/index.js").EventFilters} filters
   * @param {import("shared").Pageable} [pagination]
   */
  async findAll(filters, pagination) {
    return await this._productEventService.findAll(filters, pagination);
  }

  /**
   * @param {import("../types/index.js").ProductEventCreateDto} eventData
   */
  async addEvent(eventData) {
    const result = await this._productEventService.addEvent(eventData);

    if (result.failed()) {
      return {
        ok: false,
        status: 400,
        message: result.error().message,
      };
    }

    return result.data();
  }
}
