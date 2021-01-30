import models from '../models';

const { Artist } = models;

const createArtist = async (params) => {
  if (await Artist.findOne({ where: { name: params.name } })) return null;

  const newArtist = await Artist.create(params);

  return newArtist;
};

const getArtists = async () => {
  const artists = await Artist.findAll();
  return artists;
};

const findArtist = async (req, res) => {
  const artist = await Artist.findByPk(req.params.id);

  if (!artist) {
    return res.status(500).json({
      message: 'Artist not found'
    });
  }

  return artist;
};

export default {
  createArtist,
  getArtists,
  findArtist
};
