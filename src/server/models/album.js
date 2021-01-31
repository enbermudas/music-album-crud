import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Album extends Model {
    static associate(models) {}
  }

  Album.init(
    {
      name: DataTypes.STRING,
      artistId: DataTypes.INTEGER,
      cover: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Album',
      tableName: 'album',
      timestamps: true
    }
  );

  Album.associate = (models) => {
    Album.hasMany(models.Song, {
      foreignKey: 'albumId',
      as: 'songs',
      onDelete: 'CASCADE'
    });

    Album.belongsTo(models.Artist, {
      foreignKey: 'artistId',
      as: 'artist',
      onDelete: 'CASCADE'
    });
  };

  return Album;
};
