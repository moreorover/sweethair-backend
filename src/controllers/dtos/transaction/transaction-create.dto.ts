import { Appointment } from './../../../entity/hair/Appointment';
import { Customer } from './../../../entity/hair/Customer';
import { IsBoolean, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class TransactionCreateDto {
    @IsNumber()
    total: number;

    @IsOptional()
    @IsBoolean()
    isPaid: boolean;

    @IsDateString()
    date: Date;

    @IsOptional()
    customer: Customer;

    @IsOptional()
    appointment: Appointment;
}
