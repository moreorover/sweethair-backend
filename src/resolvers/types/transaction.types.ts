import { Transaction, TransactionType } from './../../entity/hair/Transaction';
import { InputType, Field, Int, Float } from 'type-graphql';

@InputType()
export class TransactionCreate implements Partial<Transaction> {
  @Field((type) => Float)
  total: number;

  @Field({ defaultValue: false })
  isPaid: boolean;

  @Field()
  scheduledAt: Date;

  @Field((type) => TransactionType)
  type: TransactionType;

  @Field({ nullable: true, defaultValue: null })
  customerId: number;

  @Field({ nullable: true, defaultValue: null })
  appointmentId?: number;

  @Field({ nullable: true, defaultValue: null })
  invoiceId?: number;
}

@InputType()
export class TransactionUpdate implements Partial<Transaction> {
  @Field((type) => Int)
  id: number;

  @Field((type) => Float)
  total: number;

  @Field({ defaultValue: false })
  isPaid: boolean;

  @Field()
  scheduledAt: Date;

  @Field((type) => TransactionType)
  type: TransactionType;

  @Field({ nullable: true, defaultValue: null })
  customerId: number;

  @Field({ nullable: true, defaultValue: null })
  appointmentId?: number;

  @Field({ nullable: true, defaultValue: null })
  invoiceId?: number;
}
