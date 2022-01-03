import { Transaction } from './../../../entity/hair/Transaction';
import { Expose, Type } from 'class-transformer';
import { IsPositive } from 'class-validator';

@Expose()
export class AppointmentCreateTransactionDto {
  @IsPositive()
  customerId: number;

  @IsPositive()
  appointmentId: number;

  @Type(() => Transaction)
  transaction: Transaction;
}
