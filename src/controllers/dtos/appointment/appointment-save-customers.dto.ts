import { EntityBaseDto } from './../entity-base.dto';
import { IsArray } from 'class-validator';
import { Expose, Type } from 'class-transformer';

@Expose()
export class AppointmentSaveCustomersDto {
    @IsArray()
    @Type(() => EntityBaseDto)
    customers: EntityBaseDto[];
}
