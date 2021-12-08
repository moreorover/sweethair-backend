import { Item } from './Item';
import { Transaction } from './Transaction';
import { Entity, Column, OneToMany } from 'typeorm';
import { DataEntity } from '../DataEntity';
import { Expose } from 'class-transformer';

@Entity()
@Expose()
export class Invoice extends DataEntity {
    @Column('float', { precision: 11, scale: 2 })
    total: number;

    @Column({ default: false, type: 'boolean' })
    isReceived: boolean;

    @Column({ default: false, type: 'boolean' })
    isPaid: boolean;

    @Column({ default: null })
    scheduledAt: Date;

    @OneToMany(() => Transaction, (transaction) => transaction.invoice, {
        cascade: true
    })
    transactions: Transaction[];

    @OneToMany(() => Item, (item) => item.invoice)
    items: Item[];
}
