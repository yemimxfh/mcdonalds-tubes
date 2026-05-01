import { Router } from 'express';
import * as CategoryController from '../controllers/category';
import { authenticateJWT, authorizeRole } from '../middleware/Auth';

const router = Router();

router.get('/', CategoryController.getAllCategories); 
router.post('/', authenticateJWT, authorizeRole(['admin']), CategoryController.createCategory);
router.delete('/:id', authenticateJWT, authorizeRole(['admin']), CategoryController.deleteCategory);
router.get('/:id', CategoryController.getCategoryById);

export default router;