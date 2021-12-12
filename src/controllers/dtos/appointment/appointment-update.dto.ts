import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { Customer } from '../../../entity/hair/Customer';
import { Item } from './../../../entity/hair/Item';
import { Transaction } from '../../../entity/hair/Transaction';

@Expose()
export class AppointmentUpdateDto {
  @IsPositive()
  id: number;

  @IsDateString()
  scheduledAt: Date;

  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsArray()
  @Type(() => Customer)
  customers: Customer[];

  @IsOptional()
  @IsArray()
  @Type(() => Transaction)
  transactions: Transaction[];

  @IsOptional()
  @IsArray()
  @Type(() => Item)
  items: Item[];

  @Exclude()
  createdOn: Date;

  @Exclude()
  modifiedOn: Date;
}
