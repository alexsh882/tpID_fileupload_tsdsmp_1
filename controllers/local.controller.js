import { join } from "path";
import { unlink } from "fs";
import ImageLocal from "../models/imageLocal.models.js";
import fileDirName from '../utils/file-dir-name.js';
const { __dirname } = fileDirName(import.meta);


//APIS
const index = async (req, res) => {
  try {
    const images = await ImageLocal.findAll();

    if (!images || images.length === 0) {
      res.json({
        status: 404,
        message: "No hay imagenes registradas en cloudinary aún.",
      });
      return;
    }
    return res.json(images);
  } catch (error) {
    console.log(error);
  }
};

const show = async (req, res) => {
  const image = await ImageLocal.findOne({
    where: {
      id: req.params.id,
    },
  });

  const uploadPath = join(
    __dirname,
    "../files/",
    `${image.original_filename}.${image.format}`
  );

  return res.sendFile(uploadPath);
};

const store = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ mensaje: "No hay archivos que subir." });
  }

  const image = req.files.image;
  const original_filename = req.files.image.name.split(".")[0];
  const format = req.files.image.name.split(".")[1];

  try {
    const imageExists = await ImageLocal.findOne({
        where: {
          original_filename,
          format,
        },
      });
      console.log(imageExists);
      if (imageExists) {
        return res
          .status(400)
          .json({ mensaje: "La imagen ya existe en la base de datos." });
      }
    
      const uploadPath = join(__dirname, "../files/", image.name);
    
      image.mv(uploadPath, function (err) {
        if (err) return res.status(500).json(err);
      });
    
      const imagen = ImageLocal.create({
        original_filename,
        format
       
      });
    
      return res
        .status(201)
        .json({ success: "Imagen subida correctamente." });
    } catch (error) {
        return res
          .json({ mensaje: error });
        
  }
};

const destroy = async (req, res) => {
  const image = await ImageLocal.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!image) {
    return res
      .status(404)
      .json({ message: "La imagen NO existe en la base de datos." });
  }

  const uploadPath = join(
    __dirname,
    "../files/",
    `${image.original_filename}.${image.format}`
  );

  try {
    unlink(uploadPath, function (err) {
      if (err && err.code == "ENOENT") {
        // EL archivo no existe
        return res.status(404).json({ message: "El archivo no existe en local." });
      }
      if (err) {
        // other errors, e.g. maybe we don't have enough permission
        console.log('other errors')
        return res
          .status(500)
          .json({
            message: "Ocurrió un error al querer eliminar el archivo: " + err,
          });
      }
    });

    await image.destroy();

    return res.json({ success: "Imagen local eliminada correctamente." });
  } catch (error) {
    return res.json(error);
  }
};

export {
  index,
  show,
  store,
  destroy
};
