import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Song extends Model {
    static associate(models) {}
  }

  Song.init(
    {
      name: DataTypes.STRING,
      duration: DataTypes.STRING,
      artistId: DataTypes.INTEGER,
      albumId: DataTypes.INTEGER,
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
    Song.belongsTo(models.Artist, {
      foreignKey: 'artistId',
      as: 'artist',
      onDelete: 'CASCADE'
    });

    Song.belongsTo(models.Album, {
      foreignKey: 'albumId',
      as: 'album',
      onDelete: 'CASCADE'
    });
  };

  return Song;
};
