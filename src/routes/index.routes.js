import { Router } from "express";
import authRouter from "./auth.routes.js";
import galleryRouter from "./gallery.routes.js";
import contractRouter from "./owner.routes.js";

const router = Router();

router.use(authRouter);
router.use(galleryRouter)
router.use(contractRouter)

export default router;
