import { IsPositive } from 'class-validator';

export class PurchaseDetailsCreateDto {
  @IsPositive()
  quantity: number;

  @IsPositive()
  total: number;

  @IsPositive()
  productId: number;
}
