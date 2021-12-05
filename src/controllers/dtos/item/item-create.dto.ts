import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { Invoice } from './../../../entity/hair/Invoice';

@Expose()
export class ItemCreateDto {
    @IsNotEmpty()
    title: string;

    @IsNumber()
    total: number;

    @IsOptional()
    @IsArray()
    @Type(() => Invoice)
    invoices: Invoice[];
}
