import { Router } from 'express';
import songController from '../controllers/song';

const router = Router();

router.get('/', songController.get);
router.post('/', songController.create);
router.get('/:id', songController.find);

export default router;
