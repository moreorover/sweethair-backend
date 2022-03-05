import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class PurchaseCreateDto {
  @IsDateString()
  orderedAt: Date;

  @IsDateString()
  arrivesAt: Date;

  @IsOptional()
  @IsBoolean()
  arrived: boolean;

  @IsOptional()
  @IsPositive()
  total: number;

  @IsOptional()
  @IsPositive()
  supplierId: number;
}

export class PurchaseUpdateDto {
  @IsOptional()
  @IsDateString()
  orderedAt: Date;

  @IsOptional()
  @IsDateString()
  arrivesAt: Date;

  @IsOptional()
  @IsBoolean()
  arrived: boolean;

  @IsOptional()
  @IsPositive()
  total: number;

  @IsOptional()
  @IsPositive()
  supplierId: number;
}
