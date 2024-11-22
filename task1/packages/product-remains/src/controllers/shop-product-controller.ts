import { ShopProductCreateDto } from "@/models/dto/shop-product-dto";
import { ShopProductFilters, ShopProductService } from "@/services/shop-product-service";
import { Pageable } from "shared";

export class ShopProductController {
  private shopProductService: ShopProductService;

  public constructor(shopProductService: ShopProductService) {
    this.shopProductService = shopProductService;
  }

  public async findAll(filters?: ShopProductFilters, pagination?: Pageable) {
    return this.shopProductService.findAll(filters, pagination);
  }

  public async addProductToShop(shopProductDto: ShopProductCreateDto) {
    const result = await this.shopProductService.createShopRemains(
      shopProductDto.productId,
      shopProductDto.shopId,
      shopProductDto.amount
    );

    if (result.failed()) {
      return {
        ok: false,
        message: result.error().message
      };
    }

    return result.data();
  }

  public async increaseShopProductAmount(remainId: number, increaseBy: number) {
    const result = await this.shopProductService.increaseShopRemains(remainId, increaseBy);

    if (result.failed()) {
      return {
        ok: false,
        message: result.error().message
      };
    }

    return result.data();
  }

  public async decreaseShopProductAmount(remainId: number, decreaseBy: number) {
    const result = await this.shopProductService.decreaseShopRemains(remainId, decreaseBy);

    if (result.failed()) {
      return {
        ok: false,
        message: result.error().message
      };
    }

    return result.data();
  }
}
