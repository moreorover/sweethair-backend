import { Customer } from './../../../entity/hair/Customer';
import { ArrayNotEmpty, IsArray, IsDateString, IsOptional } from 'class-validator';

export class AppointmentCreateDto {
    @IsDateString()
    start: Date;

    @IsOptional()
    @IsArray()
    customers: Customer[];
}
