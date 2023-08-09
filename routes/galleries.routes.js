const { Router } = require("express");

const {
  indexView, 
  index,
  show,
  update,
  store,
  destroy,
} = require("../controllers/galleries.controller");

const router = Router();

//Vistas
router.get("/", indexView);

// API CRUD
router.get("/api", index);
router.get("/api/:id/show", show);
router.post("/api", store);
router.put("/api/:id/update", update);
router.delete("/api/:id/destroy", destroy);

module.exports = router;