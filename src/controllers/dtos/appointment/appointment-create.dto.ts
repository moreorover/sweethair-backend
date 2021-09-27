import { Customer } from './../../../entity/hair/Customer';
import { IsArray, IsDateString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class AppointmentCreateDto {
    @IsDateString()
    start: Date;

    @IsOptional()
    @IsArray()
    @Type(() => Customer)
    customers: Customer[];
}
