const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const fileUpload = require('express-fileupload');

//variables de entorno
dotenv.config({ path: ".env" });


// Se importa la instancia de conexión a la base de datos - (debe ser después de leer las variables de entorno)
const { sequelize } = require('./database/config');


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

app.use("/", require("./routes/galleries.routes"));

app.listen(process.env.PORT, () => {
  console.log(`Servidor en ${process.env.APP_URL}:${process.env.PORT}`);
});
