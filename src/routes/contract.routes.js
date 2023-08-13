import { Router } from "express";
import { openProfile } from "../controllers/gallery.controller.js";

const contractRouter = Router();

contractRouter.get("/gato/:id", openProfile);

export default contractRouter;
