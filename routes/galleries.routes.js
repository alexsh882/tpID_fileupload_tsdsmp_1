import { Router } from "express";

import { indexView, createView, index, show, update, store, destroy } from "../controllers/galleries.controller.js";

const router = Router();

//Vistas
router.get("/", indexView);
router.get("/create", createView);

// API CRUD
router.get("/api", index);
router.get("/api/:id/show", show);
router.post("/api", store);
router.put("/api/:id/update", update);
router.delete("/api/:id/destroy", destroy);

export default router;