import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { Transaction } from './../../../entity/hair/Transaction';
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Appointment } from '../../../entity/hair/Appointment';
import { Exclude, Expose, Type } from 'class-transformer';

@Expose()
export class CustomerUpdateDto extends BaseEntity {
    @IsString()
    id: string;

    @IsOptional()
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

    @Exclude()
    createdOn: Date;

    @Exclude()
    modifiedOn: Date;
}
