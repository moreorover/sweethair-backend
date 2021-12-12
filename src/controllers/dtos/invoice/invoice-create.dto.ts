import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { Item } from '../../../entity/hair/Item';
import { Transaction } from '../../../entity/hair/Transaction';

@Expose()
export class InvoiceCreateDto {
  @IsNumber()
  total: number;

  @IsBoolean()
  isReceived: boolean;

  @IsBoolean()
  isPaid: boolean;

  @IsDateString()
  scheduledAt: Date;

  @IsOptional()
  @IsArray()
  @Type(() => Transaction)
  transactions: Transaction[];

  @IsOptional()
  @IsArray()
  @Type(() => Item)
  items: Item[];
}
