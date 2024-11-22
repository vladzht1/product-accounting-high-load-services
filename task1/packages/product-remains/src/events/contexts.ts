import { EventContext } from "@/misc/observer";

export const eventNames = {
  addProductToShop: "add_product_to_shop",
  increaseRemains: "increase_remains",
  decreaseRemains: "decrease_remains"
}

export class AddProductToShopEventContext extends EventContext {
  public shopId: number;
  public productId: number;
  public productPLU: number;
  public productAmount: number;

  public constructor(productId: number, productPLU: number, shopId: number, productAmount: number) {
    super(eventNames.addProductToShop);

    this.productId = productId;
    this.productPLU = productPLU;
    this.shopId = shopId;
    this.productAmount = productAmount;
  }
}

export class IncreaseRemainsEventContext extends EventContext {
  public productId: number;
  public productPLU: number;
  public shopId: number;
  public productOffset: number;
  public productAmount: number;

  public constructor(productId: number, productPLU: number, shopId: number, productOffset: number, productAmount: number) {
    super(eventNames.increaseRemains);

    this.productId = productId;
    this.productPLU = productPLU;
    this.shopId = shopId;
    this.productOffset = productOffset;
    this.productAmount = productAmount;
  }
}

export class DecreaseRemainsEventContext extends EventContext {
  public productId: number;
  public productPLU: number;
  public shopId: number;
  public productOffset: number;
  public productAmount: number;

  public constructor(productId: number, productPLU: number, shopId: number, productOffset: number, productAmount: number) {
    super(eventNames.decreaseRemains);

    this.productId = productId;
    this.productPLU = productPLU;
    this.shopId = shopId;
    this.productOffset = productOffset;
    this.productAmount = productAmount;
  }
}
