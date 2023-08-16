import { DataTypes, sequelize } from '../database/config.js';


const ImageLocal = sequelize.define('ImageLocal', {
  original_filename: DataTypes.STRING,
  format: DataTypes.STRING,  
}, {
  sequelize,
  paranoid: true,
  modelName: 'ImageLocal',
  tableName: 'images_local',
  underscored: true
});

console.log('ImageLocal');
ImageLocal.sync()

export default ImageLocal;


