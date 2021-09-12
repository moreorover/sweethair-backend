import { Appointment } from './../../../entity/hair/Appointment';
import { ArrayNotEmpty, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

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
    @ArrayNotEmpty()
    appointments: Appointment[];
}
