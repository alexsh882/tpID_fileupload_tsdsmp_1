const path = require("path");
const { cloudinary } = require("../utils/coudinary");
const Image = require("../models/image.models");

//VISTAS
const indexView = (_req, res) => {
  res.render("galleries/index", { mensaje: "" });
};

const createView = (_req, res) => {
  res.render("galleries/create");
};

//APIS
const index = async (req, res) => {
  try {
    const images = await Image.findAll();

    if (!images || images.length === 0) {
      throw {
        status: 404,
        message: "No hay imagenes registradas aún.",
      };
    }

    console.log

    res.json(images)

  } catch (error) {
    console.log(error)
  }
};

const show = async (req, res) => {
  const image = await Image.findOne({
    where: {
      id: req.params.id,
    },
  });

  uploadPath = path.join(
    __dirname,
    "../files/",
    `${image.original_filename}.${image.format}`
  );

  res.sendFile(uploadPath);
};

const store = async (req, res) => {
  let image;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ mensaje: "No hay archivos que subir." });
  }

  image = req.files.image;

  const imageExists = await Image.findOne({
    where: {
      original_filename: image.name.split(".")[0],
    },
  });
  if (imageExists) {
    return res
      .status(400)
      .json({ mensaje: "La imagen ya existe en la base de datos." });
  }

  uploadPath = path.join(__dirname, "../files/", image.name);

  image.mv(uploadPath, function (err) {
    if (err) return res.status(500).json(err.message);
  });

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
  } = await cloudinary.uploader.upload(uploadPath).catch((error) => {
    console.log(error);
    res.status(500).json(err.message);
  });
  cloudinary.uploader.destroy();
  const imagen = Image.create({
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

  return res
    .status(201)
    .json({ success: "Imagen subida correctamente.", imagen });
};

const update = async (req, res) => {};

const destroy = async (req, res) => {};

module.exports = {
  indexView,
  createView,
  index,
  show,
  update,
  store,
  destroy,
};
