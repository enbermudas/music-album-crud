import models from '../models';

const { Artist, Album, Song } = models;

const createAlbum = async (req, res) => {
  const {
    body: { name, artistId }
  } = req;

  const album = await Album.findOne({
    where: { name, artistId }
  });

  if (album) {
    return res.status(500).json({
      message: 'This album already exists.'
    });
  }

  const newAlbum = await Album.create(req.body);

  return newAlbum;
};

const getAlbums = async () => {
  const albums = await Album.findAll({
    include: [
      {
        model: Artist,
        as: 'artist',
        attributes: ['name']
      }
    ]
  });

  return albums;
};

const findAlbum = async (req, res) => {
  const album = await Album.findByPk(req.params.id, {
    include: [
      {
        model: Artist,
        as: 'artist'
      },
      {
        model: Song,
        as: 'songs'
      }
    ]
  });

  if (!album) {
    return res.status(500).json({
      message: 'Album not found'
    });
  }

  return album;
};

const editAlbum = async (req, res) => {
  const album = await Album.findByPk(req.params.id, {
    include: [
      {
        model: Artist,
        as: 'artist'
      },
      {
        model: Song,
        as: 'songs'
      }
    ]
  });

  if (!album) {
    return res.status(500).json({
      message: 'Album not found'
    });
  }

  album.update(req.body);

  return album;
};

const deleteAlbum = async (req, res) => {
  const album = await Album.findByPk(req.params.id);

  if (!album) {
    return res.status(500).json({
      message: 'Album not found'
    });
  }

  await album.destroy();

  return null;
};

export default {
  createAlbum,
  getAlbums,
  findAlbum,
  editAlbum,
  deleteAlbum
};
