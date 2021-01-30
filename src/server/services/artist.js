import models from '../models';

const { Artist } = models;

export const createArtist = async (params) => {
  if (await Artist.findOne({ where: { name: params.name } })) return null;

  const newArtist = await Artist.create(params);

  return newArtist;
};

export const getArtist = async (id) => {
  const artist = await Artist.findByPk(id);
  if (!artist) throw 'Artist not found';
  return artist;
};
