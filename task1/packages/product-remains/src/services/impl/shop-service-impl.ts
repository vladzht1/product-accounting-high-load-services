import { Shop } from "@/models/domain/shop";
import { ShopRepository } from "@/repositories/shop-repository";
import { createPage, normalizePageable, Page, Pageable, Result } from "shared";
import { ShopService } from "../shop-service";

export class ShopServiceImpl implements ShopService {
  private shopRepository: ShopRepository;

  public constructor(shopRepository: ShopRepository) {
    this.shopRepository = shopRepository;
  }

  public async findAll(): Promise<Page<Shop>> {
    const normalizedPagination: Pageable = normalizePageable({});

    return createPage(
      await this.shopRepository.findAll(normalizedPagination),
      normalizedPagination,
      await this.shopRepository.count()
    );
  }

  public async create(shopName: string): Promise<Result<Shop>> {
    const shopsWithName = await this.shopRepository.count({ name: shopName });

    if (shopsWithName > 0) {
      return Result.createError(new Error("Shop with such name already exists"));
    }

    const shop = new Shop(shopName);
    return Result.createOk(await this.shopRepository.save(shop));
  }
}
