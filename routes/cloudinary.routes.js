import { Router } from "express";
import { index,  store, destroy } from "../controllers/cloudinary.controller.js";

const routesCl = Router();

// API CRUD
routesCl.get("/cloudinary/api", index);
routesCl.post("/cloudinary/api", store);
routesCl.delete("/cloudinary/api/:id/destroy", destroy);

export default routesCl;