import { Appointment } from './Appointment';
import { Entity, Column, ManyToMany, ManyToOne } from 'typeorm';
import { DataEntity } from '../DataEntity';
import { Customer } from './Customer';
import { Invoice } from './Invoice';
import { Expose } from 'class-transformer';

@Entity()
@Expose()
export class Item extends DataEntity {
    @Column()
    title: string;

    @Column('float', { precision: 11, scale: 2 })
    total: number;

    @ManyToMany(() => Invoice, (invoice) => invoice.items)
    invoices: Invoice[];

    @ManyToOne(() => Customer, (customer) => customer.items)
    customer: Customer;

    @ManyToOne(() => Appointment, (appointment) => appointment.items)
    appointment: Appointment;
}
