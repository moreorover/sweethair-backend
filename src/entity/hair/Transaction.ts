import { Customer } from './Customer';
import { Appointment } from './Appointment';
import { Invoice } from './Invoice';
import { Entity, Column, ManyToOne } from 'typeorm';
import { DataEntity } from '../DataEntity';
import { Expose } from 'class-transformer';

@Entity()
@Expose()
export class Transaction extends DataEntity {
  @Column('float', { precision: 11, scale: 2 })
  total: number;

  @Column({ default: false, type: 'boolean' })
  isPaid: boolean;

  @Column({ default: null })
  scheduledAt: Date;

  @ManyToOne(() => Customer, (customer) => customer.transactions)
  customer: Customer;

  @ManyToOne(() => Appointment, (appointment) => appointment.transactions)
  appointment: Appointment;

  @ManyToOne(() => Invoice, (invoice) => invoice.transactions)
  invoice: Invoice;
}
