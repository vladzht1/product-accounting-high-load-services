export class OrderProductDto {
  public id: number;

  public orderId: number;
  public productId: number;
  public productName: string;
  public productAmount: number;

  public constructor(id: number, orderId: number, productId: number, productName: string, productAmount: number) {
    this.id = id;
    this.orderId = orderId;
    this.productId = productId;
    this.productName = productName;
    this.productAmount = productAmount;
  }
}
