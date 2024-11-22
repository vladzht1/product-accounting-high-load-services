import { mappers } from "@/misc/mappers";
import { OrderProduct } from "@/models/domain/order-product";
import { OrderProductDto } from "@/models/dto/order-product-dto";
import { OrderProductRepository } from "@/repositories/order-product-repository";
import { OrderRepository } from "@/repositories/order-repository";
import { ProductRepository } from "@/repositories/product-repository";
import { createPage, normalizePageable, Page, Pageable, Result } from "shared";
import { OrderProductFilters, OrderProductService } from "../order-product-service";

export class OrderProductServiceImpl implements OrderProductService {
  private productRepository: ProductRepository;
  private orderRepository: OrderRepository;
  private orderProductRepository: OrderProductRepository;

  public constructor(
    productRepository: ProductRepository,
    orderRepository: OrderRepository,
    orderProductRepository: OrderProductRepository
  ) {
    this.productRepository = productRepository;
    this.orderRepository = orderRepository;
    this.orderProductRepository = orderProductRepository;
  }

  public async findAll(filters?: OrderProductFilters, pageable?: Pageable): Promise<Page<OrderProductDto>> {
    const normalizedPagination = normalizePageable(pageable);
    const normalizedFilters = {
      plu: filters?.plu,
      ...(filters?.orderAmountFrom || filters?.orderAmountTo
        ? {
          ...(filters.orderAmountFrom ? { min: filters.orderAmountFrom } : {}),
          ...(filters.orderAmountTo ? { max: filters.orderAmountTo } : {})
        }
        : {})
    };

    const orderProducts = await this.orderProductRepository.findAll(normalizedPagination, normalizedFilters);

    return createPage(
      orderProducts.map(orderProduct => mappers.orderProductToDto(orderProduct)),
      normalizedPagination,
      await this.orderProductRepository.count(normalizedFilters)
    );
  }

  public async createOrderRemains(productId: number, orderId: number, amount: number): Promise<Result<OrderProductDto>> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      return Result.createError(new Error("Product not found"));
    }

    const order = await this.orderRepository.findById(orderId);

    // Should we create a new order if it does not exist?
    if (!order) {
      return Result.createError(new Error("Order not found"));
    }

    if (amount <= 0) {
      return Result.createError(new Error("Product amount must be greater than zero"));
    }

    const result = await this.orderProductRepository.save(new OrderProduct(order, product, amount));
    return Result.createOk(mappers.orderProductToDto(result));
  }
}
