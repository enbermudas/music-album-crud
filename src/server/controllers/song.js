import songService from '../services/song';

class SongController {
  async create(req, res, next) {
    try {
      const data = await songService.createSong(req.body);

      return res.status(200).json({
        success: data,
        message: data ? 'Song successfully created.' : 'Error while creating the song.'
      });
    } catch (err) {
      next(err);
    }
  }

  async find(req, res, next) {
    try {
      const data = await songService.getSong(req.body);

      return res.status(200).json({
        success: data,
        message: data ? 'Song found.' : 'Error while retrieving the song.'
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new SongController();
