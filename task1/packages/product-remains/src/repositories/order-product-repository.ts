import { OrderProduct } from "@/models/domain/order-product";
import { CreateRepository, DeleteRepository, ReadRepository, UpdateRepository } from "./generic/repositories";

export interface OrderProductRepository extends
  ReadRepository<OrderProduct, number>,
  CreateRepository<OrderProduct>,
  UpdateRepository<OrderProduct>,
  DeleteRepository<OrderProduct, number> { }
