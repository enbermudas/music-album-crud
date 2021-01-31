import models from '../models';

const { Artist, Album, Song } = models;

const createArtist = async (req, res) => {
  const {
    body: { name }
  } = req;

  const artist = await Artist.findOne({ where: { name: name } });

  if (artist) {
    return res.status(500).json({
      message: 'This artist already exists.'
    });
  }

  const newArtist = await Artist.create(req.body);

  return newArtist;
};

const getArtists = async () => {
  const artists = await Artist.findAll();
  return artists;
};

const findArtist = async (req, res) => {
  const artist = await Artist.findByPk(req.params.id, {
    include: [
      {
        model: Album,
        as: 'albums'
      },
      {
        model: Song,
        as: 'songs'
      }
    ]
  });

  if (!artist) {
    return res.status(500).json({
      message: 'Artist not found'
    });
  }

  return artist;
};

const editArtist = async (req, res) => {
  const artist = await Artist.findByPk(req.params.id, {
    include: [
      {
        model: Album,
        as: 'albums'
      },
      {
        model: Song,
        as: 'songs'
      }
    ]
  });

  if (!artist) {
    return res.status(500).json({
      message: 'Artist not found'
    });
  }

  artist.update(req.body);

  return artist;
};

const deleteArtist = async (req, res) => {
  const artist = await Artist.findByPk(req.params.id);

  if (!artist) {
    return res.status(500).json({
      message: 'Artist not found'
    });
  }

  await artist.destroy();

  return null;
};

export default {
  createArtist,
  getArtists,
  findArtist,
  editArtist,
  deleteArtist
};
