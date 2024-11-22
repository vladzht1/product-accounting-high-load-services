import { Product } from "@/models/domain/product";
import { CreateRepository, ReadRepository } from "./generic/repositories";

export interface ProductRepository extends ReadRepository<Product, number>, CreateRepository<Product> {
  findByName(productName: string): Promise<Product[]>
}
