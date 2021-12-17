import { Customer } from './Customer';
import {
  Entity,
  Column,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  RelationId,
} from 'typeorm';
import { Transaction } from './Transaction';
import { Expose } from 'class-transformer';
import { Item } from './Item';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
@Expose()
export class Appointment extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  scheduledAt: Date;

  @Field()
  @Column({ default: '', nullable: true })
  title: string;

  @ManyToMany(() => Customer, (customer) => customer.appointments)
  customers?: Customer[];

  // @Field((type) => [ID])
  // @RelationId((appointment: Appointment) => appointment.customers)
  // customerIds: number[];

  @OneToMany(() => Transaction, (transaction) => transaction.appointment)
  transactions?: Transaction[];

  // @Field((type) => [ID])
  // @RelationId((appointment: Appointment) => appointment.transactions)
  // transactionIds: number[];

  @OneToMany(() => Item, (item) => item.appointment)
  items?: Item[];

  // @Field((type) => [ID])
  // @RelationId((appointment: Appointment) => appointment.items)
  // itemsIds: number[];

  @Field()
  @CreateDateColumn()
  createdOn: Date;

  @Field()
  @UpdateDateColumn()
  modifiedOn: Date;
}
