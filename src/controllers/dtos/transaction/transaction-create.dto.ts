import { Appointment } from './../../../entity/hair/Appointment';
import { Customer } from './../../../entity/hair/Customer';
import { IsDateString, IsNumber, IsOptional } from 'class-validator';

export class TransactionCreateDto {
    @IsNumber()
    total: number;

    @IsDateString()
    date: Date;

    @IsOptional()
    customer: Customer;

    @IsOptional()
    appointment: Appointment;
}
