import { Transaction } from './../../../entity/hair/Transaction';
import { Appointment } from './../../../entity/hair/Appointment';
import { IsArray, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Expose, Type } from 'class-transformer';

@Expose()
export class CustomerCreateDto {
    @IsNotEmpty()
    fullName: string;

    @IsOptional()
    @IsNotEmpty()
    location: string;

    @IsOptional()
    @IsNotEmpty()
    about: string;

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
