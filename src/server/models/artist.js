import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Artist extends Model {
    static associate(models) {}
  }

  Artist.init(
    {
      name: DataTypes.STRING,
      photo: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Artist',
      tableName: 'artist',
      timestamps: true
    }
  );

  Artist.associate = (models) => {
    Artist.hasMany(models.Album, { foreignKey: 'artist' });
    Artist.hasMany(models.Song, { foreignKey: 'artist' });
  };

  return Artist;
};
