import express from 'express';
import album from './album';
import artist from './artist';
import song from './song';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is online.' });
});

router.use('/album', album);
router.use('/artist', artist);
router.use('/song', song);

export default router;
