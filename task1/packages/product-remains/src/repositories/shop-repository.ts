import { Shop } from "@/models/domain/shop";
import { CreateRepository, ReadRepository } from "./generic/repositories";

export interface ShopRepository extends
  ReadRepository<Shop, number>,
  CreateRepository<Shop> { }
