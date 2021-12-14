import { Appointment } from './Appointment';
import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { Customer } from './Customer';
import { Invoice } from './Invoice';
import { Expose } from 'class-transformer';
import { ObjectType, Field, ID, Float } from 'type-graphql';

@ObjectType()
@Entity()
@Expose()
export class Item extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field()
  @Column()
  title!: string;

  @Field((type) => Float)
  @Column('float', { precision: 11, scale: 2 })
  total!: number;

  @Field((type) => Invoice)
  @ManyToOne(() => Invoice, (invoice) => invoice.items)
  invoice: Invoice;

  @Field((type) => Customer)
  @ManyToOne(() => Customer, (customer) => customer.items)
  customer: Customer;

  @Field((type) => Appointment)
  @ManyToOne(() => Appointment, (appointment) => appointment.items)
  appointment: Appointment;

  @Field()
  @CreateDateColumn()
  createdOn: Date;

  @Field()
  @UpdateDateColumn()
  modifiedOn: Date;
}
