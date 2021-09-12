import { ArrayNotEmpty, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Appointment } from '../../../entity/hair/Appointment';

export class CustomerUpdateDto {
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
