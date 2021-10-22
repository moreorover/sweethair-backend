import { Customer } from './../../../entity/hair/Customer';
import { IsArray, IsDateString, IsOptional } from 'class-validator';
import { Expose, Type } from 'class-transformer';

@Expose()
export class AppointmentCreateDto {
    @IsDateString()
    scheduledAt: Date;

    @IsOptional()
    @IsArray()
    @Type(() => Customer)
    customers: Customer[];
}
