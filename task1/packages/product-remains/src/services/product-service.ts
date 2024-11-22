import { ProductCreateDto, ProductDto } from "@/models/dto/product-dtos";
import { Page, Pageable, Result } from "shared";

export interface ProductService {
  findAll(filters?: ProductFilters, pagination?: Pageable): Promise<Page<ProductDto>>;
  findById(id: number): Promise<Result<ProductDto>>;
  createProduct(product: ProductCreateDto): Promise<Result<ProductDto>>;
}

export type ProductFilters = {
  name?: string;
  plu?: number;
}
