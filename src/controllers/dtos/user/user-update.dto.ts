import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UserUpdateDto {
    @IsString()
    id: string;

    @IsOptional()
    @IsNotEmpty()
    firstName: string;

    @IsOptional()
    @IsNotEmpty()
    lastName: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @Length(6)
    password: string;

    @IsOptional()
    role_id: number;
}
