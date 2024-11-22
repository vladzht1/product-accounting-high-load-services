import { OrderProduct } from "@/models/domain/order-product";
import { Product } from "@/models/domain/product";
import { ShopProduct } from "@/models/domain/shop-product";
import { OrderProductDto } from "@/models/dto/order-product-dto";
import { ProductDto } from "@/models/dto/product-dtos";
import { ShopProductDto } from "@/models/dto/shop-product-dto";

export const mappers = {
  productToDto: (product: Product): ProductDto => {
    return new ProductDto(
      product.id,
      product.name,
      product.plu
    );
  },
  shopProductToDto: (shopProduct: ShopProduct): ShopProductDto => {
    return new ShopProductDto(
      shopProduct.id,
      shopProduct.shop.id,
      shopProduct.shop.name,
      shopProduct.product.id,
      shopProduct.product.name,
      shopProduct.product.plu,
      shopProduct.amount
    );
  },
  orderProductToDto: (orderProduct: OrderProduct): OrderProductDto => {
    return new OrderProductDto(
      orderProduct.id,
      orderProduct.order.id,
      orderProduct.product.id,
      orderProduct.product.name,
      orderProduct.amount
    );
  }
}
