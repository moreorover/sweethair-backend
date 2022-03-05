import { ProductMeasurement } from '@prisma/client';
import { IsBoolean, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class ProductCreateDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  measurement: ProductMeasurement;

  @IsOptional()
  @IsBoolean()
  canReorder: boolean;

  @IsOptional()
  @IsPositive()
  startingStock: number;

  @IsOptional()
  @IsPositive()
  currentStock: number;
}

export class ProductUpdateDto {
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsNotEmpty()
  measurement: ProductMeasurement;

  @IsOptional()
  @IsBoolean()
  canReorder: boolean;

  @IsOptional()
  @IsPositive()
  startingStock: number;

  @IsOptional()
  @IsPositive()
  currentStock: number;
}
