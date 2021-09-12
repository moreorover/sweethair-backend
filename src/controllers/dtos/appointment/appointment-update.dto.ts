import { ArrayNotEmpty, IsDateString, IsOptional } from 'class-validator';
import { Customer } from '../../../entity/hair/Customer';

export class AppointmentUpdateDto {
    @IsDateString()
    start: Date;

    @IsOptional()
    @ArrayNotEmpty()
    customers: Customer[];
}
