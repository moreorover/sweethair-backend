import { Transaction } from './../../../entity/hair/Transaction';
import { Appointment } from './../../../entity/hair/Appointment';
import { IsArray, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CustomerCreateDto {
    @IsOptional()
    @IsNotEmpty()
    firstName: string;

    @IsOptional()
    @IsNotEmpty()
    lastName: string;

    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsNotEmpty()
    instagram: string;

    @IsOptional()
    @IsArray()
    @Type(() => Appointment)
    appointments: Appointment[];

    @IsOptional()
    @IsArray()
    @Type(() => Transaction)
    transactions: Transaction[];
}
