import { Appointment } from './../../../entity/hair/Appointment';
import { Customer } from './../../../entity/hair/Customer';
import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { Exclude, Type } from 'class-transformer';

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
    @Type(() => Customer)
    customer: Customer;

    @IsOptional()
    @Type(() => Appointment)
    appointment: Appointment;

    @Exclude()
    createdOn: Date;

    @Exclude()
    modifiedOn: Date;
}
