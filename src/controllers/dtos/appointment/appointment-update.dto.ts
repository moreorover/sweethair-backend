import { ArrayNotEmpty, IsDateString, IsOptional, IsString } from 'class-validator';
import { Customer } from '../../../entity/hair/Customer';

export class AppointmentUpdateDto {
    @IsString()
    id: string;

    @IsDateString()
    start: Date;

    @IsOptional()
    @ArrayNotEmpty()
    customers: Customer[];
}
