import { InvoiceService } from './../services/invoice.service';
import { Resolver, Query, Mutation, Arg, Int } from 'type-graphql';
import { Invoice } from '../entity/hair/Invoice';
import { InvoiceCreate, InvoiceUpdate } from './types/invoice.types';
import { getConnection } from 'typeorm';

@Resolver(Invoice)
export class InvoiceResolver {
  @Query(() => [Invoice])
  invoices() {
    const service: InvoiceService = new InvoiceService(Invoice);
    return service.all();
  }

  @Query(() => Invoice, { nullable: true })
  async invoice(
    @Arg('invoiceId', (type) => Int) invoiceId: number
  ): Promise<Invoice | undefined> {
    const invoice = await Invoice.findOne(invoiceId);
    return invoice;
  }

  @Mutation(() => Invoice)
  async createInvoice(
    @Arg('invoice') invoice: InvoiceCreate
  ): Promise<Invoice> {
    return Invoice.create(invoice).save();
  }

  @Mutation(() => Invoice)
  async updateInvoice(
    @Arg('invoice') invoice: InvoiceUpdate
  ): Promise<Invoice> {
    const result = await getConnection().getRepository(Invoice).save(invoice);
    return result;
  }
}
