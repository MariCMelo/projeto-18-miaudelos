import { Router } from "express";
import { addCatIntoGallery, listCats } from "../controllers/gallery.controller.js";
import { validateAuth } from "../middlewares/validateAuth.js";

const galleryRouter = Router();

galleryRouter.get("/galeria", listCats);
galleryRouter.post("/galeria", validateAuth, addCatIntoGallery)

export default galleryRouter;
