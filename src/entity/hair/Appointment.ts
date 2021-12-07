import { Customer } from './Customer';
import { Entity, Column, ManyToMany, OneToMany } from 'typeorm';
import { DataEntity } from '../DataEntity';
import { Transaction } from './Transaction';
import { Expose } from 'class-transformer';
import { Item } from './Item';

@Entity()
@Expose()
export class Appointment extends DataEntity {
    @Column()
    scheduledAt: Date;

    @Column({ default: '', nullable: true })
    title: string;

    @ManyToMany(() => Customer, (customer) => customer.appointments)
    customers: Customer[];

    @OneToMany(() => Transaction, (transaction) => transaction.appointment, {
        cascade: true
    })
    transactions: Transaction[];

    @OneToMany(() => Item, (item) => item.appointment)
    items: Item[];
}
