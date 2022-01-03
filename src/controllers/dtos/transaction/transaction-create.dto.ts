import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { Expose } from 'class-transformer';

@Expose()
export class TransactionCreateDto {
  @IsNumber()
  total: number;

  @IsOptional()
  @IsBoolean()
  isPaid: boolean;

  @IsDateString()
  scheduledAt: Date;

  @IsOptional()
  @IsPositive()
  customerId: number;

  @IsOptional()
  @IsPositive()
  appointmentId: number;

  @IsOptional()
  @IsPositive()
  invoiceId: number;
}
