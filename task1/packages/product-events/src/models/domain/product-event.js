export class ProductEvent {
  id;
  productId;
  shopId;
  plu;
  action;
  createdAt;

  /**
   * @param {number} productId Product ID in the database
   * @param {number} shopId Shop ID in the database
   * @param {number} plu PLU of the product
   * @param {string} action Action performed to the product in the given shop
   */
  constructor(productId, shopId, plu, action) {
    this.id = 0;
    this.productId = productId;
    this.shopId = shopId;
    this.plu = plu;
    this.action = action;
    this.createdAt = new Date();
  }
}
