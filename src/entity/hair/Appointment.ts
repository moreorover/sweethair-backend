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
} from 'typeorm';
import { Transaction } from './Transaction';
import { Expose } from 'class-transformer';
import { Item } from './Item';
import { Field, Int, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';

@ObjectType()
@Entity()
@Expose()
export class Appointment extends BaseEntity {
  @Field((_type) => Int)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  scheduledAt: Date;

  @Field()
  @Column({ default: '', nullable: true })
  title: string;

  @Field((type) => [Customer])
  @TypeormLoader()
  @ManyToMany(() => Customer, (customer) => customer.appointments)
  customers?: Customer[];

  // @Field((type) => [ID])
  // @RelationId((appointment: Appointment) => appointment.customers)
  // customerIds: number[];

  @Field((type) => [Transaction])
  @TypeormLoader()
  @OneToMany(() => Transaction, (transaction) => transaction.appointment)
  transactions?: Transaction[];

  // @Field((type) => [ID])
  // @RelationId((appointment: Appointment) => appointment.transactions)
  // transactionIds: number[];

  @Field((type) => [Item])
  @TypeormLoader()
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
