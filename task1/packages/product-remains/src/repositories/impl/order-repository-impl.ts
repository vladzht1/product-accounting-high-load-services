import { Order } from "@/models/domain/order";
import { GenericRepositoryImpl } from "../generic/repositories-impl";
import { OrderRepository } from "../order-repository";

export class OrderRepositoryImpl extends GenericRepositoryImpl<Order, number> implements OrderRepository {
}
