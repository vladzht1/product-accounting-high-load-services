import { ShopService } from "@/services/shop-service";

export class ShopController {
  private shopService: ShopService;

  public constructor(shopService: ShopService) {
    this.shopService = shopService;
  }

  public async findAll() {
    return await this.shopService.findAll();
  }

  public async create(shopName: string) {
    const result = await this.shopService.create(shopName);

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
