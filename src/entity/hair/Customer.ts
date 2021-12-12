import { Transaction } from './Transaction';
import { Appointment } from './Appointment';
import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { DataEntity } from '../DataEntity';
import { Expose } from 'class-transformer';
import { Item } from './Item';

@Entity()
@Expose()
export class Customer extends DataEntity {
    @Column({ default: '', nullable: false, unique: true })
    fullName: string;

    @Column({ default: '', nullable: true })
    location: string;

    @Column({ default: '', nullable: true })
    about: string;

    @Column({ type: 'text', unique: true, nullable: true })
    email: string;

    @Column({ type: 'text', unique: true, nullable: true })
    instagram: string;

    @ManyToMany(() => Appointment, (appointment) => appointment.customers)
    @JoinTable({ name: 'customer_appointments' })
    appointments: Appointment[];

    @OneToMany(() => Transaction, (transaction) => transaction.customer)
    transactions: Transaction[];

    @OneToMany(() => Item, (item) => item.customer)
    items: Item[];
}
