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

const findAlbum = async ({ id }) => {
  const album = await Album.findByPk(id);
  if (!album) throw 'Album not found';
  return album;
};

export default {
  createAlbum,
  getAlbums,
  findAlbum
};
