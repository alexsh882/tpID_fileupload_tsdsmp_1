const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

//variables de entorno
dotenv.config({ path: ".env" });

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

app.use("/", require("./routes/galleries.routes"));

app.listen(process.env.PORT, () => {
  console.log(`Servidor en ${process.env.APP_URL}:${process.env.PORT}`);
});
