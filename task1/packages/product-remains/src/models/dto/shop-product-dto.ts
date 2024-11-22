export class ShopProductDto {
  public id: number;
  public shopId: number;
  public shopName: string;
  public productId: number;
  public productName: string;
  public productPLU: number;
  public productAmount: number;

  public constructor(id: number, shopId: number, shopName: string, productId: number, productName: string, productPLU: number, productAmount: number) {
    this.id = id;
    this.shopId = shopId;
    this.shopName = shopName;
    this.productId = productId;
    this.productName = productName;
    this.productPLU = productPLU;
    this.productAmount = productAmount;
  }
}

export class ShopProductCreateDto {
  public shopId: number;
  public productId: number;
  public amount: number;

  public constructor(shopId: number, productId: number, amount: number) {
    this.shopId = shopId;
    this.productId = productId;
    this.amount = amount;
  }
}
