import { Router } from 'express';
import artistController from '../controllers/artist';

const router = Router();

router.get('/', artistController.get);
router.post('/', artistController.create);
router.get('/:id', artistController.find);

export default router;
