import { Appointment } from './../../../entity/hair/Appointment';
import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { Customer } from '../../../entity/hair/Customer';
import { Invoice } from '../../../entity/hair/Invoice';
@Expose()
export class ItemUpdateDto {
    @IsOptional()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsNumber()
    total: number;

    @IsOptional()
    @Type(() => Invoice)
    invoice: Invoice;

    @IsOptional()
    @Type(() => Customer)
    customer: Customer;

    @IsOptional()
    @Type(() => Customer)
    appointment: Appointment;
}
