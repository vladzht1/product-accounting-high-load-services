import { Order } from "@/models/domain/order";
import { CreateRepository, ReadRepository, UpdateRepository } from "./generic/repositories";

export interface OrderRepository extends
  ReadRepository<Order, number>,
  CreateRepository<Order>,
  UpdateRepository<Order> { }
