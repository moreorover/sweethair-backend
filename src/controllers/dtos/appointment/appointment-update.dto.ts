import { Exclude, Expose, Type } from 'class-transformer';
import { IsArray, IsDateString, IsOptional, IsString } from 'class-validator';
import { Customer } from '../../../entity/hair/Customer';
import { Transaction } from '../../../entity/hair/Transaction';

@Expose()
export class AppointmentUpdateDto {
    @IsString()
    id: string;

    @IsDateString()
    scheduledAt: Date;

    @IsOptional()
    @IsArray()
    @Type(() => Customer)
    customers: Customer[];

    @IsOptional()
    @IsArray()
    @Type(() => Transaction)
    transactions: Transaction[];

    @Exclude()
    createdOn: Date;

    @Exclude()
    modifiedOn: Date;
}
