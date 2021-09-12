import { Router } from 'express';
import { PaginateDto } from '../controllers/dtos/common/paginate.dto';
import { AppointmentCreateDto } from '../controllers/dtos/appointment/appointment-create.dto';
import { AppointmentUpdateDto } from '../controllers/dtos/appointment/appointment-update.dto';
import { authenticateToken } from '../middleware/requestAuthenticated';
const { all, paginate, create, findById, update, deleteById } = require('../controllers/appointment.controller');
const { validateDto } = require('../middleware/validateBodyToDto');

const router = Router();

router.get('', authenticateToken, all);
router.post('/paginate', authenticateToken, validateDto(PaginateDto), paginate);
router.post('', authenticateToken, validateDto(AppointmentCreateDto), create);
router.get('/:id', authenticateToken, findById);
router.patch('/:id', authenticateToken, validateDto(AppointmentUpdateDto), update);
router.delete('/:id', authenticateToken, deleteById);

module.exports = router;
