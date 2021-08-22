import { IsNotEmpty, IsPositive, validateOrReject } from 'class-validator';

export class ItemCreateDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    upc: string;

    @IsPositive()
    price: number;

    @IsNotEmpty()
    url: string;
}
