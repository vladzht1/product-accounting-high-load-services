import { ShopProduct } from "@/models/domain/shop-product";
import { GenericRepositoryImpl } from "../generic/repositories-impl";
import { ShopProductRepository } from "../shop-product-repository";

export class ShopProductRepositoryImpl extends GenericRepositoryImpl<ShopProduct, number> implements ShopProductRepository {
}
