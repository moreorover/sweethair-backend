import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UserCreateDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    email: string;

    @Length(6)
    password: string;

    @Length(6)
    passwordConfirm: string;

    @IsNotEmpty()
    role_id: number;
}
