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
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
@Expose()
export class Appointment extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field()
  @Column()
  scheduledAt!: Date;

  @Field()
  @Column({ default: '', nullable: true })
  title: string;

  @ManyToMany(() => Customer, (customer) => customer.appointments)
  customers: Customer[];

  @OneToMany(() => Transaction, (transaction) => transaction.appointment)
  transactions: Transaction[];

  @OneToMany(() => Item, (item) => item.appointment)
  items: Item[];

  @Field()
  @CreateDateColumn()
  createdOn: Date;

  @Field()
  @UpdateDateColumn()
  modifiedOn: Date;
}
