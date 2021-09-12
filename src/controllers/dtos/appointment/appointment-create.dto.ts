import { Customer } from './../../../entity/hair/Customer';
import { ArrayNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class AppointmentCreateDto {
    @IsDateString()
    start: Date;

    @IsOptional()
    @ArrayNotEmpty()
    customers: Customer[];
}
