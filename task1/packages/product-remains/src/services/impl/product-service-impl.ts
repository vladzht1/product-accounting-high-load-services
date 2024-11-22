import { mappers } from "@/misc/mappers";
import { Product } from "@/models/domain/product";
import { ProductCreateDto, ProductDto } from "@/models/dto/product-dtos";
import { ProductRepository } from "@/repositories/product-repository";
import { createPage, normalizePageable, Page, Pageable, Result } from "shared";
import { ProductFilters, ProductService } from "../product-service";

export class ProductServiceImpl implements ProductService {
  private productRepository: ProductRepository;

  public constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  public async findAll(filters?: ProductFilters, pagination?: Partial<Pageable>): Promise<Page<ProductDto>> {
    const normalizedPagination = normalizePageable(pagination);

    const products = await this.productRepository.findAll(normalizedPagination, filters);

    return createPage(
      products.map(product => mappers.productToDto(product)),
      normalizedPagination,
      await this.productRepository.count(filters)
    );
  }

  public async findById(id: number): Promise<Result<ProductDto>> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      return Result.createError(new Error(`Product with id=${id} was not found`));
    }

    return Result.createOk(mappers.productToDto(product));
  }

  public async createProduct(productDto: ProductCreateDto): Promise<Result<ProductDto>> {
    const existingProduct = await this.productRepository.count({ name: productDto.name });

    if (existingProduct > 0) {
      return Result.createError(new Error("Product with such name already exists"));
    }

    if (productDto.name.trim().length === 0) {
      return Result.createError(new Error("Product name cannot be empty"));
    }

    if (productDto.plu <= 0) {
      return Result.createError(new Error("Product PLU cannot be negative"));
    }

    const product = await this.productRepository.save(new Product(productDto.name, productDto.plu));

    return Result.createOk(mappers.productToDto(product));
  }
}
