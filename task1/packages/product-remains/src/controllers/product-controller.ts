import { ProductCreateDto } from "@/models/dto/product-dtos";
import { ProductFilters, ProductService } from "@/services/product-service";
import { Pageable } from "shared";

export class ProductController {
  private productService: ProductService;

  public constructor(productService: ProductService) {
    this.productService = productService;
  }

  public async findAll(filters: ProductFilters, pagination?: Pageable) {
    return await this.productService.findAll(filters, pagination);
  }

  public async createProduct(productDto: ProductCreateDto) {
    const result = await this.productService.createProduct(productDto);

    if (result.failed()) {
      return {
        ok: false,
        status: 400,
        message: result.error().message
      };
    }

    return result.data();
  }
}
