import { TransactionCreateDto } from './../controllers/dtos/transaction/transaction-create.dto';
import { Router } from 'express';
import { PaginateDto } from '../controllers/dtos/common/paginate.dto';
import { AppointmentCreateDto } from '../controllers/dtos/appointment/appointment-create.dto';
import { AppointmentUpdateDto } from '../controllers/dtos/appointment/appointment-update.dto';
import { authenticateToken } from '../middleware/requestAuthenticated';
import {
  all,
  paginate,
  create,
  findById,
  update,
  deleteById,
  fetchTransactions,
  fetchCustomers,
  fetchItems,
  addCustomers,
  addTransaction,
} from '../controllers/appointment.controller';
import { validateDto } from '../middleware/validateBodyToDto';
import { AppointmentSaveCustomersDto } from '../controllers/dtos/appointment/appointment-save-customers.dto';

const router = Router();

router.get('', authenticateToken, all);
router.post('/paginate', authenticateToken, validateDto(PaginateDto), paginate);
router.post('', authenticateToken, validateDto(AppointmentCreateDto), create);
router.get('/:id', authenticateToken, findById);
router.patch(
  '/:id',
  authenticateToken,
  validateDto(AppointmentUpdateDto),
  update
);
router.delete('/:id', authenticateToken, deleteById);

router.get('/:id/customers', authenticateToken, fetchCustomers);
router.post(
  '/:id/customers',
  authenticateToken,
  validateDto(AppointmentSaveCustomersDto),
  addCustomers
);
router.get('/:id/items', authenticateToken, fetchItems);
router.get('/:id/transactions', authenticateToken, fetchTransactions);
router.post(
  '/:id/transactions',
  authenticateToken,
  validateDto(TransactionCreateDto),
  addTransaction
);
module.exports = router;
