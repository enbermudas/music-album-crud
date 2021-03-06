import songService from '../services/song';

class SongController {
  async create(req, res, next) {
    try {
      const data = await songService.createSong(req, res);

      return res.status(200).json({
        data,
        message: data ? 'Song successfully created.' : 'Error while creating the song.'
      });
    } catch (err) {
      next(err);
    }
  }

  async get(req, res, next) {
    try {
      const data = await songService.getSongs();

      return res.status(200).json({
        data,
        message: data ? 'Songs found.' : 'Error while retrieving the songs.'
      });
    } catch (err) {
      next(err);
    }
  }

  async find(req, res, next) {
    try {
      const data = await songService.findSong(req, res);

      return res.status(200).json({
        data,
        message: data ? 'Song found.' : 'Error while retrieving the song.'
      });
    } catch (err) {
      next(err);
    }
  }

  async edit(req, res, next) {
    try {
      const data = await songService.editSong(req, res);

      return res.status(200).json({
        data,
        message: data ? 'Song edited.' : 'Error while editing the song.'
      });
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const data = await songService.deleteSong(req, res);

      return res.status(200).json({
        data,
        message: !data ? 'Song deleted.' : 'Error while deleting the song.'
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new SongController();
