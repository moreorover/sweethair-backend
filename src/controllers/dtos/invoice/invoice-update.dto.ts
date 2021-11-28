import { IsArray, IsBoolean, IsDateString, IsNumber, IsOptional } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { Item } from '../../../entity/hair/Item';
import { Transaction } from '../../../entity/hair/Transaction';

@Expose()
export class InvoiceUpdateDto {
    @IsOptional()
    @IsNumber()
    total: number;

    @IsOptional()
    @IsBoolean()
    isReceived: boolean;

    @IsOptional()
    @IsBoolean()
    isPaid: boolean;

    @IsOptional()
    @IsDateString()
    scheduledAt: Date;

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
