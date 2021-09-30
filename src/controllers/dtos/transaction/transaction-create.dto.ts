import { Appointment } from './../../../entity/hair/Appointment';
import { Customer } from './../../../entity/hair/Customer';
import { IsBoolean, IsDateString, IsNumber, IsOptional } from 'class-validator';
import { Expose, Type } from 'class-transformer';

@Expose()
export class TransactionCreateDto {
    @IsNumber()
    total: number;

    @IsOptional()
    @IsBoolean()
    isPaid: boolean;

    @IsDateString()
    date: Date;

    @IsOptional()
    @Type(() => Customer)
    customer: Customer;

    @IsOptional()
    @Type(() => Appointment)
    appointment: Appointment;
}
