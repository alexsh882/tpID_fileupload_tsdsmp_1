import { DataTypes, sequelize } from '../database/config.js';


const ImageCl = sequelize.define('ImageCl', {
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
  modelName: 'ImageCl',
  tableName: 'images_cloudinary',
  underscored: true
});

console.log('ImageCl');
ImageCl.sync()

export default ImageCl;


