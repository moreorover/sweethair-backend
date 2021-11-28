import { IsBoolean, IsDateString, IsNumber, IsOptional } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { Appointment } from './../../../entity/hair/Appointment';
import { Customer } from './../../../entity/hair/Customer';
import { Invoice } from '../../../entity/hair/Invoice';

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
    @Type(() => Customer)
    customer: Customer;

    @IsOptional()
    @Type(() => Appointment)
    appointment: Appointment;

    @IsOptional()
    @Type(() => Invoice)
    invoice: Invoice;
}
