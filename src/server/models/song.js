import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Song extends Model {
    static associate(models) {}
  }

  Song.init(
    {
      name: DataTypes.STRING,
      duration: DataTypes.STRING,
      artist: DataTypes.INTEGER,
      album: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Song',
      tableName: 'song',
      timestamps: true
    }
  );

  Song.associate = (models) => {
    Song.belongsTo(models.Artist, { foreignKey: 'artist' });
    Song.belongsTo(models.Album, { foreignKey: 'album' });
  };

  return Song;
};
