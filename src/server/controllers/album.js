import albumService from '../services/album';

class AlbumController {
  async create(req, res, next) {
    try {
      const data = await albumService.createAlbum(req.body);

      return res.status(200).json({
        success: data,
        message: data ? 'Album successfully created.' : 'Error while creating the album.'
      });
    } catch (err) {
      next(err);
    }
  }

  async find(req, res, next) {
    try {
      const data = await albumService.getAlbum(req.body);

      return res.status(200).json({
        success: data,
        message: data ? 'Album found.' : 'Error while retrieving the album.'
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new AlbumController();
