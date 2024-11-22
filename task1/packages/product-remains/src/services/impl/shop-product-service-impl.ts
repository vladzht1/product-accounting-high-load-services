import { AddProductToShopEventContext, DecreaseRemainsEventContext, IncreaseRemainsEventContext } from "@/events/contexts";
import { mappers } from "@/misc/mappers";
import { Observer } from "@/misc/observer";
import { ShopProduct } from "@/models/domain/shop-product";
import { ShopProductDto } from "@/models/dto/shop-product-dto";
import { ProductRepository } from "@/repositories/product-repository";
import { ShopProductRepository } from "@/repositories/shop-product-repository";
import { ShopRepository } from "@/repositories/shop-repository";
import { createPage, normalizePageable, Page, Pageable, Result } from "shared";
import { ShopProductFilters, ShopProductService } from "../shop-product-service";

export class ShopProductServiceImpl implements ShopProductService {
  private productRepository: ProductRepository;
  private shopRepository: ShopRepository;
  private shopProductRepository: ShopProductRepository;

  public constructor(
    productRepository: ProductRepository,
    shopRepository: ShopRepository,
    shopProductRepository: ShopProductRepository
  ) {
    this.productRepository = productRepository;
    this.shopRepository = shopRepository;
    this.shopProductRepository = shopProductRepository;
  }

  public async findAll(filters?: ShopProductFilters, pageable?: Pageable): Promise<Page<ShopProductDto>> {
    const normalizedPagination = normalizePageable(pageable);
    const normalizedFilters = {
      ...(filters?.plu ? { product: { plu: filters.plu } } : {}),
      ...(filters?.shopId ? { shopId: filters.shopId } : {}),
      ...(filters?.shopAmountFrom || filters?.shopAmountTo
        ? {
          amount: {
            ...(filters.shopAmountFrom ? { min: filters.shopAmountFrom } : {}),
            ...(filters.shopAmountTo ? { max: filters.shopAmountTo } : {})
          }
        }
        : {})
    };

    const shopProducts = await this.shopProductRepository.findAll(normalizedPagination, normalizedFilters);

    return createPage(
      shopProducts.map(shopProduct => mappers.shopProductToDto(shopProduct)),
      normalizedPagination,
      await this.shopProductRepository.count(normalizedFilters)
    );
  }

  public async createShopRemains(productId: number, shopId: number, amount: number): Promise<Result<ShopProductDto>> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      return Result.createError(new Error("Product not found"));
    }

    const shop = await this.shopRepository.findById(shopId);

    // Should we create a new shop if it does not exist?
    if (!shop) {
      return Result.createError(new Error("Shop not found"));
    }

    if (amount <= 0) {
      return Result.createError(new Error("Product amount must be greater than zero"));
    }

    const result = await this.shopProductRepository.save(new ShopProduct(shop, product, amount));

    const createProductEventContext = new AddProductToShopEventContext(result.product.id, result.product.plu, result.shop.id, result.amount);
    Observer.getInstance().broadcast(createProductEventContext);

    return Result.createOk(mappers.shopProductToDto(result));
  }

  public async increaseShopRemains(remainId: number, increaseBy: number): Promise<Result<ShopProductDto>> {
    const shopProduct = await this.shopProductRepository.findById(remainId);

    if (!shopProduct) {
      return Result.createError(new Error("Product was not found in the shop"));
    }

    if (increaseBy <= 0) {
      return Result.createError(new Error("Amount must be greater than zero"));
    }

    shopProduct.amount += increaseBy;

    const result = await this.shopProductRepository.update(shopProduct);

    const increaseProductRemains = new IncreaseRemainsEventContext(result.product.id, result.product.plu, result.shop.id, increaseBy, result.amount);
    Observer.getInstance().broadcast(increaseProductRemains);

    return Result.createOk(mappers.shopProductToDto(result));
  }

  public async decreaseShopRemains(remainId: number, decreaseBy: number): Promise<Result<ShopProductDto>> {
    const shopProduct = await this.shopProductRepository.findById(remainId);

    if (!shopProduct) {
      return Result.createError(new Error("Product was not found in the shop"));
    }

    if (decreaseBy <= 0) {
      return Result.createError(new Error("Amount must be greater than zero"));
    }

    if (shopProduct.amount < decreaseBy) {
      return Result.createError(new Error(`Cannot decrease by ${decreaseBy}: there are ${shopProduct.amount} available products`));
    }

    shopProduct.amount -= decreaseBy;

    const result = await this.shopProductRepository.update(shopProduct);

    const decreaseProductRemains = new DecreaseRemainsEventContext(result.product.id, result.product.plu, result.shop.id, decreaseBy, result.amount);
    Observer.getInstance().broadcast(decreaseProductRemains);

    return Result.createOk(mappers.shopProductToDto(result));
  }
}
