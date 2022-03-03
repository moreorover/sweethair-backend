import { IsDateString, IsOptional, IsPositive } from 'class-validator';

export class SaleCreateDto {
  @IsDateString()
  soldAt: Date;

  @IsOptional()
  @IsPositive()
  customerId: number;
}

export class SaleUpdateDto {
  @IsOptional()
  @IsDateString()
  soldAt: Date;

  @IsOptional()
  @IsPositive()
  customerId: number;
}
