import { IsArray } from 'class-validator';
import { Expose } from 'class-transformer';

@Expose()
export class SpareCustomersTransactions {
  @IsArray()
  customers: number[];
}
