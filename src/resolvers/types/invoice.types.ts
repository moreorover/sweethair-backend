import { Invoice } from '../../entity/hair/Invoice';
import { InputType, Field, Int, Float } from 'type-graphql';

@InputType()
export class InvoiceCreate implements Partial<Invoice> {
  @Field((type) => Float)
  total: number;

  @Field({ defaultValue: false })
  isReceived: boolean;

  @Field({ defaultValue: false })
  isPaid: boolean;

  @Field()
  scheduledAt: Date;
}

@InputType()
export class InvoiceUpdate implements Partial<Invoice> {
  @Field((type) => Int)
  id: number;

  @Field((type) => Float)
  total: number;

  @Field({ defaultValue: false })
  isReceived: boolean;

  @Field({ defaultValue: false })
  isPaid: boolean;

  @Field()
  scheduledAt: Date;
}
