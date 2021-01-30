import { Router } from 'express';
import albumController from '../controllers/album';

const router = Router();

router.get('/', albumController.get);
router.post('/', albumController.create);
router.get('/:id', albumController.find);

export default router;
