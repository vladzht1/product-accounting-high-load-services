import { Shop } from "@/models/domain/shop";
import { GenericRepositoryImpl } from "../generic/repositories-impl";
import { ShopRepository } from "../shop-repository";

export class ShopRepositoryImpl extends GenericRepositoryImpl<Shop, number> implements ShopRepository {
}
