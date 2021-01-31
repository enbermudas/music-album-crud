import models from '../models';

const { Artist, Album, Song } = models;

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

const findSong = async (req, res) => {
  const song = await Song.findByPk(req.params.id, {
    include: [
      {
        model: Artist,
        as: 'artist'
      },
      {
        model: Album,
        as: 'album'
      }
    ]
  });

  if (!song) {
    return res.status(500).json({
      message: 'Song not found'
    });
  }

  return song;
};

const editSong = async (req, res) => {
  const song = await Song.findByPk(req.params.id, {
    include: [
      {
        model: Artist,
        as: 'artist'
      },
      {
        model: Album,
        as: 'album'
      }
    ]
  });

  if (!song) {
    return res.status(500).json({
      message: 'Song not found'
    });
  }

  song.update(req.body);

  return song;
};

const deleteSong = async (req, res) => {
  const song = await Song.findByPk(req.params.id);

  if (!song) {
    return res.status(500).json({
      message: 'Song not found'
    });
  }

  await song.destroy();

  return null;
};

export default {
  createSong,
  getSongs,
  findSong,
  editSong,
  deleteSong
};
