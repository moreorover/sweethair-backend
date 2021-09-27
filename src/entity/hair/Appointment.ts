import { Customer } from './Customer';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../BaseEntity';
import { Transaction } from './Transaction';
import { Expose } from 'class-transformer';

@Entity()
@Expose()
export class Appointment extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: null })
    start: Date;

    @ManyToMany(() => Customer, (customer) => customer.appointments)
    customers: Customer[];

    @OneToMany(() => Transaction, (transaction) => transaction.appointment)
    transactions: Transaction[];
}
