import { ShopProduct } from "@/models/domain/shop-product";
import { CreateRepository, DeleteRepository, ReadRepository, UpdateRepository } from "./generic/repositories";

export interface ShopProductRepository extends
  ReadRepository<ShopProduct, number>,
  CreateRepository<ShopProduct>,
  UpdateRepository<ShopProduct>,
  DeleteRepository<ShopProduct, number> { }
