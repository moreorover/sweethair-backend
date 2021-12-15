import { Customer } from './Customer';
import { Appointment } from './Appointment';
import { Invoice } from './Invoice';
import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { Field, Float, ID, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
@Expose()
export class Transaction extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field((_type) => Float)
  @Column('float', { precision: 11, scale: 2 })
  total!: number;

  @Field()
  @Column({ default: false, type: 'boolean' })
  isPaid!: boolean;

  @Field()
  @Column({ default: null })
  scheduledAt!: Date;

  @Field({ nullable: true })
  @Column()
  customerId: number;

  @ManyToOne(() => Customer, (customer) => customer.transactions)
  customer: Customer;

  @ManyToOne(() => Appointment, (appointment) => appointment.transactions)
  appointment: Appointment;

  @ManyToOne(() => Invoice, (invoice) => invoice.transactions)
  invoice: Invoice;

  @Field()
  @CreateDateColumn()
  createdOn: Date;

  @Field()
  @UpdateDateColumn()
  modifiedOn: Date;
}
