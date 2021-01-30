import models from '../models';

const { Song } = models;

const createSong = async (req, res) => {
  const {
    body: { name, artistId, albumId }
  } = req;

  const song = await Song.findOne({
    where: { name: name, artistId: artistId, albumId: albumId }
  });

  if (song) {
    return res.status(500).json({
      message: 'This song already exists.'
    });
  }

  const newSong = await Song.create(req.body);

  return newSong;
};

const getSongs = async () => {
  const songs = await Song.findAll();
  return songs;
};

const findSong = async (id) => {
  const song = await Song.findByPk(id);
  if (!song) return null;
  return song;
};

export default {
  createSong,
  getSongs,
  findSong
};
