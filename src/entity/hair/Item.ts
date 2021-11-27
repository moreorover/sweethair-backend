import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../BaseEntity';
import { Invoice } from './Invoice';

@Entity()
export class Item extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('float', { precision: 11, scale: 2 })
    total: number;

    @ManyToOne(() => Invoice, (invoice) => invoice.transactions)
    invoice: Invoice;
}
