import models from '../models';
import { getArtist } from './artist';

const { Album } = models;

const createAlbum = async (params) => {
  if (
    await Song.findOne({
      where: { name: params.name, artistId: params.artistId }
    })
  )
    return null;

  const artist = await getArtist(params.artistId);

  const newAlbum = await Song.create(params);

  artist.setSong(newAlbum);

  return newAlbum;
};

const getAlbums = async () => {
  const albums = await Album.findAll();
  return albums;
};

const findAlbum = async (req, res) => {
  const album = await Album.findByPk(req.params.id);

  if (!album) {
    return res.status(500).json({
      message: 'Album not found'
    });
  }

  return album;
};

export default {
  createAlbum,
  getAlbums,
  findAlbum
};
