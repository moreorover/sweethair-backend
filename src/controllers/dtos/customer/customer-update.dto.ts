import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { Appointment } from '../../../entity/hair/Appointment';
import { Item } from '../../../entity/hair/Item';
import { Transaction } from './../../../entity/hair/Transaction';

@Expose()
export class CustomerUpdateDto {
    @IsPositive()
    id: number;

    @IsOptional()
    @IsNotEmpty()
    fullName: string;

    @IsOptional()
    location: string;

    @IsOptional()
    about: string;

    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    instagram: string;

    @IsOptional()
    @IsArray()
    @Type(() => Appointment)
    appointments: Appointment[];

    @IsOptional()
    @IsArray()
    @Type(() => Transaction)
    transactions: Transaction[];

    @IsOptional()
    @IsArray()
    @Type(() => Item)
    items: Item[];

    @Exclude()
    createdOn: Date;

    @Exclude()
    modifiedOn: Date;
}
