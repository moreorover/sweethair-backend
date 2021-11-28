import { IsBoolean, IsDateString, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { Appointment } from './../../../entity/hair/Appointment';
import { Customer } from './../../../entity/hair/Customer';
import { Invoice } from '../../../entity/hair/Invoice';

@Expose()
export class TransactionUpdateDto {
    @IsPositive()
    id: number;

    @IsNumber()
    total: number;

    @IsOptional()
    @IsBoolean()
    isPaid: boolean;

    @IsDateString()
    scheduledAt: Date;

    @IsOptional()
    @Type(() => Customer)
    customer: Customer;

    @IsOptional()
    @Type(() => Appointment)
    appointment: Appointment;

    @IsOptional()
    @Type(() => Invoice)
    invoice: Invoice;

    @Exclude()
    createdOn: Date;

    @Exclude()
    modifiedOn: Date;
}
