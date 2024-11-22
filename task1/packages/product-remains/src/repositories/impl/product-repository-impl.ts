import { Product } from "@/models/domain/product";
import { GenericRepositoryImpl } from "../generic/repositories-impl";
import { ProductRepository } from "../product-repository";

export class ProductRepositoryImpl extends GenericRepositoryImpl<Product, number> implements ProductRepository {
  public async findByName(productName: string): Promise<Product[]> {
    return this.getOrmRepository().find({
      where: {
        name: productName
      }
    });
  }
}
