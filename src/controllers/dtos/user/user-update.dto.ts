import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsPositive, Length } from 'class-validator';

export class UserUpdateDto {
    @IsPositive()
    id: number;

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

    @Exclude()
    createdOn: Date;

    @Exclude()
    modifiedOn: Date;
}
