import { Entity, Column, ManyToMany, ManyToOne } from 'typeorm';
import { DataEntity } from '../DataEntity';
import { Customer } from './Customer';
import { Invoice } from './Invoice';

@Entity()
export class Item extends DataEntity {
    @Column()
    title: string;

    @Column('float', { precision: 11, scale: 2 })
    total: number;

    @ManyToMany(() => Invoice, (invoice) => invoice.items)
    invoices: Invoice[];

    @ManyToOne(() => Customer, (customer) => customer.items)
    customer: Customer;
}
