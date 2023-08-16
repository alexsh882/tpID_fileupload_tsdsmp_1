import { Router } from "express";

import { indexView, createView } from "../controllers/galleries.controller.js";

const views = Router();

//Vistas
views.get("/", indexView);
views.get("/create", createView);


export default views;