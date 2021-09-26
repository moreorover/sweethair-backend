import { Appointment } from './../../../entity/hair/Appointment';
import { Customer } from './../../../entity/hair/Customer';
import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class TransactionUpdateDto {
    @IsString()
    id: string;

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
