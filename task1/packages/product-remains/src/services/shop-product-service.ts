import { ShopProductDto } from "@/models/dto/shop-product-dto";
import { Page, Pageable, Result } from "shared";

export interface ShopProductService {
  findAll(filters?: ShopProductFilters, pagination?: Pageable): Promise<Page<ShopProductDto>>;
  createShopRemains(productId: number, shopId: number, amount: number): Promise<Result<ShopProductDto>>;
  increaseShopRemains(remainId: number, increaseBy: number): Promise<Result<ShopProductDto>>
  decreaseShopRemains(remainId: number, decreaseBy: number): Promise<Result<ShopProductDto>>
}

export type ShopProductFilters = {
  plu?: number;
  shopId?: number;
  shopAmountFrom?: number;
  shopAmountTo?: number;
}
