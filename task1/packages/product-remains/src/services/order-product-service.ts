import { OrderProductDto } from "@/models/dto/order-product-dto";
import { Page, Pageable, Result } from "shared";

export interface OrderProductService {
  findAll(filters?: OrderProductFilters, pagination?: Pageable): Promise<Page<OrderProductDto>>;
  createOrderRemains(productId: number, orderId: number, amount: number): Promise<Result<OrderProductDto>>;
}

export type OrderProductFilters = {
  plu?: number;
  orderAmountFrom?: number;
  orderAmountTo?: number;
}
