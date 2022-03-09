import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsPositive,
  Min,
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
  @Min(0)
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
  @Min(0)
  total: number;

  @IsOptional()
  @IsPositive()
  supplierId: number;
}
