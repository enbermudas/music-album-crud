import { Router } from 'express';
import albumController from '../controllers/album';

const router = Router();

router.get('/', albumController.get);
router.post('/', albumController.create);
router.get('/:id', albumController.find);
router.put('/:id', albumController.edit);
router.delete('/:id', albumController.delete);

export default router;
