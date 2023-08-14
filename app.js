import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import 'dotenv/config'
import fileUpload from 'express-fileupload';

import fileDirName from './utils/file-dir-name.js';
const { __dirname } = fileDirName(import.meta);

import router from './routes/galleries.routes.js';

//variables de entorno
// dotenv.config();


// Se importa la instancia de conexión a la base de datos - (debe ser después de leer las variables de entorno)
import { sequelize } from './database/config.js';


const app = express();

//configuración del motor de plantillas
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Carpeta public para archivos estaticos
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(morgan("dev"));

//configuración de File Upload
app.use(fileUpload());

// Se ejecuta una instancia de conexión a la base de datos
sequelize.authenticate()
  .then(() => { 
    console.log('Conexión a base de datos exitosa');
 })
  .catch((error) => console.log('Error al conectar a base de datos', error));

app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log(`Servidor en ${process.env.APP_URL}:${process.env.PORT}`);
});
