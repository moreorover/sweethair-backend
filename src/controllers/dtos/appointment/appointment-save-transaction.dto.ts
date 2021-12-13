import { EntityBaseDto } from './../entity-base.dto';
import { Transaction } from './../../../entity/hair/Transaction';
import { Expose, Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

@Expose()
export class AppointmentSaveTransactionDto {
  @Type(() => Transaction)
  transaction: Transaction;

  @IsOptional()
  @Type(() => EntityBaseDto)
  customer: EntityBaseDto;
}
