import { Router } from "express";
import { index, show, store, destroy } from "../controllers/local.controller.js";

const routesLc = Router();

// API CRUD
routesLc.get("/local/api", index);
routesLc.get("/local/api/:id/show", show);
routesLc.post("/local/api", store);
routesLc.delete("/local/api/:id/destroy", destroy);

export default routesLc;