import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../BaseEntity';
import { Item } from './Item';

@Entity()
export class Price extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'float' })
    price: number;

    @Column({ default: 0, type: 'float' })
    delta: number;

    @ManyToOne(() => Item, (item) => item.prices)
    item: Item;
}
