export class ProductDto {
  public id: number;
  public name: string;
  public plu: number;

  public constructor(id: number, name: string, plu: number) {
    this.id = id;
    this.name = name;
    this.plu = plu;
  }
}

export class ProductCreateDto {
  public name: string;
  public plu: number;

  public constructor(name: string, plu: number) {
    this.name = name;
    this.plu = plu;
  }
}
