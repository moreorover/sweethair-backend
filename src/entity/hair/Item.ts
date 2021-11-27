import { Entity, Column, ManyToOne } from 'typeorm';
import { DataEntity } from '../DataEntity';
import { Invoice } from './Invoice';

@Entity()
export class Item extends DataEntity {
    @Column()
    title: string;

    @Column('float', { precision: 11, scale: 2 })
    total: number;

    @ManyToOne(() => Invoice, (invoice) => invoice.transactions)
    invoice: Invoice;
}
