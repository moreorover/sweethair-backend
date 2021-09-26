import { ArrayNotEmpty, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Appointment } from '../../../entity/hair/Appointment';

export class CustomerUpdateDto {
    @IsString()
    id: string;

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
