import albumService from '../services/album';

class AlbumController {
  async create(req, res, next) {
    try {
      const data = await albumService.createAlbum(req, res);

      return res.status(200).json({
        data,
        message: data ? 'Album successfully created.' : 'Error while creating the album.'
      });
    } catch (err) {
      next(err);
    }
  }

  async get(req, res, next) {
    try {
      const data = await albumService.getAlbums();

      return res.status(200).json({
        data,
        message: data ? 'Albums found.' : 'Error while retrieving the albums.'
      });
    } catch (err) {
      next(err);
    }
  }

  async find(req, res, next) {
    try {
      const data = await albumService.findAlbum(req, res);

      return res.status(200).json({
        data,
        message: data ? 'Album found.' : 'Error while retrieving the album.'
      });
    } catch (err) {
      next(err);
    }
  }

  async edit(req, res, next) {
    try {
      const data = await albumService.editAlbum(req, res);

      return res.status(200).json({
        data,
        message: data ? 'Album edited.' : 'Error while editing the album.'
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new AlbumController();
