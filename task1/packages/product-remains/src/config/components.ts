import { ProductController } from "@/controllers/product-controller";
import { ShopController } from "@/controllers/shop-controller";
import { ShopProductController } from "@/controllers/shop-product-controller";
import { pgDataSource } from "@/database/postgres";
import { Observer } from "@/misc/observer";
import { Order } from "@/models/domain/order";
import { OrderProduct } from "@/models/domain/order-product";
import { Product } from "@/models/domain/product";
import { Shop } from "@/models/domain/shop";
import { ShopProduct } from "@/models/domain/shop-product";
import { OrderProductRepositoryImpl } from "@/repositories/impl/order-product-repository-impl";
import { OrderRepositoryImpl } from "@/repositories/impl/order-repository-impl";
import { ProductRepositoryImpl } from "@/repositories/impl/product-repository-impl";
import { ShopProductRepositoryImpl } from "@/repositories/impl/shop-product-repository-impl";
import { ShopRepositoryImpl } from "@/repositories/impl/shop-repository-impl";
import { OrderProductRepository } from "@/repositories/order-product-repository";
import { OrderRepository } from "@/repositories/order-repository";
import { ProductRepository } from "@/repositories/product-repository";
import { ShopProductRepository } from "@/repositories/shop-product-repository";
import { ShopRepository } from "@/repositories/shop-repository";
import { OrderProductServiceImpl } from "@/services/impl/order-product-service-impl";
import { ProductServiceImpl } from "@/services/impl/product-service-impl";
import { ShopProductServiceImpl } from "@/services/impl/shop-product-service-impl";
import { ShopServiceImpl } from "@/services/impl/shop-service-impl";
import { OrderProductService } from "@/services/order-product-service";
import { ProductService } from "@/services/product-service";
import { ShopProductService } from "@/services/shop-product-service";
import { ShopService } from "@/services/shop-service";
import { DecreaseRemainsEventAction, IncreaseRemainsEventAction, SendAddProductToShopEventAction } from "../events/actions/send-product-events";
import { ADD_PRODUCT_TO_SHOP_EVENT, DECREASE_PRODUCT_REMAINS_EVENT, INCREASE_PRODUCT_REMAINS_EVENT } from "../events/types";

const shopRepository: ShopRepository = new ShopRepositoryImpl(pgDataSource.getRepository(Shop));
const orderRepository: OrderRepository = new OrderRepositoryImpl(pgDataSource.getRepository(Order));
const productRepository: ProductRepository = new ProductRepositoryImpl(pgDataSource.getRepository(Product));
const shopProductRepository: ShopProductRepository = new ShopProductRepositoryImpl(pgDataSource.getRepository(ShopProduct));
const orderProductRepository: OrderProductRepository = new OrderProductRepositoryImpl(pgDataSource.getRepository(OrderProduct));

export const shopService: ShopService = new ShopServiceImpl(shopRepository);
export const productService: ProductService = new ProductServiceImpl(productRepository);
export const shopProductService: ShopProductService = new ShopProductServiceImpl(productRepository, shopRepository, shopProductRepository)
export const orderProductService: OrderProductService = new OrderProductServiceImpl(productRepository, orderRepository, orderProductRepository);

export const shopController = new ShopController(shopService);
export const productController = new ProductController(productService);
export const shopProductController = new ShopProductController(shopProductService);

// Set up handlers for basic events with products and remains
Observer.getInstance().subscribe(ADD_PRODUCT_TO_SHOP_EVENT, new SendAddProductToShopEventAction());
Observer.getInstance().subscribe(INCREASE_PRODUCT_REMAINS_EVENT, new IncreaseRemainsEventAction());
Observer.getInstance().subscribe(DECREASE_PRODUCT_REMAINS_EVENT, new DecreaseRemainsEventAction());
