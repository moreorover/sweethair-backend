import { IsOptional, IsPositive } from 'class-validator';

export class SaleDetailsCreateDto {
  @IsPositive()
  quantity: number;

  @IsPositive()
  total: number;

  @IsPositive()
  productId: number;
}
