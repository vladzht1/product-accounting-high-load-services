import { OrderProduct } from "@/models/domain/order-product";
import { GenericRepositoryImpl } from "../generic/repositories-impl";
import { OrderProductRepository } from "../order-product-repository";

export class OrderProductRepositoryImpl extends GenericRepositoryImpl<OrderProduct, number> implements OrderProductRepository {
}
