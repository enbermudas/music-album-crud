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

const findArtist = async ({ id }) => {
  const artist = await Artist.findByPk(id);
  if (!artist) throw 'Artist not found';
  return artist;
};

export default {
  createArtist,
  getArtists,
  findArtist
};
