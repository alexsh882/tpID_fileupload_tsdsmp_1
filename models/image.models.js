const {
    DataTypes, sequelize
} = require('../database/config');


const Image = sequelize.define('Image', {
  original_filename: DataTypes.STRING,
  format: DataTypes.STRING,
  resource_type: DataTypes.STRING,
  url: DataTypes.TEXT,
  secure_url: DataTypes.TEXT,
  asset_id: DataTypes.STRING,
  public_id: DataTypes.STRING,
  version_id: DataTypes.STRING,
  creation: DataTypes.DATE 
}, {
  sequelize,
  paranoid: true,
  modelName: 'Image',
  tableName: 'images',
  underscored: true
});

console.log('Image');
Image.sync()

module.exports = Image;


