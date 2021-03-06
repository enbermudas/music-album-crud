import artistService from '../services/artist';

class ArtistController {
  async create(req, res, next) {
    try {
      const data = await artistService.createArtist(req, res);

      return res.status(200).json({
        data,
        message: data
          ? 'Artist successfully created.'
          : 'Error while creating the artist.'
      });
    } catch (err) {
      next(err);
    }
  }

  async get(req, res, next) {
    try {
      const data = await artistService.getArtists();

      return res.status(200).json({
        data,
        message: data ? 'Artists found.' : 'Error while retrieving the artists.'
      });
    } catch (err) {
      next(err);
    }
  }

  async find(req, res, next) {
    try {
      const data = await artistService.findArtist(req, res);

      return res.status(200).json({
        data,
        message: data ? 'Artist found.' : 'Error while retrieving the artist.'
      });
    } catch (err) {
      next(err);
    }
  }

  async edit(req, res, next) {
    try {
      const data = await artistService.editArtist(req, res);

      return res.status(200).json({
        data,
        message: data ? 'Artist edited.' : 'Error while editing the artist.'
      });
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const data = await artistService.deleteArtist(req, res);

      return res.status(200).json({
        data,
        message: !data ? 'Artist deleted.' : 'Error while deleting the artist.'
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new ArtistController();
