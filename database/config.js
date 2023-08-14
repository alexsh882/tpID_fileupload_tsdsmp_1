// Se importan las clases de la librería
import { Sequelize, DataTypes } from "sequelize";

// Se crea una instancia de la conexión a la base de datos
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

export {
  DataTypes,
  sequelize
};
