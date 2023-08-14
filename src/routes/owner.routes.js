import { Router } from "express";
import { openProfile } from "../controllers/gallery.controller.js";
import { openMyProfile } from "../controllers/owner.controller.js";
import { findSessionDB } from "../repositories/auth.repository.js";

const contractRouter = Router();

contractRouter.get("/gato/:id", openProfile);
contractRouter.get("/profile/:id", openMyProfile)
contractRouter.get("/profile/:token", findSessionDB)

export default contractRouter;
