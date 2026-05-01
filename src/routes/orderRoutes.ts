import { Router } from 'express';
import * as OrderController from '../controllers/order';
import { authenticateJWT } from '../middleware/Auth';

const router = Router();

router.post('/', authenticateJWT, OrderController.createOrder);
router.get('/', authenticateJWT, OrderController.getAllOrders);
router.get('/:id', authenticateJWT, OrderController.getOrderDetail);

export default router;