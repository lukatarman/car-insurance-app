export class User {
  constructor(
    public name: string,
    public birthday: Date,
    public city: string,
    public vehiclePower: number,
    public voucher?: boolean,
    public priceMatch?: number
  ) {}
}
