import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Customer } from '../../../entity/hair/Customer';
import { Invoice } from '../../../entity/hair/Invoice';

export class ItemUpdateDto {
    @IsOptional()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsNumber()
    total: number;

    @IsOptional()
    @IsArray()
    @Type(() => Invoice)
    invoices: Invoice[];

    @IsOptional()
    @IsArray()
    @Type(() => Customer)
    customers: Customer[];
}
