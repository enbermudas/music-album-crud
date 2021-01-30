import artistService from '../services/artist';

class ArtistController {
  async create(req, res, next) {
    try {
      const data = await artistService.createArtist(req.body);

      return res.status(200).json({
        success: data,
        message: data
          ? 'Artist successfully created.'
          : 'Error while creating the artist.'
      });
    } catch (err) {
      next(err);
    }
  }

  async find(req, res, next) {
    try {
      const data = await artistService.getArtist(req.body);

      return res.status(200).json({
        success: data,
        message: data ? 'Artist found.' : 'Error while retrieving the artist.'
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new ArtistController();
