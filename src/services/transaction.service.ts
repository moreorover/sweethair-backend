import { TransactionUpdateDto } from './../controllers/dtos/transaction/transaction-update.dto';
import { TransactionCreateDto } from './../controllers/dtos/transaction/transaction-create.dto';
import { Transaction } from './../entity/hair/Transaction';
import { AbstractService } from './abstract.service';

export class TransactionService extends AbstractService<
  Transaction,
  TransactionCreateDto,
  TransactionUpdateDto
> {}
