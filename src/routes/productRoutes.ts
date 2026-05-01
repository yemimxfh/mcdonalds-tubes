import { Router } from 'express';
import * as ProductController from '../controllers/product';
import { authenticateJWT, authorizeRole } from '../middleware/Auth';

const router = Router();

router.get('/', ProductController.getAllProducts);
router.post('/', authenticateJWT, ProductController.createProduct);
router.put('/:id', authenticateJWT, authorizeRole(['admin']), ProductController.updateProduct);
router.delete('/:id', authenticateJWT, authorizeRole(['admin']), ProductController.deleteProduct);
router.get('/:id', ProductController.getProductById);

export default router;