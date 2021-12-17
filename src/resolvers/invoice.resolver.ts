import { InvoiceService } from './../services/invoice.service';
import { Resolver, Query } from 'type-graphql';
import { Invoice } from '../entity/hair/Invoice';

@Resolver(Invoice)
export class InvoiceResolver {
  @Query(() => [Invoice])
  // @UseMiddleware(isAuth)
  customers() {
    const service: InvoiceService = new InvoiceService(Invoice);
    return service.all();
  }
}
