import { join } from "path";
import cloudinary from "../utils/coudinary.js";
import ImageCl from "../models/imageCloudinary.models.js";
import fileDirName from "../utils/file-dir-name.js";
import { unlink } from "fs";
const { __dirname } = fileDirName(import.meta);

//APIS
const index = async (req, res) => {
  try {
    const images = await ImageCl.findAll();

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

const store = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ mensaje: "No hay archivos que subir." });
  }

  const image = req.files.image;

  const imageExists = await ImageCl.findOne({
    where: {
      original_filename: image.name.split(".")[0],
      format: image.name.split(".")[1],
    },
  });

  if (imageExists) {
    return res
      .status(400)
      .json({ mensaje: "La imagen ya existe en la base de datos." });
  }

  const uploadPath = join(__dirname, "../files/tmp/", image.name);

  image.mv(uploadPath, function (err) {
    if (err) return res.status(500).json(err);
  });

  const responseCl = await cloudinary.uploader
    .upload(uploadPath)
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });

  console.log(responseCl);

  const {
    original_filename,
    format,
    resource_type,
    url,
    secure_url,
    asset_id,
    public_id,
    version_id,
    created_at,
  } = responseCl;

  const imagen = ImageCl.create({
    original_filename,
    format,
    resource_type,
    url,
    secure_url,
    asset_id,
    public_id,
    version_id,
    creation: created_at,
  });

  unlink(uploadPath, function (error){});


  return res
    .status(201)
    .json({ success: "Imagen subida correctamente.", imagen });
};

const destroy = async (req, res) => {
  const image = await ImageCl.findOne({
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
    await cloudinary.uploader.destroy(image.public_id).catch((error) => {
      console.log(error);
      return res.status(500).json(err.message);
    });

    await image.destroy();
    return res.json({
      success: "Imagen eliminada de Cloudinary correctamente.",
    });
  } catch (error) {
    console.log("error");
    console.log(error);
    return res.status(500).json(error);
  }
};

export { index, store, destroy };
