import models from '../models';
import { getArtist } from './artist';
import { getAlbum } from './album';

const { Song } = models;

export const createSong = async (params) => {
  if (
    await Song.findOne({
      where: { name: params.name, artistId: params.artistId, albumId: params.albumId }
    })
  )
    return null;

  const artist = await getArtist(params.artistId);
  const album = await getAlbum(params.albumId);

  const newSong = await Song.create(params);

  artist.setSong(newSong);
  album.setSong(newSong);

  return newSong;
};

export const getSong = async (id) => {
  const song = await Song.findByPk(id);
  if (!song) throw 'Song not found';
  return song;
};
