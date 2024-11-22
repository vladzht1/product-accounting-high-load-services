import { Shop } from "@/models/domain/shop";
import { Page, Result } from "shared";

export interface ShopService {
  findAll(): Promise<Page<Shop>>;
  create(shopName: string): Promise<Result<Shop>>;
}
