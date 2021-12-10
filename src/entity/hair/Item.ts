import { Appointment } from './Appointment';
import { Entity, Column, ManyToOne } from 'typeorm';
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

    @ManyToOne(() => Invoice, (invoice) => invoice.items)
    invoice: Invoice;

    @ManyToOne(() => Customer, (customer) => customer.items)
    customer: Customer;

    @ManyToOne(() => Appointment, (appointment) => appointment.items)
    appointment: Appointment;
}
