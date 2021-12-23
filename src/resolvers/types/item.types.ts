import { InputType, Field, Int, Float } from 'type-graphql';
import { Item } from '../../entity/hair/Item';

@InputType()
export class ItemCreate implements Partial<Item> {
  @Field()
  title: string;

  @Field((type) => Float)
  total: number;

  @Field({ nullable: true, defaultValue: null })
  customerId: number;

  @Field({ nullable: true, defaultValue: null })
  appointmentId?: number;

  @Field({ nullable: true, defaultValue: null })
  invoiceId?: number;
}

@InputType()
export class ItemUpdate implements Partial<Item> {
  @Field((type) => Int)
  id: number;

  @Field()
  title: string;

  @Field((type) => Float)
  total: number;

  @Field({ nullable: true, defaultValue: null })
  customerId: number;

  @Field({ nullable: true, defaultValue: null })
  appointmentId?: number;

  @Field({ nullable: true, defaultValue: null })
  invoiceId?: number;
}
